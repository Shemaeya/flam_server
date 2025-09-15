import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
  MarkAllAsReadDto,
  NotificationQueryDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto,
    });
  }

  async findAll(userId: string, query: NotificationQueryDto) {
    const { type, isRead, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
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

  async findOne(id: string, userId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async update(id: string, userId: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.findOne(id, userId);

    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async markAsRead(id: string, userId: string) {
    const notification = await this.findOne(id, userId);

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string, markAllAsReadDto: MarkAllAsReadDto) {
    const { notificationIds } = markAllAsReadDto;

    const where: any = { userId, isRead: false };
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

  async remove(id: string, userId: string) {
    const notification = await this.findOne(id, userId);

    await this.prisma.notification.delete({
      where: { id },
    });

    return { message: 'Notification deleted successfully' };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });

    return { unreadCount: count };
  }

  // Helper method to create order-related notifications
  async createOrderNotification(
    userId: string,
    orderId: string,
    orderNumber: string,
    status: string,
  ) {
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
      type: 'ORDER' as any,
      data: {
        orderId,
        orderNumber,
        status,
      },
    });
  }

  // Helper method to create promotion notifications
  async createPromotionNotification(
    userId: string,
    title: string,
    message: string,
    data?: any,
  ) {
    return this.create({
      userId,
      title,
      message,
      type: 'PROMOTION' as any,
      data,
    });
  }

  // Helper method to create system notifications
  async createSystemNotification(
    userId: string,
    title: string,
    message: string,
    data?: any,
  ) {
    return this.create({
      userId,
      title,
      message,
      type: 'SYSTEM' as any,
      data,
    });
  }
}
