import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateDeliveryZoneDto,
  UpdateDeliveryZoneDto,
  CreateDeliveryPricingRuleDto,
  UpdateDeliveryPricingRuleDto,
  CalculateDeliveryPriceDto,
  DeliveryPriceCalculationResponse,
} from './dto/delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  // Delivery Zones
  async createZone(createZoneDto: CreateDeliveryZoneDto) {
    const existingZone = await this.prisma.deliveryZone.findUnique({
      where: { name: createZoneDto.name },
    });

    if (existingZone) {
      throw new BadRequestException('Zone with this name already exists');
    }

    return this.prisma.deliveryZone.create({
      data: createZoneDto,
    });
  }

  async findAllZones() {
    return this.prisma.deliveryZone.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      include: {
        pricingRules: true,
      },
    });
  }

  async findZoneById(id: string) {
    const zone = await this.prisma.deliveryZone.findUnique({
      where: { id },
      include: {
        pricingRules: true,
      },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return zone;
  }

  async updateZone(id: string, updateZoneDto: UpdateDeliveryZoneDto) {
    const zone = await this.prisma.deliveryZone.findUnique({
      where: { id },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    if (updateZoneDto.name && updateZoneDto.name !== zone.name) {
      const existingZone = await this.prisma.deliveryZone.findUnique({
        where: { name: updateZoneDto.name },
      });

      if (existingZone) {
        throw new BadRequestException('Zone with this name already exists');
      }
    }

    return this.prisma.deliveryZone.update({
      where: { id },
      data: updateZoneDto,
      include: {
        pricingRules: true,
      },
    });
  }

  async deleteZone(id: string) {
    const zone = await this.prisma.deliveryZone.findUnique({
      where: { id },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    await this.prisma.deliveryZone.delete({
      where: { id },
    });

    return { message: 'Delivery zone deleted successfully' };
  }

  // Pricing Rules
  async createPricingRule(createRuleDto: CreateDeliveryPricingRuleDto) {
    const zone = await this.prisma.deliveryZone.findUnique({
      where: { id: createRuleDto.zoneId },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return this.prisma.deliveryPricingRule.create({
      data: createRuleDto,
    });
  }

  async findPricingRulesByZone(zoneId: string) {
    const zone = await this.prisma.deliveryZone.findUnique({
      where: { id: zoneId },
    });

    if (!zone) {
      throw new NotFoundException('Delivery zone not found');
    }

    return this.prisma.deliveryPricingRule.findMany({
      where: { zoneId },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startHour: 'asc' },
      ],
    });
  }

  async updatePricingRule(id: string, updateRuleDto: UpdateDeliveryPricingRuleDto) {
    const rule = await this.prisma.deliveryPricingRule.findUnique({
      where: { id },
    });

    if (!rule) {
      throw new NotFoundException('Pricing rule not found');
    }

    return this.prisma.deliveryPricingRule.update({
      where: { id },
      data: updateRuleDto,
    });
  }

  async deletePricingRule(id: string) {
    const rule = await this.prisma.deliveryPricingRule.findUnique({
      where: { id },
    });

    if (!rule) {
      throw new NotFoundException('Pricing rule not found');
    }

    await this.prisma.deliveryPricingRule.delete({
      where: { id },
    });

    return { message: 'Pricing rule deleted successfully' };
  }

  // Price Calculation
  async calculateDeliveryPrice(calculateDto: CalculateDeliveryPriceDto): Promise<DeliveryPriceCalculationResponse> {
    const { latitude, longitude, orderSubtotal, isUrgent = false } = calculateDto;

    // Find the zone for the given coordinates
    const zone = await this.findZoneForCoordinates(latitude, longitude);
    
    if (!zone) {
      throw new BadRequestException('Location is not in any delivery zone');
    }

    // Calculate distance (simplified - in production, use proper geospatial calculation)
    const distance = this.calculateDistance(latitude, longitude, zone);
    
    // Get pricing rules for current time
    const now = new Date();
    const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay(); // Convert Sunday (0) to 7
    const hour = now.getHours();

    const pricingRules = await this.prisma.deliveryPricingRule.findMany({
      where: {
        zoneId: zone.id,
        dayOfWeek,
        startHour: { lte: hour },
        endHour: { gt: hour },
        isUrgent,
      },
    });

    // Calculate multipliers
    const timeMultiplier = this.calculateTimeMultiplier(pricingRules, dayOfWeek, hour);
    const urgentMultiplier = isUrgent ? 1.5 : 1.0;

    // Calculate prices
    const basePrice = Number(zone.basePrice);
    const distancePrice = distance * Number(zone.pricePerKm);
    const subtotal = basePrice + distancePrice;
    
    // Apply multipliers
    const totalPrice = subtotal * timeMultiplier * urgentMultiplier;

    // Check for free delivery
    const freeDeliveryThreshold = zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null;
    const isFreeDelivery = freeDeliveryThreshold && orderSubtotal >= freeDeliveryThreshold;

    const finalPrice = isFreeDelivery ? 0 : totalPrice;

    // Build calculation details
    const calculationDetails = this.buildCalculationDetails(
      basePrice,
      distancePrice,
      timeMultiplier,
      urgentMultiplier,
      isFreeDelivery,
    );

    return {
      basePrice,
      distancePrice,
      timeMultiplier,
      urgentMultiplier,
      totalPrice: finalPrice,
      isFreeDelivery,
      calculationDetails,
      zoneName: zone.name,
      distance,
    };
  }

  private async findZoneForCoordinates(latitude: number, longitude: number) {
    const zones = await this.prisma.deliveryZone.findMany({
      where: { isActive: true },
    });

    for (const zone of zones) {
      const coordinates = zone.polygonCoordinates as number[][];
      if (this.isPointInPolygon(latitude, longitude, coordinates)) {
        return zone;
      }
    }

    return null;
  }

  private isPointInPolygon(lat: number, lng: number, polygon: number[][]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      if (((yi > lng) !== (yj > lng)) && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }

  private calculateDistance(latitude: number, longitude: number, zone: any): number {
    // Simplified distance calculation - in production, use proper geospatial library
    // For now, return a random distance between 1-10 km
    return Math.random() * 9 + 1;
  }

  private calculateTimeMultiplier(rules: any[], dayOfWeek: number, hour: number): number {
    if (rules.length === 0) {
      // Default multipliers based on time
      if (dayOfWeek === 6 || dayOfWeek === 7) { // Weekend
        return 1.15;
      }
      if ((hour >= 12 && hour < 14) || (hour >= 18 && hour < 20)) { // Peak hours
        return 1.20;
      }
      if (hour >= 22 || hour < 6) { // Off-peak hours
        return 0.90;
      }
      return 1.0;
    }

    // Use the first matching rule
    return Number(rules[0].multiplier);
  }

  private buildCalculationDetails(
    basePrice: number,
    distancePrice: number,
    timeMultiplier: number,
    urgentMultiplier: number,
    isFreeDelivery: boolean,
  ): string {
    if (isFreeDelivery) {
      return 'Free delivery (order threshold reached)';
    }

    const details = [
      `Base: ${basePrice} FCFA`,
      `Distance: ${distancePrice.toFixed(0)} FCFA`,
    ];

    if (timeMultiplier !== 1.0) {
      const percentage = ((timeMultiplier - 1) * 100).toFixed(0);
      const sign = timeMultiplier > 1 ? '+' : '';
      details.push(`Time: ${sign}${percentage}%`);
    }

    if (urgentMultiplier !== 1.0) {
      const percentage = ((urgentMultiplier - 1) * 100).toFixed(0);
      details.push(`Urgent: +${percentage}%`);
    }

    return details.join(', ');
  }

  // Check if coordinates are in service zone
  async checkServiceZone(latitude: number, longitude: number) {
    const zone = await this.findZoneForCoordinates(latitude, longitude);
    return {
      inServiceZone: !!zone,
      zoneName: zone?.name || null,
    };
  }
}
