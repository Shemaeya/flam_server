import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCurrencyDto, UpdateCurrencyDto, CurrencyResponseDto } from './dto/currency.dto';

// Interface pour contourner les erreurs de linting Prisma
interface PrismaWithCurrency {
  currency: {
    findUnique: (args: any) => Promise<any>;
    findMany: (args?: any) => Promise<any>;
    findFirst: (args: any) => Promise<any>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    updateMany: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
}

@Injectable()
export class CurrencyService {
  private prisma: PrismaWithCurrency;
  
  constructor(prismaService: PrismaService) {
    this.prisma = prismaService as any;
  }

  async create(createCurrencyDto: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    // Vérifier si le code existe déjà
    const existingCurrency = await this.prisma.currency.findUnique({
      where: { code: createCurrencyDto.code },
    });

    if (existingCurrency) {
      throw new BadRequestException('Une devise avec ce code existe déjà');
    }

    // Si c'est la devise par défaut, désactiver les autres
    if (createCurrencyDto.isDefault) {
      await this.prisma.currency.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const currency = await this.prisma.currency.create({
      data: createCurrencyDto,
    });

    return this.mapToResponseDto(currency);
  }

  async findAll(): Promise<CurrencyResponseDto[]> {
    const currencies = await this.prisma.currency.findMany({
      orderBy: [
        { isDefault: 'desc' },
        { isActive: 'desc' },
        { code: 'asc' },
      ],
    });

    return currencies.map(currency => this.mapToResponseDto(currency));
  }

  async findOne(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      throw new NotFoundException('Devise non trouvée');
    }

    return this.mapToResponseDto(currency);
  }

  async findByCode(code: string): Promise<CurrencyResponseDto> {
    const currency = await this.prisma.currency.findUnique({
      where: { code },
    });

    if (!currency) {
      throw new NotFoundException('Devise non trouvée');
    }

    return this.mapToResponseDto(currency);
  }

  async getDefault(): Promise<CurrencyResponseDto> {
    const currency = await this.prisma.currency.findFirst({
      where: { isDefault: true, isActive: true },
    });

    if (!currency) {
      throw new NotFoundException('Aucune devise par défaut trouvée');
    }

    return this.mapToResponseDto(currency);
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<CurrencyResponseDto> {
    const existingCurrency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!existingCurrency) {
      throw new NotFoundException('Devise non trouvée');
    }

    // Si on change le code, vérifier qu'il n'existe pas déjà
    if (updateCurrencyDto.code && updateCurrencyDto.code !== existingCurrency.code) {
      const codeExists = await this.prisma.currency.findUnique({
        where: { code: updateCurrencyDto.code },
      });

      if (codeExists) {
        throw new BadRequestException('Une devise avec ce code existe déjà');
      }
    }

    // Si on définit comme devise par défaut, désactiver les autres
    if (updateCurrencyDto.isDefault) {
      await this.prisma.currency.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const updatedCurrency = await this.prisma.currency.update({
      where: { id },
      data: updateCurrencyDto,
    });

    return this.mapToResponseDto(updatedCurrency);
  }

  async remove(id: string): Promise<void> {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      throw new NotFoundException('Devise non trouvée');
    }

    // Ne pas permettre la suppression de la devise par défaut
    if (currency.isDefault) {
      throw new BadRequestException('Impossible de supprimer la devise par défaut');
    }

    await this.prisma.currency.delete({
      where: { id },
    });
  }

  async setDefault(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      throw new NotFoundException('Devise non trouvée');
    }

    if (!currency.isActive) {
      throw new BadRequestException('Impossible de définir une devise inactive comme devise par défaut');
    }

    // Désactiver toutes les autres devises par défaut
    await this.prisma.currency.updateMany({
      where: { isDefault: true },
      data: { isDefault: false },
    });

    // Définir cette devise comme par défaut
    const updatedCurrency = await this.prisma.currency.update({
      where: { id },
      data: { isDefault: true },
    });

    return this.mapToResponseDto(updatedCurrency);
  }

  async formatPrice(amount: number, currencyCode?: string): Promise<string> {
    let currency: any;

    if (currencyCode) {
      currency = await this.prisma.currency.findUnique({
        where: { code: currencyCode, isActive: true },
      });
    } else {
      currency = await this.prisma.currency.findFirst({
        where: { isDefault: true, isActive: true },
      });
    }

    if (!currency) {
      // Fallback si aucune devise trouvée
      return `${amount.toFixed(2)} FCFA`;
    }

    const formattedAmount = this.formatNumber(amount, currency);
    
    if (currency.symbolPosition === 'before') {
      return `${currency.symbol}${formattedAmount}`;
    } else {
      return `${formattedAmount} ${currency.symbol}`;
    }
  }

  private formatNumber(amount: number, currency: any): string {
    // Formatage manuel pour éviter les problèmes de locale
    const integerPart = Math.floor(amount);
    const decimalPart = Math.round((amount - integerPart) * Math.pow(10, currency.decimalPlaces));
    
    // Formater la partie entière avec les séparateurs de milliers
    let formattedInteger = integerPart.toString();
    if (formattedInteger.length > 3) {
      const parts = [];
      for (let i = formattedInteger.length; i > 0; i -= 3) {
        const start = Math.max(0, i - 3);
        parts.unshift(formattedInteger.slice(start, i));
      }
      formattedInteger = parts.join(currency.thousandsSeparator);
    }
    
    // Ajouter la partie décimale si nécessaire
    let formatted = formattedInteger;
    if (currency.decimalPlaces > 0) {
      const decimalStr = decimalPart.toString().padStart(currency.decimalPlaces, '0');
      formatted += currency.decimalSeparator + decimalStr;
    }
    
    return formatted;
  }

  private mapToResponseDto(currency: any): CurrencyResponseDto {
    return {
      id: currency.id,
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      symbolPosition: currency.symbolPosition,
      decimalPlaces: currency.decimalPlaces,
      thousandsSeparator: currency.thousandsSeparator,
      decimalSeparator: currency.decimalSeparator,
      exchangeRate: currency.exchangeRate,
      isDefault: currency.isDefault,
      isActive: currency.isActive,
      createdAt: currency.createdAt,
      updatedAt: currency.updatedAt,
    };
  }
}
