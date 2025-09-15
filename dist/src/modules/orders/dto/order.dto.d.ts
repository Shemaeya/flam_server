export declare enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED"
}
export declare enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    PAYPAL = "PAYPAL",
    APPLE_PAY = "APPLE_PAY",
    GOOGLE_PAY = "GOOGLE_PAY",
    BANK_TRANSFER = "BANK_TRANSFER",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY"
}
export declare enum CartItemType {
    PURCHASE = "PURCHASE",
    REFILL = "REFILL"
}
export declare class CreateOrderItemDto {
    productId: string;
    quantity: number;
    itemType: CartItemType;
    selectedSize?: string;
    selectedColor?: string;
}
export declare class CreateOrderDto {
    shippingAddressId: string;
    billingAddressId: string;
    paymentMethod: PaymentMethod;
    paymentId?: string;
    notes?: string;
    items: CreateOrderItemDto[];
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
    trackingNumber?: string;
    notes?: string;
}
export declare class OrderQueryDto {
    status?: OrderStatus;
    page?: number;
    limit?: number;
}
export declare class CancelOrderDto {
    reason: string;
}
