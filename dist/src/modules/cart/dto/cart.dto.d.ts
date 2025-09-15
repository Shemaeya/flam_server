export declare enum CartItemType {
    PURCHASE = "PURCHASE",
    REFILL = "REFILL"
}
export declare class AddToCartDto {
    productId: string;
    quantity: number;
    itemType: CartItemType;
    selectedSize?: string;
    selectedColor?: string;
}
export declare class UpdateCartItemDto {
    quantity: number;
}
export declare class ApplyPromoCodeDto {
    code: string;
}
export declare class CalculateDeliveryFeeDto {
    zoneName: string;
    orderAmount: number;
    isUrgentDelivery?: boolean;
}
