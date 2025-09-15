import { IsString, IsNumber, IsEnum, IsOptional, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export enum CartItemType {
  PURCHASE = 'PURCHASE',
  REFILL = 'REFILL',
}

export class CreateOrderItemDto {
  @ApiProperty({ example: 'product-id-123' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ example: CartItemType.PURCHASE, enum: CartItemType })
  @IsEnum(CartItemType)
  itemType: CartItemType;

  @ApiProperty({ example: '12kg', required: false })
  @IsOptional()
  @IsString()
  selectedSize?: string;

  @ApiProperty({ example: 'red', required: false })
  @IsOptional()
  @IsString()
  selectedColor?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'shipping-address-id-123' })
  @IsString()
  shippingAddressId: string;

  @ApiProperty({ example: 'billing-address-id-123' })
  @IsString()
  billingAddressId: string;

  @ApiProperty({ example: PaymentMethod.CREDIT_CARD, enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: 'payment-id-123', required: false })
  @IsOptional()
  @IsString()
  paymentId?: string;

  @ApiProperty({ example: 'Please deliver after 6 PM', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({ example: OrderStatus.CONFIRMED, enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ example: 'tracking-number-123', required: false })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @ApiProperty({ example: 'Order confirmed and being prepared', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class OrderQueryDto {
  @ApiProperty({ example: OrderStatus.PENDING, enum: OrderStatus, required: false })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}

export class CancelOrderDto {
  @ApiProperty({ example: 'Order cancelled by customer request' })
  @IsString()
  reason: string;
}
