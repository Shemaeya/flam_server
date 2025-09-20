import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CartItemType {
  PURCHASE = 'PURCHASE',
  REFILL = 'REFILL',
}

export class AddToCartDto {
  @ApiProperty({ example: 'cmflchgm7001cw91knpw6upkj' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ enum: CartItemType, example: CartItemType.PURCHASE })
  @IsEnum(CartItemType)
  itemType: CartItemType;

  @ApiProperty({ example: '6kg', required: false })
  @IsOptional()
  @IsString()
  selectedSize?: string;

  @ApiProperty({ example: 'blue', required: false })
  @IsOptional()
  @IsString()
  selectedColor?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 2, minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ enum: CartItemType, example: CartItemType.PURCHASE })
  @IsEnum(CartItemType)
  itemType: CartItemType;
}

export class ApplyPromoCodeDto {
  @ApiProperty({ example: 'WELCOME10' })
  @IsString()
  code: string;
}

export class CalculateDeliveryFeeDto {
  @ApiProperty({ example: 'Abidjan Centre' })
  @IsString()
  zoneName: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  orderAmount: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isUrgentDelivery?: boolean;
}

