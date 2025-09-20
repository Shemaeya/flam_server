import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, UpdateNotificationDto, MarkAllAsReadDto, NotificationQueryDto } from './dto/notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    findAll(user: any, query: NotificationQueryDto): Promise<{
        notifications: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            data: import("@prisma/client/runtime/library").JsonValue | null;
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
    getUnreadCount(user: any): Promise<{
        unreadCount: number;
    }>;
    findOne(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    update(id: string, user: any, updateNotificationDto: UpdateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    markAsRead(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(user: any, markAllAsReadDto: MarkAllAsReadDto): Promise<{
        message: string;
        count: number;
    }>;
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
