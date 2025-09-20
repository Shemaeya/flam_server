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
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    brand: true,
                                    category: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { updatedAt: 'desc' },
            });
            if (!cart) {
                return await this.createEmptyCart(userId);
            }
            const totals = this.calculateCartTotals(cart.items);
            return {
                id: cart.id,
                userId: cart.userId,
                items: cart.items.map(item => ({
                    id: item.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    itemType: item.itemType,
                    selectedSize: item.selectedSize,
                    selectedColor: item.selectedColor,
                    unitPrice: item.unitPrice,
                    totalPrice: item.totalPrice,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    product: item.product,
                })),
                subtotal: totals.subtotal,
                shippingCost: totals.shippingCost,
                tax: totals.tax,
                total: totals.total,
                promoCode: cart.promoCode,
                discount: cart.discount,
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt,
            };
        }
        catch (error) {
            console.error('Erreur lors de la récupération du panier:', error);
            throw new common_1.BadRequestException('Erreur lors de la récupération du panier');
        }
    }
    async createEmptyCart(userId) {
        const cart = await this.prisma.cart.create({
            data: {
                userId,
                subtotal: 0,
                shippingCost: 0,
                tax: 0,
                total: 0,
                discount: 0,
            },
        });
        return {
            id: cart.id,
            userId: cart.userId,
            items: [],
            subtotal: 0,
            shippingCost: 0,
            tax: 0,
            total: 0,
            promoCode: null,
            discount: 0,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
        };
    }
    calculateCartTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
        const shippingCost = subtotal >= 50000 ? 0 : 2000;
        const tax = Math.round(subtotal * 0.18);
        const total = subtotal + shippingCost + tax;
        return {
            subtotal,
            shippingCost,
            tax,
            total,
        };
    }
    async addToCart(userId, addToCartDto) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: addToCartDto.productId },
                include: { brand: true, category: true, type: true },
            });
            if (!product) {
                throw new common_1.NotFoundException('Produit non trouvé');
            }
            let cart = await this.prisma.cart.findFirst({
                where: { userId },
                include: { items: true },
            });
            if (!cart) {
                cart = await this.prisma.cart.create({
                    data: {
                        userId,
                        subtotal: 0,
                        shippingCost: 0,
                        tax: 0,
                        total: 0,
                        discount: 0,
                    },
                    include: { items: true },
                });
            }
            const unitPrice = addToCartDto.itemType === 'PURCHASE'
                ? Number(product.category.pricePurchase)
                : Number(product.category.priceRefill);
            if (unitPrice <= 0) {
                throw new common_1.BadRequestException('Prix non disponible pour ce type d\'achat');
            }
            const existingItem = await this.prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: addToCartDto.productId,
                    itemType: addToCartDto.itemType,
                },
            });
            let cartItem;
            if (existingItem) {
                const newQuantity = existingItem.quantity + addToCartDto.quantity;
                cartItem = await this.prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: {
                        quantity: newQuantity,
                        totalPrice: unitPrice * newQuantity,
                        updatedAt: new Date(),
                    },
                });
            }
            else {
                cartItem = await this.prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: addToCartDto.productId,
                        quantity: addToCartDto.quantity,
                        itemType: addToCartDto.itemType,
                        selectedSize: addToCartDto.selectedSize,
                        selectedColor: addToCartDto.selectedColor,
                        unitPrice,
                        totalPrice: unitPrice * addToCartDto.quantity,
                    },
                });
            }
            await this.updateCartTotals(cart.id);
            return await this.getCart(userId);
        }
        catch (error) {
            console.error('Erreur lors de l\'ajout au panier:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erreur lors de l\'ajout au panier');
        }
    }
    async updateCartItem(userId, itemId, updateCartItemDto) {
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { userId },
                include: { items: true },
            });
            if (!cart) {
                throw new common_1.NotFoundException('Panier non trouvé');
            }
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    id: itemId,
                    cartId: cart.id,
                    itemType: updateCartItemDto.itemType,
                },
            });
            if (!cartItem) {
                throw new common_1.NotFoundException('Article non trouvé dans le panier avec ce type');
            }
            const product = await this.prisma.product.findUnique({
                where: { id: cartItem.productId },
                include: { category: true },
            });
            if (!product) {
                throw new common_1.NotFoundException('Produit non trouvé');
            }
            const unitPrice = updateCartItemDto.itemType === 'PURCHASE'
                ? Number(product.category.pricePurchase)
                : Number(product.category.priceRefill);
            if (unitPrice <= 0) {
                throw new common_1.BadRequestException('Prix non disponible pour ce type d\'achat');
            }
            const updatedItem = await this.prisma.cartItem.update({
                where: { id: itemId },
                data: {
                    quantity: updateCartItemDto.quantity,
                    unitPrice,
                    totalPrice: unitPrice * updateCartItemDto.quantity,
                    updatedAt: new Date(),
                },
            });
            await this.updateCartTotals(cart.id);
            return await this.getCart(userId);
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour de l\'article:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de l\'article');
        }
    }
    async removeCartItem(userId, itemId) {
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { userId },
                include: { items: true },
            });
            if (!cart) {
                throw new common_1.NotFoundException('Panier non trouvé');
            }
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    id: itemId,
                    cartId: cart.id,
                },
            });
            if (!cartItem) {
                throw new common_1.NotFoundException('Article non trouvé dans le panier');
            }
            await this.prisma.cartItem.delete({
                where: { id: itemId },
            });
            await this.updateCartTotals(cart.id);
            return await this.getCart(userId);
        }
        catch (error) {
            console.error('Erreur lors de la suppression de l\'article:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erreur lors de la suppression de l\'article');
        }
    }
    async clearCart(userId) {
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { userId },
            });
            if (!cart) {
                return await this.createEmptyCart(userId);
            }
            await this.prisma.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
            await this.prisma.cart.update({
                where: { id: cart.id },
                data: {
                    subtotal: 0,
                    shippingCost: 0,
                    tax: 0,
                    total: 0,
                    discount: 0,
                    promoCode: null,
                    updatedAt: new Date(),
                },
            });
            return await this.getCart(userId);
        }
        catch (error) {
            console.error('Erreur lors du vidage du panier:', error);
            throw new common_1.BadRequestException('Erreur lors du vidage du panier');
        }
    }
    async updateCartTotals(cartId) {
        try {
            const items = await this.prisma.cartItem.findMany({
                where: { cartId },
            });
            const totals = this.calculateCartTotals(items);
            await this.prisma.cart.update({
                where: { id: cartId },
                data: {
                    subtotal: totals.subtotal,
                    shippingCost: totals.shippingCost,
                    tax: totals.tax,
                    total: totals.total,
                    updatedAt: new Date(),
                },
            });
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour des totaux:', error);
            throw new common_1.BadRequestException('Erreur lors de la mise à jour des totaux');
        }
    }
    async getCartItemCount(userId) {
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { userId },
                include: { items: true },
            });
            if (!cart)
                return 0;
            return cart.items.reduce((sum, item) => sum + item.quantity, 0);
        }
        catch (error) {
            console.error('Erreur lors du calcul du nombre d\'articles:', error);
            return 0;
        }
    }
    async calculateDeliveryFee(calculateDeliveryFeeDto) {
        try {
            const basePrice = 2000;
            const urgentFee = 1000;
            let deliveryFee = basePrice;
            if (calculateDeliveryFeeDto.orderAmount >= 50000) {
                deliveryFee = 0;
            }
            if (calculateDeliveryFeeDto.isUrgentDelivery) {
                deliveryFee += urgentFee;
            }
            return {
                zoneName: calculateDeliveryFeeDto.zoneName,
                basePrice,
                deliveryFee,
                isUrgentDelivery: calculateDeliveryFeeDto.isUrgentDelivery || false,
                estimatedDeliveryTime: calculateDeliveryFeeDto.isUrgentDelivery ? '30-60 minutes' : '2-4 hours',
                freeShippingThreshold: 50000,
                isFreeShipping: calculateDeliveryFeeDto.orderAmount >= 50000,
            };
        }
        catch (error) {
            console.error('Erreur lors du calcul des frais de livraison:', error);
            throw new common_1.BadRequestException('Erreur lors du calcul des frais de livraison');
        }
    }
    async applyPromoCode(userId, applyPromoCodeDto) {
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { userId },
            });
            if (!cart) {
                throw new common_1.NotFoundException('Panier non trouvé');
            }
            const validCodes = ['WELCOME10', 'SAVE20', 'FIRSTORDER'];
            if (!validCodes.includes(applyPromoCodeDto.code)) {
                throw new common_1.BadRequestException('Code promo invalide');
            }
            const discountRate = applyPromoCodeDto.code === 'WELCOME10' ? 0.1 :
                applyPromoCodeDto.code === 'SAVE20' ? 0.2 : 0.05;
            const discount = Math.round(Number(cart.subtotal) * discountRate);
            const newTotal = Number(cart.subtotal) + Number(cart.shippingCost) + Number(cart.tax) - discount;
            await this.prisma.cart.update({
                where: { id: cart.id },
                data: {
                    promoCode: applyPromoCodeDto.code,
                    discount,
                    total: newTotal,
                    updatedAt: new Date(),
                },
            });
            return await this.getCart(userId);
        }
        catch (error) {
            console.error('Erreur lors de l\'application du code promo:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erreur lors de l\'application du code promo');
        }
    }
    async removePromoCode(userId) {
        try {
            const cart = await this.prisma.cart.findFirst({
                where: { userId },
            });
            if (!cart) {
                throw new common_1.NotFoundException('Panier non trouvé');
            }
            const newTotal = Number(cart.subtotal) + Number(cart.shippingCost) + Number(cart.tax);
            await this.prisma.cart.update({
                where: { id: cart.id },
                data: {
                    promoCode: null,
                    discount: 0,
                    total: newTotal,
                    updatedAt: new Date(),
                },
            });
            return await this.getCart(userId);
        }
        catch (error) {
            console.error('Erreur lors de la suppression du code promo:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erreur lors de la suppression du code promo');
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map