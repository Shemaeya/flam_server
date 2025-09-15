import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateDeliveryZoneDto {
  @ApiProperty({ example: 'Cocody' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @Type(() => Number)
  basePrice: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Type(() => Number)
  pricePerKm: number;

  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  freeDeliveryThreshold?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  supportsUrgentDelivery?: boolean;

  @ApiProperty({ 
    example: [[5.3599, -4.0083], [5.3600, -4.0084], [5.3601, -4.0085], [5.3599, -4.0083]],
    description: 'Array of [latitude, longitude] coordinates forming a polygon'
  })
  @IsArray()
  @IsNumber({}, { each: true })
  polygonCoordinates: number[][];
}

export class UpdateDeliveryZoneDto {
  @ApiProperty({ example: 'Cocody', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 2000, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  basePrice?: number;

  @ApiProperty({ example: 500, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pricePerKm?: number;

  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  freeDeliveryThreshold?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  supportsUrgentDelivery?: boolean;

  @ApiProperty({ 
    example: [[5.3599, -4.0083], [5.3600, -4.0084], [5.3601, -4.0085], [5.3599, -4.0083]],
    description: 'Array of [latitude, longitude] coordinates forming a polygon',
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  polygonCoordinates?: number[][];

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateDeliveryPricingRuleDto {
  @ApiProperty({ example: 'zone-id-123' })
  @IsString()
  zoneId: string;

  @ApiProperty({ example: 1, description: '1-7 (Monday-Sunday)' })
  @IsNumber()
  @Type(() => Number)
  dayOfWeek: number;

  @ApiProperty({ example: 9, description: '0-23' })
  @IsNumber()
  @Type(() => Number)
  startHour: number;

  @ApiProperty({ example: 17, description: '0-23' })
  @IsNumber()
  @Type(() => Number)
  endHour: number;

  @ApiProperty({ example: 1.20, description: 'Multiplier (e.g., 1.20 for +20%)' })
  @IsNumber()
  @Type(() => Number)
  multiplier: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;
}

export class UpdateDeliveryPricingRuleDto {
  @ApiProperty({ example: 1, description: '1-7 (Monday-Sunday)', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  dayOfWeek?: number;

  @ApiProperty({ example: 9, description: '0-23', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  startHour?: number;

  @ApiProperty({ example: 17, description: '0-23', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endHour?: number;

  @ApiProperty({ example: 1.20, description: 'Multiplier (e.g., 1.20 for +20%)', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  multiplier?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;
}

export class CalculateDeliveryPriceDto {
  @ApiProperty({ example: 5.3599 })
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({ example: -4.0083 })
  @IsNumber()
  @Type(() => Number)
  longitude: number;

  @ApiProperty({ example: 15000, description: 'Order subtotal' })
  @IsNumber()
  @Type(() => Number)
  orderSubtotal: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;
}

export class DeliveryPriceCalculationResponse {
  @ApiProperty({ example: 2000 })
  basePrice: number;

  @ApiProperty({ example: 500 })
  distancePrice: number;

  @ApiProperty({ example: 1.20 })
  timeMultiplier: number;

  @ApiProperty({ example: 1.50 })
  urgentMultiplier: number;

  @ApiProperty({ example: 3600 })
  totalPrice: number;

  @ApiProperty({ example: false })
  isFreeDelivery: boolean;

  @ApiProperty({ example: 'Base: 2000, Distance: 500, Time: +20%, Urgent: +50%' })
  calculationDetails: string;

  @ApiProperty({ example: 'Cocody' })
  zoneName: string;

  @ApiProperty({ example: 2.5 })
  distance: number;
}
