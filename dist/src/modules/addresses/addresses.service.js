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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AddressesService = class AddressesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createAddressDto) {
        const { isDefault, ...addressData } = createAddressDto;
        if (isDefault) {
            await this.prisma.address.updateMany({
                where: { userId },
                data: { isDefault: false },
            });
        }
        const existingAddressesCount = await this.prisma.address.count({
            where: { userId },
        });
        const address = await this.prisma.address.create({
            data: {
                ...addressData,
                userId,
                isDefault: isDefault || existingAddressesCount === 0,
                inServiceZone: await this.checkIfInServiceZone(addressData.latitude, addressData.longitude),
            },
        });
        return address;
    }
    async findAll(userId) {
        return this.prisma.address.findMany({
            where: { userId },
            orderBy: [
                { isDefault: 'desc' },
                { createdAt: 'desc' },
            ],
        });
    }
    async findOne(id, userId) {
        const address = await this.prisma.address.findFirst({
            where: { id, userId },
        });
        if (!address) {
            throw new common_1.NotFoundException('Address not found');
        }
        return address;
    }
    async update(id, userId, updateAddressDto) {
        const address = await this.findOne(id, userId);
        const { isDefault, ...updateData } = updateAddressDto;
        if (isDefault) {
            await this.prisma.address.updateMany({
                where: { userId, id: { not: id } },
                data: { isDefault: false },
            });
        }
        let inServiceZone = address.inServiceZone;
        if (updateData.latitude !== undefined || updateData.longitude !== undefined) {
            inServiceZone = await this.checkIfInServiceZone(Number(updateData.latitude ?? address.latitude), Number(updateData.longitude ?? address.longitude));
        }
        const updatedAddress = await this.prisma.address.update({
            where: { id },
            data: {
                ...updateData,
                inServiceZone,
            },
        });
        return updatedAddress;
    }
    async remove(id, userId) {
        const address = await this.findOne(id, userId);
        await this.prisma.address.delete({
            where: { id },
        });
        if (address.isDefault) {
            const remainingAddresses = await this.prisma.address.findMany({
                where: { userId },
                orderBy: { createdAt: 'asc' },
                take: 1,
            });
            if (remainingAddresses.length > 0) {
                await this.prisma.address.update({
                    where: { id: remainingAddresses[0].id },
                    data: { isDefault: true },
                });
            }
        }
        return { message: 'Address deleted successfully' };
    }
    async setDefault(id, userId) {
        const address = await this.findOne(id, userId);
        await this.prisma.address.updateMany({
            where: { userId, id: { not: id } },
            data: { isDefault: false },
        });
        const updatedAddress = await this.prisma.address.update({
            where: { id },
            data: { isDefault: true },
        });
        return updatedAddress;
    }
    async checkServiceZone(latitude, longitude) {
        const inServiceZone = await this.checkIfInServiceZone(latitude, longitude);
        return { inServiceZone };
    }
    async checkIfInServiceZone(latitude, longitude) {
        if (!latitude || !longitude) {
            return false;
        }
        const zones = await this.prisma.deliveryZone.findMany({
            where: { isActive: true },
        });
        for (const zone of zones) {
            const coordinates = zone.polygonCoordinates;
            if (this.isPointInPolygon(latitude, longitude, coordinates)) {
                return true;
            }
        }
        return false;
    }
    isPointInPolygon(lat, lng, polygon) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0];
            const yi = polygon[i][1];
            const xj = polygon[j][0];
            const yj = polygon[j][1];
            if (((yi > lng) !== (yj > lng)) && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
        }
        return inside;
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map