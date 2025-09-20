"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CurrencyService = class CurrencyService {
    constructor(prismaService) {
        this.prisma = prismaService;
    }
    async create(createCurrencyDto) {
        const existingCurrency = await this.prisma.currency.findUnique({
            where: { code: createCurrencyDto.code },
        });
        if (existingCurrency) {
            throw new common_1.BadRequestException('Une devise avec ce code existe déjà');
        }
        if (createCurrencyDto.isDefault) {
            await this.prisma.currency.updateMany({
                where: { isDefault: true },
                data: { isDefault: false },
            });
        }
        const currency = await this.prisma.currency.create({
            data: createCurrencyDto,
        });
        return this.mapToResponseDto(currency);
    }
    async findAll() {
        const currencies = await this.prisma.currency.findMany({
            orderBy: [
                { isDefault: 'desc' },
                { isActive: 'desc' },
                { code: 'asc' },
            ],
        });
        return currencies.map(currency => this.mapToResponseDto(currency));
    }
    async findOne(id) {
        const currency = await this.prisma.currency.findUnique({
            where: { id },
        });
        if (!currency) {
            throw new common_1.NotFoundException('Devise non trouvée');
        }
        return this.mapToResponseDto(currency);
    }
    async findByCode(code) {
        const currency = await this.prisma.currency.findUnique({
            where: { code },
        });
        if (!currency) {
            throw new common_1.NotFoundException('Devise non trouvée');
        }
        return this.mapToResponseDto(currency);
    }
    async getDefault() {
        const currency = await this.prisma.currency.findFirst({
            where: { isDefault: true, isActive: true },
        });
        if (!currency) {
            throw new common_1.NotFoundException('Aucune devise par défaut trouvée');
        }
        return this.mapToResponseDto(currency);
    }
    async update(id, updateCurrencyDto) {
        const existingCurrency = await this.prisma.currency.findUnique({
            where: { id },
        });
        if (!existingCurrency) {
            throw new common_1.NotFoundException('Devise non trouvée');
        }
        if (updateCurrencyDto.code && updateCurrencyDto.code !== existingCurrency.code) {
            const codeExists = await this.prisma.currency.findUnique({
                where: { code: updateCurrencyDto.code },
            });
            if (codeExists) {
                throw new common_1.BadRequestException('Une devise avec ce code existe déjà');
            }
        }
        if (updateCurrencyDto.isDefault) {
            await this.prisma.currency.updateMany({
                where: { isDefault: true },
                data: { isDefault: false },
            });
        }
        const updatedCurrency = await this.prisma.currency.update({
            where: { id },
            data: updateCurrencyDto,
        });
        return this.mapToResponseDto(updatedCurrency);
    }
    async remove(id) {
        const currency = await this.prisma.currency.findUnique({
            where: { id },
        });
        if (!currency) {
            throw new common_1.NotFoundException('Devise non trouvée');
        }
        if (currency.isDefault) {
            throw new common_1.BadRequestException('Impossible de supprimer la devise par défaut');
        }
        await this.prisma.currency.delete({
            where: { id },
        });
    }
    async setDefault(id) {
        const currency = await this.prisma.currency.findUnique({
            where: { id },
        });
        if (!currency) {
            throw new common_1.NotFoundException('Devise non trouvée');
        }
        if (!currency.isActive) {
            throw new common_1.BadRequestException('Impossible de définir une devise inactive comme devise par défaut');
        }
        await this.prisma.currency.updateMany({
            where: { isDefault: true },
            data: { isDefault: false },
        });
        const updatedCurrency = await this.prisma.currency.update({
            where: { id },
            data: { isDefault: true },
        });
        return this.mapToResponseDto(updatedCurrency);
    }
    async formatPrice(amount, currencyCode) {
        let currency;
        if (currencyCode) {
            currency = await this.prisma.currency.findUnique({
                where: { code: currencyCode, isActive: true },
            });
        }
        else {
            currency = await this.prisma.currency.findFirst({
                where: { isDefault: true, isActive: true },
            });
        }
        if (!currency) {
            return `${amount.toFixed(2)} FCFA`;
        }
        const formattedAmount = this.formatNumber(amount, currency);
        if (currency.symbolPosition === 'before') {
            return `${currency.symbol}${formattedAmount}`;
        }
        else {
            return `${formattedAmount} ${currency.symbol}`;
        }
    }
    formatNumber(amount, currency) {
        const integerPart = Math.floor(amount);
        const decimalPart = Math.round((amount - integerPart) * Math.pow(10, currency.decimalPlaces));
        let formattedInteger = integerPart.toString();
        if (formattedInteger.length > 3) {
            const parts = [];
            for (let i = formattedInteger.length; i > 0; i -= 3) {
                const start = Math.max(0, i - 3);
                parts.unshift(formattedInteger.slice(start, i));
            }
            formattedInteger = parts.join(currency.thousandsSeparator);
        }
        let formatted = formattedInteger;
        if (currency.decimalPlaces > 0) {
            const decimalStr = decimalPart.toString().padStart(currency.decimalPlaces, '0');
            formatted += currency.decimalSeparator + decimalStr;
        }
        return formatted;
    }
    mapToResponseDto(currency) {
        return {
            id: currency.id,
            code: currency.code,
            name: currency.name,
            symbol: currency.symbol,
            symbolPosition: currency.symbolPosition,
            decimalPlaces: currency.decimalPlaces,
            thousandsSeparator: currency.thousandsSeparator,
            decimalSeparator: currency.decimalSeparator,
            exchangeRate: currency.exchangeRate,
            isDefault: currency.isDefault,
            isActive: currency.isActive,
            createdAt: currency.createdAt,
            updatedAt: currency.updatedAt,
        };
    }
};
exports.CurrencyService = CurrencyService;
exports.CurrencyService = CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CurrencyService);
//# sourceMappingURL=currency.service.js.map