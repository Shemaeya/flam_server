import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  CreateDeliveryZoneDto,
  UpdateDeliveryZoneDto,
  CreateDeliveryPricingRuleDto,
  UpdateDeliveryPricingRuleDto,
  CalculateDeliveryPriceDto,
} from './dto/delivery.dto';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  // Zones
  @Post('zones')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new delivery zone' })
  @ApiResponse({ status: 201, description: 'Delivery zone created successfully' })
  @ApiResponse({ status: 400, description: 'Zone already exists' })
  async createZone(@Body() createZoneDto: CreateDeliveryZoneDto) {
    return this.deliveryService.createZone(createZoneDto);
  }

  @Get('zones')
  @ApiOperation({ summary: 'Get all active delivery zones' })
  @ApiResponse({ status: 200, description: 'Delivery zones retrieved successfully' })
  async findAllZones() {
    return this.deliveryService.findAllZones();
  }

  @Get('zones/:id')
  @ApiOperation({ summary: 'Get delivery zone by ID' })
  @ApiParam({ name: 'id', description: 'Zone ID' })
  @ApiResponse({ status: 200, description: 'Delivery zone retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Delivery zone not found' })
  async findZoneById(@Param('id') id: string) {
    return this.deliveryService.findZoneById(id);
  }

  @Patch('zones/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update delivery zone' })
  @ApiParam({ name: 'id', description: 'Zone ID' })
  @ApiResponse({ status: 200, description: 'Delivery zone updated successfully' })
  @ApiResponse({ status: 404, description: 'Delivery zone not found' })
  async updateZone(@Param('id') id: string, @Body() updateZoneDto: UpdateDeliveryZoneDto) {
    return this.deliveryService.updateZone(id, updateZoneDto);
  }

  @Delete('zones/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete delivery zone' })
  @ApiParam({ name: 'id', description: 'Zone ID' })
  @ApiResponse({ status: 200, description: 'Delivery zone deleted successfully' })
  @ApiResponse({ status: 404, description: 'Delivery zone not found' })
  async deleteZone(@Param('id') id: string) {
    return this.deliveryService.deleteZone(id);
  }

  // Pricing Rules
  @Post('pricing-rules')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new pricing rule' })
  @ApiResponse({ status: 201, description: 'Pricing rule created successfully' })
  @ApiResponse({ status: 404, description: 'Delivery zone not found' })
  async createPricingRule(@Body() createRuleDto: CreateDeliveryPricingRuleDto) {
    return this.deliveryService.createPricingRule(createRuleDto);
  }

  @Get('zones/:zoneId/pricing-rules')
  @ApiOperation({ summary: 'Get pricing rules for a zone' })
  @ApiParam({ name: 'zoneId', description: 'Zone ID' })
  @ApiResponse({ status: 200, description: 'Pricing rules retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Delivery zone not found' })
  async findPricingRulesByZone(@Param('zoneId') zoneId: string) {
    return this.deliveryService.findPricingRulesByZone(zoneId);
  }

  @Patch('pricing-rules/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update pricing rule' })
  @ApiParam({ name: 'id', description: 'Pricing rule ID' })
  @ApiResponse({ status: 200, description: 'Pricing rule updated successfully' })
  @ApiResponse({ status: 404, description: 'Pricing rule not found' })
  async updatePricingRule(@Param('id') id: string, @Body() updateRuleDto: UpdateDeliveryPricingRuleDto) {
    return this.deliveryService.updatePricingRule(id, updateRuleDto);
  }

  @Delete('pricing-rules/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete pricing rule' })
  @ApiParam({ name: 'id', description: 'Pricing rule ID' })
  @ApiResponse({ status: 200, description: 'Pricing rule deleted successfully' })
  @ApiResponse({ status: 404, description: 'Pricing rule not found' })
  async deletePricingRule(@Param('id') id: string) {
    return this.deliveryService.deletePricingRule(id);
  }

  // Price Calculation
  @Post('calculate-price')
  @ApiOperation({ summary: 'Calculate delivery price' })
  @ApiResponse({ status: 200, description: 'Delivery price calculated successfully' })
  @ApiResponse({ status: 400, description: 'Location not in service zone' })
  async calculateDeliveryPrice(@Body() calculateDto: CalculateDeliveryPriceDto) {
    return this.deliveryService.calculateDeliveryPrice(calculateDto);
  }


  @Get('check-service-zone')
  @ApiOperation({ summary: 'Check if coordinates are in service zone' })
  @ApiResponse({ status: 200, description: 'Service zone status checked' })
  async checkServiceZone(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return this.deliveryService.checkServiceZone(latitude, longitude);
  }

  @Get('debug-polygon')
  @ApiOperation({ summary: 'Debug polygon detection' })
  async debugPolygon(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return this.deliveryService.debugPolygonDetection(latitude, longitude);
  }
}
