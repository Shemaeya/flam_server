import { IsString, IsBoolean, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @ApiProperty({ description: 'Code de la devise (ex: FCFA, USD, EUR)' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Nom de la devise (ex: Franc CFA, Dollar US)' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Symbole de la devise (ex: FCFA, $, €)' })
  @IsString()
  symbol: string;

  @ApiProperty({ description: 'Position du symbole (before, after)' })
  @IsString()
  symbolPosition: 'before' | 'after';

  @ApiProperty({ description: 'Nombre de décimales à afficher' })
  @IsNumber()
  @Min(0)
  @Max(4)
  decimalPlaces: number;

  @ApiProperty({ description: 'Séparateur de milliers' })
  @IsString()
  thousandsSeparator: string;

  @ApiProperty({ description: 'Séparateur de décimales' })
  @IsString()
  decimalSeparator: string;

  @ApiProperty({ description: 'Taux de change par rapport à la devise de base' })
  @IsNumber()
  @Min(0)
  exchangeRate: number;

  @ApiProperty({ description: 'Devise par défaut' })
  @IsBoolean()
  isDefault: boolean;

  @ApiProperty({ description: 'Devise active' })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateCurrencyDto {
  @ApiPropertyOptional({ description: 'Code de la devise' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Nom de la devise' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Symbole de la devise' })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiPropertyOptional({ description: 'Position du symbole' })
  @IsOptional()
  @IsString()
  symbolPosition?: 'before' | 'after';

  @ApiPropertyOptional({ description: 'Nombre de décimales' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4)
  decimalPlaces?: number;

  @ApiPropertyOptional({ description: 'Séparateur de milliers' })
  @IsOptional()
  @IsString()
  thousandsSeparator?: string;

  @ApiPropertyOptional({ description: 'Séparateur de décimales' })
  @IsOptional()
  @IsString()
  decimalSeparator?: string;

  @ApiPropertyOptional({ description: 'Taux de change' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  exchangeRate?: number;

  @ApiPropertyOptional({ description: 'Devise par défaut' })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiPropertyOptional({ description: 'Devise active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CurrencyResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  symbolPosition: 'before' | 'after';

  @ApiProperty()
  decimalPlaces: number;

  @ApiProperty()
  thousandsSeparator: string;

  @ApiProperty()
  decimalSeparator: string;

  @ApiProperty()
  exchangeRate: number;

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

