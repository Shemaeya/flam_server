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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DeliveryService = class DeliveryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createZone(createZoneDto) {
        const existingZone = await this.prisma.deliveryZone.findUnique({
            where: { name: createZoneDto.name },
        });
        if (existingZone) {
            throw new common_1.BadRequestException('Zone with this name already exists');
        }
        return this.prisma.deliveryZone.create({
            data: createZoneDto,
        });
    }
    async findAllZones() {
        return this.prisma.deliveryZone.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
            include: {
                pricingRules: true,
            },
        });
    }
    async findZoneById(id) {
        const zone = await this.prisma.deliveryZone.findUnique({
            where: { id },
            include: {
                pricingRules: true,
            },
        });
        if (!zone) {
            throw new common_1.NotFoundException('Delivery zone not found');
        }
        return zone;
    }
    async updateZone(id, updateZoneDto) {
        const zone = await this.prisma.deliveryZone.findUnique({
            where: { id },
        });
        if (!zone) {
            throw new common_1.NotFoundException('Delivery zone not found');
        }
        if (updateZoneDto.name && updateZoneDto.name !== zone.name) {
            const existingZone = await this.prisma.deliveryZone.findUnique({
                where: { name: updateZoneDto.name },
            });
            if (existingZone) {
                throw new common_1.BadRequestException('Zone with this name already exists');
            }
        }
        return this.prisma.deliveryZone.update({
            where: { id },
            data: updateZoneDto,
            include: {
                pricingRules: true,
            },
        });
    }
    async deleteZone(id) {
        const zone = await this.prisma.deliveryZone.findUnique({
            where: { id },
        });
        if (!zone) {
            throw new common_1.NotFoundException('Delivery zone not found');
        }
        await this.prisma.deliveryZone.delete({
            where: { id },
        });
        return { message: 'Delivery zone deleted successfully' };
    }
    async createPricingRule(createRuleDto) {
        const zone = await this.prisma.deliveryZone.findUnique({
            where: { id: createRuleDto.zoneId },
        });
        if (!zone) {
            throw new common_1.NotFoundException('Delivery zone not found');
        }
        return this.prisma.deliveryPricingRule.create({
            data: createRuleDto,
        });
    }
    async findPricingRulesByZone(zoneId) {
        const zone = await this.prisma.deliveryZone.findUnique({
            where: { id: zoneId },
        });
        if (!zone) {
            throw new common_1.NotFoundException('Delivery zone not found');
        }
        return this.prisma.deliveryPricingRule.findMany({
            where: { zoneId },
            orderBy: [
                { dayOfWeek: 'asc' },
                { startHour: 'asc' },
            ],
        });
    }
    async updatePricingRule(id, updateRuleDto) {
        const rule = await this.prisma.deliveryPricingRule.findUnique({
            where: { id },
        });
        if (!rule) {
            throw new common_1.NotFoundException('Pricing rule not found');
        }
        return this.prisma.deliveryPricingRule.update({
            where: { id },
            data: updateRuleDto,
        });
    }
    async deletePricingRule(id) {
        const rule = await this.prisma.deliveryPricingRule.findUnique({
            where: { id },
        });
        if (!rule) {
            throw new common_1.NotFoundException('Pricing rule not found');
        }
        await this.prisma.deliveryPricingRule.delete({
            where: { id },
        });
        return { message: 'Pricing rule deleted successfully' };
    }
    async calculateDeliveryPrice(calculateDto) {
        try {
            const { latitude, longitude, orderSubtotal, isUrgent = false } = calculateDto;
            const zone = await this.findZoneForCoordinates(latitude, longitude);
            if (!zone) {
                throw new common_1.BadRequestException('Position hors zone de livraison. Nos services ne couvrent pas cette région.');
            }
            if (!zone.isActive) {
                throw new common_1.BadRequestException('Zone de livraison temporairement indisponible.');
            }
            const distance = this.calculateDistance(latitude, longitude, zone);
            const now = new Date();
            const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
            const hour = now.getHours();
            const pricingRules = await this.prisma.deliveryPricingRule.findMany({
                where: {
                    zoneId: zone.id,
                    dayOfWeek,
                    startHour: { lte: hour },
                    endHour: { gt: hour },
                    isUrgent,
                },
            });
            const timeMultiplier = this.calculateTimeMultiplier(pricingRules, dayOfWeek, hour);
            const urgentMultiplier = isUrgent ? 1.5 : 1.0;
            const basePrice = Number(zone.basePrice);
            const distancePrice = distance * Number(zone.pricePerKm);
            const subtotal = basePrice + distancePrice;
            const totalPrice = subtotal * timeMultiplier * urgentMultiplier;
            const freeDeliveryThreshold = zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null;
            const isFreeDelivery = freeDeliveryThreshold && orderSubtotal >= freeDeliveryThreshold;
            const finalPrice = isFreeDelivery ? 0 : totalPrice;
            const calculationDetails = this.buildCalculationDetails(basePrice, distancePrice, timeMultiplier, urgentMultiplier, isFreeDelivery);
            return {
                basePrice,
                distancePrice,
                timeMultiplier,
                urgentMultiplier,
                totalPrice: finalPrice,
                isFreeDelivery,
                calculationDetails,
                zoneName: zone.name,
                distance,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors du calcul du prix de livraison: ' + error.message);
        }
    }
    async findZoneForCoordinates(latitude, longitude) {
        const zones = await this.prisma.deliveryZone.findMany({
            where: { isActive: true },
        });
        for (const zone of zones) {
            const coordinates = zone.polygonCoordinates;
            if (this.isPointInPolygon(latitude, longitude, coordinates)) {
                return zone;
            }
        }
        return null;
    }
    isPointInPolygon(lat, lng, polygon) {
        if (!polygon || polygon.length < 3)
            return false;
        let minLat = polygon[0][0];
        let maxLat = polygon[0][0];
        let minLng = polygon[0][1];
        let maxLng = polygon[0][1];
        for (const coord of polygon) {
            minLat = Math.min(minLat, coord[0]);
            maxLat = Math.max(maxLat, coord[0]);
            minLng = Math.min(minLng, coord[1]);
            maxLng = Math.max(maxLng, coord[1]);
        }
        return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
    }
    calculateDistance(latitude, longitude, zone) {
        return Math.random() * 9 + 1;
    }
    calculateTimeMultiplier(rules, dayOfWeek, hour) {
        if (rules.length === 0) {
            if (dayOfWeek === 6 || dayOfWeek === 7) {
                return 1.15;
            }
            if ((hour >= 12 && hour < 14) || (hour >= 18 && hour < 20)) {
                return 1.20;
            }
            if (hour >= 22 || hour < 6) {
                return 0.90;
            }
            return 1.0;
        }
        return Number(rules[0].multiplier);
    }
    buildCalculationDetails(basePrice, distancePrice, timeMultiplier, urgentMultiplier, isFreeDelivery) {
        if (isFreeDelivery) {
            return 'Free delivery (order threshold reached)';
        }
        const details = [
            `Base: ${basePrice} FCFA`,
            `Distance: ${distancePrice.toFixed(0)} FCFA`,
        ];
        if (timeMultiplier !== 1.0) {
            const percentage = ((timeMultiplier - 1) * 100).toFixed(0);
            const sign = timeMultiplier > 1 ? '+' : '';
            details.push(`Time: ${sign}${percentage}%`);
        }
        if (urgentMultiplier !== 1.0) {
            const percentage = ((urgentMultiplier - 1) * 100).toFixed(0);
            details.push(`Urgent: +${percentage}%`);
        }
        return details.join(', ');
    }
    async checkServiceZone(latitude, longitude) {
        try {
            const zone = await this.findZoneForCoordinates(latitude, longitude);
            if (zone && zone.isActive) {
                const polygon = zone.polygonCoordinates;
                let centerLat = 0;
                let centerLng = 0;
                if (polygon && polygon.length > 0) {
                    for (const coord of polygon) {
                        centerLat += coord[0];
                        centerLng += coord[1];
                    }
                    centerLat /= polygon.length;
                    centerLng /= polygon.length;
                }
                return {
                    success: true,
                    data: {
                        inServiceZone: true,
                        zoneName: zone.name,
                        city: zone.name,
                        zoneId: zone.id,
                        basePrice: zone.basePrice,
                        pricePerKm: zone.pricePerKm,
                        freeDeliveryThreshold: zone.freeDeliveryThreshold,
                        supportsUrgentDelivery: zone.supportsUrgentDelivery,
                        centerLatitude: centerLat,
                        centerLongitude: centerLng,
                        isActive: zone.isActive,
                        message: `Position dans la zone de livraison: ${zone.name}`,
                    }
                };
            }
            else {
                return {
                    success: false,
                    data: {
                        inServiceZone: false,
                        zoneName: null,
                        city: null,
                        zoneId: null,
                        basePrice: null,
                        pricePerKm: null,
                        freeDeliveryThreshold: null,
                        supportsUrgentDelivery: false,
                        centerLatitude: null,
                        centerLongitude: null,
                        isActive: false,
                        message: 'Position hors zone de livraison. Nos services ne couvrent pas cette région.',
                    }
                };
            }
        }
        catch (error) {
            return {
                success: false,
                data: {
                    inServiceZone: false,
                    zoneName: null,
                    city: null,
                    zoneId: null,
                    basePrice: null,
                    pricePerKm: null,
                    freeDeliveryThreshold: null,
                    supportsUrgentDelivery: false,
                    centerLatitude: null,
                    centerLongitude: null,
                    isActive: false,
                    message: 'Erreur lors de la vérification de la zone de service',
                }
            };
        }
    }
    async debugPolygonDetection(latitude, longitude) {
        const zones = await this.prisma.deliveryZone.findMany({
            where: { isActive: true },
        });
        const results = zones.map(zone => {
            const coordinates = zone.polygonCoordinates;
            const isInside = this.isPointInPolygon(latitude, longitude, coordinates);
            return {
                zoneName: zone.name,
                coordinates: coordinates,
                isInside: isInside,
                testPoint: { latitude, longitude }
            };
        });
        return {
            success: true,
            data: {
                testPoint: { latitude, longitude },
                zones: results
            }
        };
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeliveryService);
//# sourceMappingURL=delivery.service.js.map