import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto, UpdateNotificationDto, MarkAllAsReadDto, NotificationQueryDto } from './dto/notification.dto';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    findAll(userId: string, query: NotificationQueryDto): Promise<{
        notifications: {
            data: import("@prisma/client/runtime/library").JsonValue | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.NotificationType;
            userId: string;
            title: string;
            message: string;
            isRead: boolean;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    findOne(id: string, userId: string): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    update(id: string, userId: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    markAsRead(id: string, userId: string): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string, markAllAsReadDto: MarkAllAsReadDto): Promise<{
        message: string;
        count: number;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        unreadCount: number;
    }>;
    createOrderNotification(userId: string, orderId: string, orderNumber: string, status: string): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    createPromotionNotification(userId: string, title: string, message: string, data?: any): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    createSystemNotification(userId: string, title: string, message: string, data?: any): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
}
