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
exports.CalculateDeliveryFeeDto = exports.ApplyPromoCodeDto = exports.UpdateCartItemDto = exports.AddToCartDto = exports.CartItemType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var CartItemType;
(function (CartItemType) {
    CartItemType["PURCHASE"] = "PURCHASE";
    CartItemType["REFILL"] = "REFILL";
})(CartItemType || (exports.CartItemType = CartItemType = {}));
class AddToCartDto {
}
exports.AddToCartDto = AddToCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cmflchgm7001cw91knpw6upkj' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddToCartDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddToCartDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: CartItemType, example: CartItemType.PURCHASE }),
    (0, class_validator_1.IsEnum)(CartItemType),
    __metadata("design:type", String)
], AddToCartDto.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6kg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddToCartDto.prototype, "selectedSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'blue', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddToCartDto.prototype, "selectedColor", void 0);
class UpdateCartItemDto {
}
exports.UpdateCartItemDto = UpdateCartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateCartItemDto.prototype, "quantity", void 0);
class ApplyPromoCodeDto {
}
exports.ApplyPromoCodeDto = ApplyPromoCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WELCOME10' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyPromoCodeDto.prototype, "code", void 0);
class CalculateDeliveryFeeDto {
}
exports.CalculateDeliveryFeeDto = CalculateDeliveryFeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Abidjan Centre' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalculateDeliveryFeeDto.prototype, "zoneName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CalculateDeliveryFeeDto.prototype, "orderAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CalculateDeliveryFeeDto.prototype, "isUrgentDelivery", void 0);
//# sourceMappingURL=cart.dto.js.map