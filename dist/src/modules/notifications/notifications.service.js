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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNotificationDto) {
        return this.prisma.notification.create({
            data: createNotificationDto,
        });
    }
    async findAll(userId, query) {
        const { type, isRead, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = { userId };
        if (type) {
            where.type = type;
        }
        if (isRead !== undefined) {
            where.isRead = isRead;
        }
        const [notifications, total] = await Promise.all([
            this.prisma.notification.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.notification.count({ where }),
        ]);
        return {
            notifications,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId) {
        const notification = await this.prisma.notification.findFirst({
            where: { id, userId },
        });
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return notification;
    }
    async update(id, userId, updateNotificationDto) {
        const notification = await this.findOne(id, userId);
        return this.prisma.notification.update({
            where: { id },
            data: updateNotificationDto,
        });
    }
    async markAsRead(id, userId) {
        const notification = await this.findOne(id, userId);
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
    async markAllAsRead(userId, markAllAsReadDto) {
        const { notificationIds } = markAllAsReadDto;
        const where = { userId, isRead: false };
        if (notificationIds && notificationIds.length > 0) {
            where.id = { in: notificationIds };
        }
        const result = await this.prisma.notification.updateMany({
            where,
            data: { isRead: true },
        });
        return {
            message: `${result.count} notifications marked as read`,
            count: result.count,
        };
    }
    async remove(id, userId) {
        const notification = await this.findOne(id, userId);
        await this.prisma.notification.delete({
            where: { id },
        });
        return { message: 'Notification deleted successfully' };
    }
    async getUnreadCount(userId) {
        const count = await this.prisma.notification.count({
            where: { userId, isRead: false },
        });
        return { unreadCount: count };
    }
    async createOrderNotification(userId, orderId, orderNumber, status) {
        const statusMessages = {
            PENDING: {
                title: 'Commande reçue',
                message: `Votre commande ${orderNumber} a été reçue et est en attente de confirmation.`,
            },
            CONFIRMED: {
                title: 'Commande confirmée',
                message: `Votre commande ${orderNumber} a été confirmée et est en cours de préparation.`,
            },
            PROCESSING: {
                title: 'Commande en préparation',
                message: `Votre commande ${orderNumber} est en cours de préparation.`,
            },
            SHIPPED: {
                title: 'Commande expédiée',
                message: `Votre commande ${orderNumber} a été expédiée et est en route.`,
            },
            DELIVERED: {
                title: 'Commande livrée',
                message: `Votre commande ${orderNumber} a été livrée avec succès.`,
            },
            CANCELLED: {
                title: 'Commande annulée',
                message: `Votre commande ${orderNumber} a été annulée.`,
            },
        };
        const notificationData = statusMessages[status];
        if (!notificationData) {
            return null;
        }
        return this.create({
            userId,
            title: notificationData.title,
            message: notificationData.message,
            type: 'ORDER',
            data: {
                orderId,
                orderNumber,
                status,
            },
        });
    }
    async createPromotionNotification(userId, title, message, data) {
        return this.create({
            userId,
            title,
            message,
            type: 'PROMOTION',
            data,
        });
    }
    async createSystemNotification(userId, title, message, data) {
        return this.create({
            userId,
            title,
            message,
            type: 'SYSTEM',
            data,
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map