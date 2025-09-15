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
exports.DeliveryPriceCalculationResponse = exports.CalculateDeliveryPriceDto = exports.UpdateDeliveryPricingRuleDto = exports.CreateDeliveryPricingRuleDto = exports.UpdateDeliveryZoneDto = exports.CreateDeliveryZoneDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateDeliveryZoneDto {
}
exports.CreateDeliveryZoneDto = CreateDeliveryZoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cocody' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliveryZoneDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDeliveryZoneDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDeliveryZoneDto.prototype, "pricePerKm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDeliveryZoneDto.prototype, "freeDeliveryThreshold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateDeliveryZoneDto.prototype, "supportsUrgentDelivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [[5.3599, -4.0083], [5.3600, -4.0084], [5.3601, -4.0085], [5.3599, -4.0083]],
        description: 'Array of [latitude, longitude] coordinates forming a polygon'
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateDeliveryZoneDto.prototype, "polygonCoordinates", void 0);
class UpdateDeliveryZoneDto {
}
exports.UpdateDeliveryZoneDto = UpdateDeliveryZoneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cocody', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDeliveryZoneDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDeliveryZoneDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDeliveryZoneDto.prototype, "pricePerKm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDeliveryZoneDto.prototype, "freeDeliveryThreshold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDeliveryZoneDto.prototype, "supportsUrgentDelivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [[5.3599, -4.0083], [5.3600, -4.0084], [5.3601, -4.0085], [5.3599, -4.0083]],
        description: 'Array of [latitude, longitude] coordinates forming a polygon',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateDeliveryZoneDto.prototype, "polygonCoordinates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDeliveryZoneDto.prototype, "isActive", void 0);
class CreateDeliveryPricingRuleDto {
}
exports.CreateDeliveryPricingRuleDto = CreateDeliveryPricingRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'zone-id-123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliveryPricingRuleDto.prototype, "zoneId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: '1-7 (Monday-Sunday)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDeliveryPricingRuleDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9, description: '0-23' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDeliveryPricingRuleDto.prototype, "startHour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 17, description: '0-23' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDeliveryPricingRuleDto.prototype, "endHour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.20, description: 'Multiplier (e.g., 1.20 for +20%)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateDeliveryPricingRuleDto.prototype, "multiplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateDeliveryPricingRuleDto.prototype, "isUrgent", void 0);
class UpdateDeliveryPricingRuleDto {
}
exports.UpdateDeliveryPricingRuleDto = UpdateDeliveryPricingRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: '1-7 (Monday-Sunday)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDeliveryPricingRuleDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9, description: '0-23', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDeliveryPricingRuleDto.prototype, "startHour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 17, description: '0-23', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDeliveryPricingRuleDto.prototype, "endHour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.20, description: 'Multiplier (e.g., 1.20 for +20%)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateDeliveryPricingRuleDto.prototype, "multiplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDeliveryPricingRuleDto.prototype, "isUrgent", void 0);
class CalculateDeliveryPriceDto {
}
exports.CalculateDeliveryPriceDto = CalculateDeliveryPriceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.3599 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalculateDeliveryPriceDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: -4.0083 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalculateDeliveryPriceDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15000, description: 'Order subtotal' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalculateDeliveryPriceDto.prototype, "orderSubtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CalculateDeliveryPriceDto.prototype, "isUrgent", void 0);
class DeliveryPriceCalculationResponse {
}
exports.DeliveryPriceCalculationResponse = DeliveryPriceCalculationResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000 }),
    __metadata("design:type", Number)
], DeliveryPriceCalculationResponse.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    __metadata("design:type", Number)
], DeliveryPriceCalculationResponse.prototype, "distancePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.20 }),
    __metadata("design:type", Number)
], DeliveryPriceCalculationResponse.prototype, "timeMultiplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.50 }),
    __metadata("design:type", Number)
], DeliveryPriceCalculationResponse.prototype, "urgentMultiplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3600 }),
    __metadata("design:type", Number)
], DeliveryPriceCalculationResponse.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], DeliveryPriceCalculationResponse.prototype, "isFreeDelivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Base: 2000, Distance: 500, Time: +20%, Urgent: +50%' }),
    __metadata("design:type", String)
], DeliveryPriceCalculationResponse.prototype, "calculationDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cocody' }),
    __metadata("design:type", String)
], DeliveryPriceCalculationResponse.prototype, "zoneName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.5 }),
    __metadata("design:type", Number)
], DeliveryPriceCalculationResponse.prototype, "distance", void 0);
//# sourceMappingURL=delivery.dto.js.map