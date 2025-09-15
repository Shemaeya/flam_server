import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto, CancelOrderDto } from './dto/order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(user: any, createOrderDto: CreateOrderDto): Promise<{
        user: {
            id: string;
            phone: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        items: ({
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            productId: string;
            orderId: string;
            itemType: import(".prisma/client").$Enums.CartItemType;
            selectedSize: string | null;
            selectedColor: string | null;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shippingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
        billingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string;
        billingAddressId: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        paymentId: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        trackingNumber: string | null;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    }>;
    findAll(user: any, query: OrderQueryDto): Promise<{
        orders: ({
            items: ({
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
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                quantity: number;
                productId: string;
                orderId: string;
                itemType: import(".prisma/client").$Enums.CartItemType;
                selectedSize: string | null;
                selectedColor: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
            })[];
            shippingAddress: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                city: string;
                state: string;
                latitude: import("@prisma/client/runtime/library").Decimal | null;
                longitude: import("@prisma/client/runtime/library").Decimal | null;
                phone: string | null;
                firstName: string;
                lastName: string;
                zipCode: string;
                country: string;
                isDefault: boolean;
                label: string | null;
                inServiceZone: boolean;
                userId: string;
            };
            billingAddress: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                city: string;
                state: string;
                latitude: import("@prisma/client/runtime/library").Decimal | null;
                longitude: import("@prisma/client/runtime/library").Decimal | null;
                phone: string | null;
                firstName: string;
                lastName: string;
                zipCode: string;
                country: string;
                isDefault: boolean;
                label: string | null;
                inServiceZone: boolean;
                userId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            total: import("@prisma/client/runtime/library").Decimal;
            shippingAddressId: string;
            billingAddressId: string;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            paymentId: string | null;
            notes: string | null;
            status: import(".prisma/client").$Enums.OrderStatus;
            trackingNumber: string | null;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            shippingCost: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            shippedAt: Date | null;
            deliveredAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getOrderStats(user: any): Promise<{
        totalOrders: number;
        pendingOrders: number;
        confirmedOrders: number;
        deliveredOrders: number;
        cancelledOrders: number;
    }>;
    findOne(id: string, user: any): Promise<{
        user: {
            id: string;
            phone: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        items: ({
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            productId: string;
            orderId: string;
            itemType: import(".prisma/client").$Enums.CartItemType;
            selectedSize: string | null;
            selectedColor: string | null;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shippingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
        billingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string;
        billingAddressId: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        paymentId: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        trackingNumber: string | null;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    }>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        user: {
            id: string;
            phone: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        items: ({
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            productId: string;
            orderId: string;
            itemType: import(".prisma/client").$Enums.CartItemType;
            selectedSize: string | null;
            selectedColor: string | null;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shippingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
        billingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string;
        billingAddressId: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        paymentId: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        trackingNumber: string | null;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    }>;
    cancelOrder(id: string, user: any, cancelOrderDto: CancelOrderDto): Promise<{
        user: {
            id: string;
            phone: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        items: ({
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            productId: string;
            orderId: string;
            itemType: import(".prisma/client").$Enums.CartItemType;
            selectedSize: string | null;
            selectedColor: string | null;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        shippingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
        billingAddress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            city: string;
            state: string;
            latitude: import("@prisma/client/runtime/library").Decimal | null;
            longitude: import("@prisma/client/runtime/library").Decimal | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            zipCode: string;
            country: string;
            isDefault: boolean;
            label: string | null;
            inServiceZone: boolean;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: import("@prisma/client/runtime/library").Decimal;
        shippingAddressId: string;
        billingAddressId: string;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        paymentId: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        trackingNumber: string | null;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shippingCost: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    }>;
}
