import { IsString, IsEnum, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum NotificationType {
  ORDER = 'ORDER',
  PROMOTION = 'PROMOTION',
  SYSTEM = 'SYSTEM',
}

export class CreateNotificationDto {
  @ApiProperty({ example: 'order-id-123' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Commande confirmée' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Votre commande FLM-123456 a été confirmée et est en cours de préparation.' })
  @IsString()
  message: string;

  @ApiProperty({ example: NotificationType.ORDER, enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ example: { orderId: 'order-123', orderNumber: 'FLM-123456' }, required: false })
  @IsOptional()
  data?: any;
}

export class UpdateNotificationDto {
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}

export class MarkAllAsReadDto {
  @ApiProperty({ example: ['notification-id-1', 'notification-id-2'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notificationIds?: string[];
}

export class NotificationQueryDto {
  @ApiProperty({ example: NotificationType.ORDER, enum: NotificationType, required: false })
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  limit?: number;
}
