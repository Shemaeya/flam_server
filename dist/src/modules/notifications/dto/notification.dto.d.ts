export declare enum NotificationType {
    ORDER = "ORDER",
    PROMOTION = "PROMOTION",
    SYSTEM = "SYSTEM"
}
export declare class CreateNotificationDto {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    data?: any;
}
export declare class UpdateNotificationDto {
    isRead?: boolean;
}
export declare class MarkAllAsReadDto {
    notificationIds?: string[];
}
export declare class NotificationQueryDto {
    type?: NotificationType;
    isRead?: boolean;
    page?: number;
    limit?: number;
}
