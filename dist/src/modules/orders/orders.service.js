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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["RETURNED"] = "RETURNED";
})(OrderStatus || (OrderStatus = {}));
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createOrderDto) {
        const { items, shippingAddressId, billingAddressId, ...orderData } = createOrderDto;
        const [shippingAddress, billingAddress] = await Promise.all([
            this.prisma.address.findFirst({
                where: { id: shippingAddressId, userId },
            }),
            this.prisma.address.findFirst({
                where: { id: billingAddressId, userId },
            }),
        ]);
        if (!shippingAddress) {
            throw new common_1.NotFoundException('Shipping address not found');
        }
        if (!billingAddress) {
            throw new common_1.NotFoundException('Billing address not found');
        }
        const productIds = items.map(item => item.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds }, isActive: true },
            include: {
                brand: true,
                category: true,
                type: true,
            },
        });
        if (products.length !== productIds.length) {
            throw new common_1.NotFoundException('One or more products not found');
        }
        let subtotal = 0;
        const orderItems = [];
        for (const item of items) {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                throw new common_1.NotFoundException(`Product ${item.productId} not found`);
            }
            const unitPrice = item.itemType === 'PURCHASE'
                ? product.category.pricePurchase
                : product.category.priceRefill;
            const totalPrice = Number(unitPrice) * item.quantity;
            subtotal += totalPrice;
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                itemType: item.itemType,
                unitPrice,
                totalPrice,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
            });
        }
        const shippingCost = subtotal >= 50000 ? 0 : 2000;
        const tax = subtotal * 0.18;
        const total = subtotal + shippingCost + tax;
        const orderNumber = `FLM-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        const order = await this.prisma.order.create({
            data: {
                userId,
                orderNumber,
                subtotal,
                shippingCost,
                tax,
                total,
                status: OrderStatus.PENDING,
                shippingAddressId,
                billingAddressId,
                ...orderData,
                items: {
                    create: orderItems,
                },
            },
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
                shippingAddress: true,
                billingAddress: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        return order;
    }
    async findAll(userId, query) {
        const { status, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = { userId };
        if (status) {
            where.status = status;
        }
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
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
                    shippingAddress: true,
                    billingAddress: true,
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.order.count({ where }),
        ]);
        return {
            orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId) {
        const order = await this.prisma.order.findFirst({
            where: { id, userId },
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
                shippingAddress: true,
                billingAddress: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async updateStatus(id, updateOrderStatusDto) {
        const { status, trackingNumber, notes } = updateOrderStatusDto;
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (!this.isValidStatusTransition(order.status, status)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${order.status} to ${status}`);
        }
        const updateData = { status };
        if (trackingNumber) {
            updateData.trackingNumber = trackingNumber;
        }
        if (notes) {
            updateData.notes = notes;
        }
        if (status === OrderStatus.SHIPPED) {
            updateData.shippedAt = new Date();
        }
        else if (status === OrderStatus.DELIVERED) {
            updateData.deliveredAt = new Date();
        }
        const updatedOrder = await this.prisma.order.update({
            where: { id },
            data: updateData,
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
                shippingAddress: true,
                billingAddress: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        return updatedOrder;
    }
    async cancelOrder(id, userId, cancelOrderDto) {
        const order = await this.prisma.order.findFirst({
            where: { id, userId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (!this.canBeCancelled(order.status)) {
            throw new common_1.BadRequestException('Order cannot be cancelled in current status');
        }
        const updatedOrder = await this.prisma.order.update({
            where: { id },
            data: {
                status: OrderStatus.CANCELLED,
                notes: cancelOrderDto.reason,
            },
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
                shippingAddress: true,
                billingAddress: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        return updatedOrder;
    }
    async getOrderStats(userId) {
        const [totalOrders, pendingOrders, confirmedOrders, deliveredOrders, cancelledOrders,] = await Promise.all([
            this.prisma.order.count({ where: { userId } }),
            this.prisma.order.count({ where: { userId, status: OrderStatus.PENDING } }),
            this.prisma.order.count({ where: { userId, status: OrderStatus.CONFIRMED } }),
            this.prisma.order.count({ where: { userId, status: OrderStatus.DELIVERED } }),
            this.prisma.order.count({ where: { userId, status: OrderStatus.CANCELLED } }),
        ]);
        return {
            totalOrders,
            pendingOrders,
            confirmedOrders,
            deliveredOrders,
            cancelledOrders,
        };
    }
    isValidStatusTransition(currentStatus, newStatus) {
        const validTransitions = {
            [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
            [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
            [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
            [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
            [OrderStatus.DELIVERED]: [OrderStatus.RETURNED],
            [OrderStatus.CANCELLED]: [],
            [OrderStatus.RETURNED]: [],
        };
        return validTransitions[currentStatus]?.includes(newStatus) || false;
    }
    canBeCancelled(status) {
        return status === OrderStatus.PENDING || status === OrderStatus.CONFIRMED;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map