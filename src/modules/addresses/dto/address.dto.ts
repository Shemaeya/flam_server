import { IsString, IsOptional, IsBoolean, IsNumber, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAddressDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '123 Main Street, Cocody' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Abidjan' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Cocody' })
  @IsString()
  state: string;

  @ApiProperty({ example: '00225' })
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 'Côte d\'Ivoire' })
  @IsString()
  country: string;

  @ApiProperty({ example: '+225123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Maison', required: false })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ example: 5.3599, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @ApiProperty({ example: -4.0083, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '123 Main Street, Cocody', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Abidjan', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Cocody', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: '00225', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ example: 'Côte d\'Ivoire', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: '+225123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Maison', required: false })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ example: 5.3599, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @ApiProperty({ example: -4.0083, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
