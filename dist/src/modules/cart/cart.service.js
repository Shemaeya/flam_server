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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId) {
        return {
            id: 'temp-cart-id',
            userId,
            items: [],
            subtotal: 0,
            shippingCost: 0,
            tax: 0,
            total: 0,
            promoCode: null,
            discount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    async addToCart(userId, addToCartDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: addToCartDto.productId },
            include: { brand: true, category: true, type: true },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return {
            id: 'temp-cart-id',
            userId,
            items: [
                {
                    id: 'temp-item-id',
                    productId: addToCartDto.productId,
                    quantity: addToCartDto.quantity,
                    itemType: addToCartDto.itemType,
                    selectedSize: addToCartDto.selectedSize,
                    selectedColor: addToCartDto.selectedColor,
                    unitPrice: addToCartDto.itemType === 'PURCHASE'
                        ? Number(product.category.pricePurchase)
                        : Number(product.category.priceRefill),
                    totalPrice: addToCartDto.itemType === 'PURCHASE'
                        ? Number(product.category.pricePurchase) * addToCartDto.quantity
                        : Number(product.category.priceRefill) * addToCartDto.quantity,
                    product: product,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            subtotal: addToCartDto.itemType === 'PURCHASE'
                ? Number(product.category.pricePurchase) * addToCartDto.quantity
                : Number(product.category.priceRefill) * addToCartDto.quantity,
            shippingCost: 0,
            tax: 0,
            total: addToCartDto.itemType === 'PURCHASE'
                ? Number(product.category.pricePurchase) * addToCartDto.quantity
                : Number(product.category.priceRefill) * addToCartDto.quantity,
            promoCode: null,
            discount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    async updateCartItem(userId, itemId, updateCartItemDto) {
        return this.getCart(userId);
    }
    async removeCartItem(userId, itemId) {
        return this.getCart(userId);
    }
    async clearCart(userId) {
        return this.getCart(userId);
    }
    async getCartItemCount(userId) {
        const cart = await this.getCart(userId);
        return cart.items.length;
    }
    async calculateDeliveryFee(calculateDeliveryFeeDto) {
        const basePrice = 2000;
        const pricePerKm = 500;
        const deliveryFee = basePrice + (calculateDeliveryFeeDto.isUrgentDelivery ? 1000 : 0);
        return {
            zoneName: calculateDeliveryFeeDto.zoneName,
            basePrice,
            deliveryFee,
            isUrgentDelivery: calculateDeliveryFeeDto.isUrgentDelivery || false,
            estimatedDeliveryTime: calculateDeliveryFeeDto.isUrgentDelivery ? '30-60 minutes' : '2-4 hours',
        };
    }
    async applyPromoCode(userId, applyPromoCodeDto) {
        const validCodes = ['WELCOME10', 'SAVE20', 'FIRSTORDER'];
        if (!validCodes.includes(applyPromoCodeDto.code)) {
            throw new common_1.BadRequestException('Invalid promo code');
        }
        const cart = await this.getCart(userId);
        const discount = applyPromoCodeDto.code === 'WELCOME10' ? 0.1 :
            applyPromoCodeDto.code === 'SAVE20' ? 0.2 : 0.05;
        return {
            ...cart,
            promoCode: applyPromoCodeDto.code,
            discount: cart.subtotal * discount,
            total: cart.subtotal - (cart.subtotal * discount),
        };
    }
    async removePromoCode(userId) {
        const cart = await this.getCart(userId);
        return {
            ...cart,
            promoCode: null,
            discount: 0,
            total: cart.subtotal,
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map