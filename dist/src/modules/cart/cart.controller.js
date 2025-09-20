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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const cart_dto_1 = require("./dto/cart.dto");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCart(req) {
        return this.cartService.getCart(req.user.id);
    }
    async addToCart(req, addToCartDto) {
        return this.cartService.addToCart(req.user.id, addToCartDto);
    }
    async updateCartItem(req, itemId, updateCartItemDto) {
        return this.cartService.updateCartItem(req.user.id, itemId, updateCartItemDto);
    }
    async removeCartItem(req, itemId) {
        return this.cartService.removeCartItem(req.user.id, itemId);
    }
    async clearCart(req) {
        return this.cartService.clearCart(req.user.id);
    }
    async getCartItemCount(req) {
        const count = await this.cartService.getCartItemCount(req.user.id);
        return { count };
    }
    async calculateDeliveryFee(calculateDeliveryFeeDto) {
        return this.cartService.calculateDeliveryFee(calculateDeliveryFeeDto);
    }
    async applyPromoCode(req, applyPromoCodeDto) {
        return this.cartService.applyPromoCode(req.user.id, applyPromoCodeDto);
    }
    async removePromoCode(req) {
        return this.cartService.removePromoCode(req.user.id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Add item to cart' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item added to cart successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Patch)('items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update cart item quantity and type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart item updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart item not found with specified type' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, cart_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)('items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item removed from cart successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeCartItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Clear cart' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart cleared successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cart item count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart item count retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartItemCount", null);
__decorate([
    (0, common_1.Post)('delivery-fee'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate delivery fee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delivery fee calculated successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CalculateDeliveryFeeDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "calculateDeliveryFee", null);
__decorate([
    (0, common_1.Post)('promo-code'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply promo code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Promo code applied successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid promo code' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_dto_1.ApplyPromoCodeDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "applyPromoCode", null);
__decorate([
    (0, common_1.Delete)('promo-code'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove promo code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Promo code removed successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removePromoCode", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, common_1.Controller)('cart'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map