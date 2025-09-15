import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, ApplyPromoCodeDto, CalculateDeliveryFeeDto } from './dto/cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: string): Promise<{
        id: string;
        userId: string;
        items: any[];
        subtotal: number;
        shippingCost: number;
        tax: number;
        total: number;
        promoCode: any;
        discount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addToCart(userId: string, addToCartDto: AddToCartDto): Promise<{
        id: string;
        userId: string;
        items: {
            id: string;
            productId: string;
            quantity: number;
            itemType: import("./dto/cart.dto").CartItemType;
            selectedSize: string;
            selectedColor: string;
            unitPrice: number;
            totalPrice: number;
            product: {
                brand: {
                    id: string;
                    name: string;
                    logo: string | null;
                    colors: import("@prisma/client/runtime/library").JsonValue | null;
                    gasColor: string | null;
                    description: string | null;
                    hotline: string | null;
                    website: string | null;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
                category: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    pricePurchase: import("@prisma/client/runtime/library").Decimal;
                    priceRefill: import("@prisma/client/runtime/library").Decimal;
                    currentName: string | null;
                    usage: string | null;
                    size: string | null;
                    weight: import("@prisma/client/runtime/library").Decimal | null;
                    unit: string | null;
                };
                type: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                rating: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                brandId: string;
                categoryId: string;
                typeId: string;
            };
            createdAt: Date;
            updatedAt: Date;
        }[];
        subtotal: number;
        shippingCost: number;
        tax: number;
        total: number;
        promoCode: any;
        discount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCartItem(userId: string, itemId: string, updateCartItemDto: UpdateCartItemDto): Promise<{
        id: string;
        userId: string;
        items: any[];
        subtotal: number;
        shippingCost: number;
        tax: number;
        total: number;
        promoCode: any;
        discount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeCartItem(userId: string, itemId: string): Promise<{
        id: string;
        userId: string;
        items: any[];
        subtotal: number;
        shippingCost: number;
        tax: number;
        total: number;
        promoCode: any;
        discount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    clearCart(userId: string): Promise<{
        id: string;
        userId: string;
        items: any[];
        subtotal: number;
        shippingCost: number;
        tax: number;
        total: number;
        promoCode: any;
        discount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCartItemCount(userId: string): Promise<number>;
    calculateDeliveryFee(calculateDeliveryFeeDto: CalculateDeliveryFeeDto): Promise<{
        zoneName: string;
        basePrice: number;
        deliveryFee: number;
        isUrgentDelivery: boolean;
        estimatedDeliveryTime: string;
    }>;
    applyPromoCode(userId: string, applyPromoCodeDto: ApplyPromoCodeDto): Promise<{
        promoCode: string;
        discount: number;
        total: number;
        id: string;
        userId: string;
        items: any[];
        subtotal: number;
        shippingCost: number;
        tax: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removePromoCode(userId: string): Promise<{
        promoCode: any;
        discount: number;
        total: number;
        id: string;
        userId: string;
        items: any[];
        subtotal: number;
        shippingCost: number;
        tax: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
