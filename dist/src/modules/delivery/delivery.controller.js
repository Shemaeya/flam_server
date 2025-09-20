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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const delivery_service_1 = require("./delivery.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const delivery_dto_1 = require("./dto/delivery.dto");
let DeliveryController = class DeliveryController {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
    }
    async createZone(createZoneDto) {
        return this.deliveryService.createZone(createZoneDto);
    }
    async findAllZones() {
        return this.deliveryService.findAllZones();
    }
    async findZoneById(id) {
        return this.deliveryService.findZoneById(id);
    }
    async updateZone(id, updateZoneDto) {
        return this.deliveryService.updateZone(id, updateZoneDto);
    }
    async deleteZone(id) {
        return this.deliveryService.deleteZone(id);
    }
    async createPricingRule(createRuleDto) {
        return this.deliveryService.createPricingRule(createRuleDto);
    }
    async findPricingRulesByZone(zoneId) {
        return this.deliveryService.findPricingRulesByZone(zoneId);
    }
    async updatePricingRule(id, updateRuleDto) {
        return this.deliveryService.updatePricingRule(id, updateRuleDto);
    }
    async deletePricingRule(id) {
        return this.deliveryService.deletePricingRule(id);
    }
    async calculateDeliveryPrice(calculateDto) {
        return this.deliveryService.calculateDeliveryPrice(calculateDto);
    }
    async checkServiceZone(latitude, longitude) {
        return this.deliveryService.checkServiceZone(latitude, longitude);
    }
    async debugPolygon(latitude, longitude) {
        return this.deliveryService.debugPolygonDetection(latitude, longitude);
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Post)('zones'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new delivery zone' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Delivery zone created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Zone already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delivery_dto_1.CreateDeliveryZoneDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "createZone", null);
__decorate([
    (0, common_1.Get)('zones'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active delivery zones' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delivery zones retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "findAllZones", null);
__decorate([
    (0, common_1.Get)('zones/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get delivery zone by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Zone ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delivery zone retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Delivery zone not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "findZoneById", null);
__decorate([
    (0, common_1.Patch)('zones/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update delivery zone' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Zone ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delivery zone updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Delivery zone not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, delivery_dto_1.UpdateDeliveryZoneDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "updateZone", null);
__decorate([
    (0, common_1.Delete)('zones/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete delivery zone' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Zone ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delivery zone deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Delivery zone not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "deleteZone", null);
__decorate([
    (0, common_1.Post)('pricing-rules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new pricing rule' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pricing rule created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Delivery zone not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delivery_dto_1.CreateDeliveryPricingRuleDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "createPricingRule", null);
__decorate([
    (0, common_1.Get)('zones/:zoneId/pricing-rules'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pricing rules for a zone' }),
    (0, swagger_1.ApiParam)({ name: 'zoneId', description: 'Zone ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pricing rules retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Delivery zone not found' }),
    __param(0, (0, common_1.Param)('zoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "findPricingRulesByZone", null);
__decorate([
    (0, common_1.Patch)('pricing-rules/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update pricing rule' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pricing rule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pricing rule updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pricing rule not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, delivery_dto_1.UpdateDeliveryPricingRuleDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "updatePricingRule", null);
__decorate([
    (0, common_1.Delete)('pricing-rules/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete pricing rule' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pricing rule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pricing rule deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pricing rule not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "deletePricingRule", null);
__decorate([
    (0, common_1.Post)('calculate-price'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate delivery price' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delivery price calculated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Location not in service zone' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delivery_dto_1.CalculateDeliveryPriceDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "calculateDeliveryPrice", null);
__decorate([
    (0, common_1.Get)('check-service-zone'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if coordinates are in service zone' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service zone status checked' }),
    __param(0, (0, common_1.Query)('latitude')),
    __param(1, (0, common_1.Query)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "checkServiceZone", null);
__decorate([
    (0, common_1.Get)('debug-polygon'),
    (0, swagger_1.ApiOperation)({ summary: 'Debug polygon detection' }),
    __param(0, (0, common_1.Query)('latitude')),
    __param(1, (0, common_1.Query)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "debugPolygon", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, swagger_1.ApiTags)('Delivery'),
    (0, common_1.Controller)('delivery'),
    __metadata("design:paramtypes", [delivery_service_1.DeliveryService])
], DeliveryController);
//# sourceMappingURL=delivery.controller.js.map