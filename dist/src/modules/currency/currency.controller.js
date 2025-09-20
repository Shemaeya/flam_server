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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const currency_service_1 = require("./currency.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const currency_dto_1 = require("./dto/currency.dto");
let CurrencyController = class CurrencyController {
    constructor(currencyService) {
        this.currencyService = currencyService;
    }
    async create(createCurrencyDto) {
        return this.currencyService.create(createCurrencyDto);
    }
    async findAll() {
        return this.currencyService.findAll();
    }
    async getDefault() {
        return this.currencyService.getDefault();
    }
    async formatPrice(amount, code) {
        const formatted = await this.currencyService.formatPrice(amount, code);
        return { formatted };
    }
    async findOne(id) {
        return this.currencyService.findOne(id);
    }
    async findByCode(code) {
        return this.currencyService.findByCode(code);
    }
    async update(id, updateCurrencyDto) {
        return this.currencyService.update(id, updateCurrencyDto);
    }
    async setDefault(id) {
        return this.currencyService.setDefault(id);
    }
    async remove(id) {
        await this.currencyService.remove(id);
        return { message: 'Devise supprimée avec succès' };
    }
};
exports.CurrencyController = CurrencyController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle devise' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Devise créée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [currency_dto_1.CreateCurrencyDto]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir toutes les devises' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des devises' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('default'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir la devise par défaut' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Devise par défaut' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Aucune devise par défaut trouvée' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "getDefault", null);
__decorate([
    (0, common_1.Get)('format'),
    (0, swagger_1.ApiOperation)({ summary: 'Formater un prix avec la devise' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Prix formaté' }),
    __param(0, (0, common_1.Query)('amount')),
    __param(1, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "formatPrice", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir une devise par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la devise' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Devise trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Devise non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir une devise par code' }),
    (0, swagger_1.ApiParam)({ name: 'code', description: 'Code de la devise (ex: FCFA, USD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Devise trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Devise non trouvée' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une devise' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la devise à mettre à jour' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Devise mise à jour avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Devise non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, currency_dto_1.UpdateCurrencyDto]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/set-default'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Définir une devise comme devise par défaut' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la devise à définir par défaut' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Devise définie par défaut avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Devise non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "setDefault", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une devise' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la devise à supprimer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Devise supprimée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Devise non trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Impossible de supprimer la devise par défaut' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "remove", null);
exports.CurrencyController = CurrencyController = __decorate([
    (0, swagger_1.ApiTags)('Currency'),
    (0, common_1.Controller)('currency'),
    __metadata("design:paramtypes", [currency_service_1.CurrencyService])
], CurrencyController);
//# sourceMappingURL=currency.controller.js.map