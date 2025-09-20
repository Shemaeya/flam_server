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
    try {
      const { latitude, longitude, orderSubtotal, isUrgent = false } = calculateDto;

      // Find the zone for the given coordinates
      const zone = await this.findZoneForCoordinates(latitude, longitude);
      
      if (!zone) {
        throw new BadRequestException('Position hors zone de livraison. Nos services ne couvrent pas cette région.');
      }

      if (!zone.isActive) {
        throw new BadRequestException('Zone de livraison temporairement indisponible.');
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
    } catch (error) {
      throw new BadRequestException('Erreur lors du calcul du prix de livraison: ' + error.message);
    }
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
    // Pour simplifier, vérifions si le point est dans le rectangle englobant
    // En production, utiliser une bibliothèque géospatiale comme Turf.js
    
    if (!polygon || polygon.length < 3) return false;
    
    // Calculer les limites du polygone
    let minLat = polygon[0][0];
    let maxLat = polygon[0][0];
    let minLng = polygon[0][1];
    let maxLng = polygon[0][1];
    
    for (const coord of polygon) {
      minLat = Math.min(minLat, coord[0]);
      maxLat = Math.max(maxLat, coord[0]);
      minLng = Math.min(minLng, coord[1]);
      maxLng = Math.max(maxLng, coord[1]);
    }
    
    // Vérifier si le point est dans le rectangle englobant
    return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
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
    try {
      const zone = await this.findZoneForCoordinates(latitude, longitude);
      
      if (zone && zone.isActive) {
        // Calculer le centre de la zone pour référence
        const polygon = zone.polygonCoordinates as number[][];
        let centerLat = 0;
        let centerLng = 0;
        
        if (polygon && polygon.length > 0) {
          for (const coord of polygon) {
            centerLat += coord[0];
            centerLng += coord[1];
          }
          centerLat /= polygon.length;
          centerLng /= polygon.length;
        }

        return {
          success: true,
          data: {
            inServiceZone: true,
            zoneName: zone.name,
            city: zone.name,
            zoneId: zone.id,
            basePrice: zone.basePrice,
            pricePerKm: zone.pricePerKm,
            freeDeliveryThreshold: zone.freeDeliveryThreshold,
            supportsUrgentDelivery: zone.supportsUrgentDelivery,
            centerLatitude: centerLat,
            centerLongitude: centerLng,
            isActive: zone.isActive,
            message: `Position dans la zone de livraison: ${zone.name}`,
          }
        };
      } else {
        return {
          success: false,
          data: {
            inServiceZone: false,
            zoneName: null,
            city: null,
            zoneId: null,
            basePrice: null,
            pricePerKm: null,
            freeDeliveryThreshold: null,
            supportsUrgentDelivery: false,
            centerLatitude: null,
            centerLongitude: null,
            isActive: false,
            message: 'Position hors zone de livraison. Nos services ne couvrent pas cette région.',
          }
        };
      }
    } catch (error) {
      return {
        success: false,
        data: {
          inServiceZone: false,
          zoneName: null,
          city: null,
          zoneId: null,
          basePrice: null,
          pricePerKm: null,
          freeDeliveryThreshold: null,
          supportsUrgentDelivery: false,
          centerLatitude: null,
          centerLongitude: null,
          isActive: false,
          message: 'Erreur lors de la vérification de la zone de service',
        }
      };
    }
  }

  // Debug method for polygon detection
  async debugPolygonDetection(latitude: number, longitude: number) {
    const zones = await this.prisma.deliveryZone.findMany({
      where: { isActive: true },
    });

    const results = zones.map(zone => {
      const coordinates = zone.polygonCoordinates as number[][];
      const isInside = this.isPointInPolygon(latitude, longitude, coordinates);
      
      return {
        zoneName: zone.name,
        coordinates: coordinates,
        isInside: isInside,
        testPoint: { latitude, longitude }
      };
    });

    return {
      success: true,
      data: {
        testPoint: { latitude, longitude },
        zones: results
      }
    };
  }

}
