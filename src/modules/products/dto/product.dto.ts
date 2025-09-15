import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBrandDto {
  @ApiProperty({ example: 'Total' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ example: ['red', 'blue'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiProperty({ example: 'red', required: false })
  @IsOptional()
  @IsString()
  gasColor?: string;

  @ApiProperty({ example: 'Leading gas brand', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '+225123456789', required: false })
  @IsOptional()
  @IsString()
  hotline?: string;

  @ApiProperty({ example: 'https://total.ci', required: false })
  @IsOptional()
  @IsString()
  website?: string;
}

export class UpdateBrandDto {
  @ApiProperty({ example: 'Total', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ example: ['red', 'blue'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiProperty({ example: 'red', required: false })
  @IsOptional()
  @IsString()
  gasColor?: string;

  @ApiProperty({ example: 'Leading gas brand', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '+225123456789', required: false })
  @IsOptional()
  @IsString()
  hotline?: string;

  @ApiProperty({ example: 'https://total.ci', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'B12' })
  @IsString()
  name: string;

  @ApiProperty({ example: 15000 })
  @IsNumber()
  @Type(() => Number)
  pricePurchase: number;

  @ApiProperty({ example: 12000 })
  @IsNumber()
  @Type(() => Number)
  priceRefill: number;

  @ApiProperty({ example: 'B12KG', required: false })
  @IsOptional()
  @IsString()
  currentName?: string;

  @ApiProperty({ example: 'Cuisine familiale', required: false })
  @IsOptional()
  @IsString()
  usage?: string;

  @ApiProperty({ example: '12kg', required: false })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight?: number;

  @ApiProperty({ example: 'kg', required: false })
  @IsOptional()
  @IsString()
  unit?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'B12', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 15000, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pricePurchase?: number;

  @ApiProperty({ example: 12000, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceRefill?: number;

  @ApiProperty({ example: 'B12KG', required: false })
  @IsOptional()
  @IsString()
  currentName?: string;

  @ApiProperty({ example: 'Cuisine familiale', required: false })
  @IsOptional()
  @IsString()
  usage?: string;

  @ApiProperty({ example: '12kg', required: false })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight?: number;

  @ApiProperty({ example: 'kg', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateTypeDto {
  @ApiProperty({ example: 'Butane' })
  @IsString()
  name: string;
}

export class UpdateTypeDto {
  @ApiProperty({ example: 'Butane', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateProductDto {
  @ApiProperty({ example: 'brand-id-123' })
  @IsString()
  brandId: string;

  @ApiProperty({ example: 'category-id-123' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 'type-id-123' })
  @IsString()
  typeId: string;

  @ApiProperty({ example: 'https://example.com/product.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'brand-id-123', required: false })
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiProperty({ example: 'category-id-123', required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ example: 'type-id-123', required: false })
  @IsOptional()
  @IsString()
  typeId?: string;

  @ApiProperty({ example: 'https://example.com/product.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ProductQueryDto {
  @ApiProperty({ example: 'brand-id-123', required: false })
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiProperty({ example: 'category-id-123', required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ example: 'type-id-123', required: false })
  @IsOptional()
  @IsString()
  typeId?: string;

  @ApiProperty({ example: 'search term', required: false })
  @IsOptional()
  @IsString()
  search?: string;

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
