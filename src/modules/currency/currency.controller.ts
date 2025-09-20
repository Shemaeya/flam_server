import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateCurrencyDto, UpdateCurrencyDto, CurrencyResponseDto } from './dto/currency.dto';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle devise' })
  @ApiResponse({ status: 201, description: 'Devise créée avec succès' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createCurrencyDto: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir toutes les devises' })
  @ApiResponse({ status: 200, description: 'Liste des devises' })
  async findAll(): Promise<CurrencyResponseDto[]> {
    return this.currencyService.findAll();
  }

  @Get('default')
  @ApiOperation({ summary: 'Obtenir la devise par défaut' })
  @ApiResponse({ status: 200, description: 'Devise par défaut' })
  @ApiResponse({ status: 404, description: 'Aucune devise par défaut trouvée' })
  async getDefault(): Promise<CurrencyResponseDto> {
    return this.currencyService.getDefault();
  }

  @Get('format')
  @ApiOperation({ summary: 'Formater un prix avec la devise' })
  @ApiResponse({ status: 200, description: 'Prix formaté' })
  async formatPrice(
    @Query('amount') amount: number,
    @Query('code') code?: string,
  ): Promise<{ formatted: string }> {
    const formatted = await this.currencyService.formatPrice(amount, code);
    return { formatted };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une devise par ID' })
  @ApiParam({ name: 'id', description: 'ID de la devise' })
  @ApiResponse({ status: 200, description: 'Devise trouvée' })
  @ApiResponse({ status: 404, description: 'Devise non trouvée' })
  async findOne(@Param('id') id: string): Promise<CurrencyResponseDto> {
    return this.currencyService.findOne(id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Obtenir une devise par code' })
  @ApiParam({ name: 'code', description: 'Code de la devise (ex: FCFA, USD)' })
  @ApiResponse({ status: 200, description: 'Devise trouvée' })
  @ApiResponse({ status: 404, description: 'Devise non trouvée' })
  async findByCode(@Param('code') code: string): Promise<CurrencyResponseDto> {
    return this.currencyService.findByCode(code);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour une devise' })
  @ApiParam({ name: 'id', description: 'ID de la devise à mettre à jour' })
  @ApiResponse({ status: 200, description: 'Devise mise à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Devise non trouvée' })
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.update(id, updateCurrencyDto);
  }

  @Patch(':id/set-default')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Définir une devise comme devise par défaut' })
  @ApiParam({ name: 'id', description: 'ID de la devise à définir par défaut' })
  @ApiResponse({ status: 200, description: 'Devise définie par défaut avec succès' })
  @ApiResponse({ status: 404, description: 'Devise non trouvée' })
  async setDefault(@Param('id') id: string): Promise<CurrencyResponseDto> {
    return this.currencyService.setDefault(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une devise' })
  @ApiParam({ name: 'id', description: 'ID de la devise à supprimer' })
  @ApiResponse({ status: 200, description: 'Devise supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Devise non trouvée' })
  @ApiResponse({ status: 400, description: 'Impossible de supprimer la devise par défaut' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.currencyService.remove(id);
    return { message: 'Devise supprimée avec succès' };
  }
}

