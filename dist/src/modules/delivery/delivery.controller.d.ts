import { DeliveryService } from './delivery.service';
import { CreateDeliveryZoneDto, UpdateDeliveryZoneDto, CreateDeliveryPricingRuleDto, UpdateDeliveryPricingRuleDto, CalculateDeliveryPriceDto } from './dto/delivery.dto';
export declare class DeliveryController {
    private readonly deliveryService;
    constructor(deliveryService: DeliveryService);
    createZone(createZoneDto: CreateDeliveryZoneDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        pricePerKm: import("@prisma/client/runtime/library").Decimal;
        freeDeliveryThreshold: import("@prisma/client/runtime/library").Decimal | null;
        supportsUrgentDelivery: boolean;
        polygonCoordinates: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findAllZones(): Promise<({
        pricingRules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dayOfWeek: number;
            startHour: number;
            endHour: number;
            multiplier: import("@prisma/client/runtime/library").Decimal;
            isUrgent: boolean;
            zoneId: string;
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        pricePerKm: import("@prisma/client/runtime/library").Decimal;
        freeDeliveryThreshold: import("@prisma/client/runtime/library").Decimal | null;
        supportsUrgentDelivery: boolean;
        polygonCoordinates: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    findZoneById(id: string): Promise<{
        pricingRules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dayOfWeek: number;
            startHour: number;
            endHour: number;
            multiplier: import("@prisma/client/runtime/library").Decimal;
            isUrgent: boolean;
            zoneId: string;
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        pricePerKm: import("@prisma/client/runtime/library").Decimal;
        freeDeliveryThreshold: import("@prisma/client/runtime/library").Decimal | null;
        supportsUrgentDelivery: boolean;
        polygonCoordinates: import("@prisma/client/runtime/library").JsonValue;
    }>;
    updateZone(id: string, updateZoneDto: UpdateDeliveryZoneDto): Promise<{
        pricingRules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dayOfWeek: number;
            startHour: number;
            endHour: number;
            multiplier: import("@prisma/client/runtime/library").Decimal;
            isUrgent: boolean;
            zoneId: string;
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        basePrice: import("@prisma/client/runtime/library").Decimal;
        pricePerKm: import("@prisma/client/runtime/library").Decimal;
        freeDeliveryThreshold: import("@prisma/client/runtime/library").Decimal | null;
        supportsUrgentDelivery: boolean;
        polygonCoordinates: import("@prisma/client/runtime/library").JsonValue;
    }>;
    deleteZone(id: string): Promise<{
        message: string;
    }>;
    createPricingRule(createRuleDto: CreateDeliveryPricingRuleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dayOfWeek: number;
        startHour: number;
        endHour: number;
        multiplier: import("@prisma/client/runtime/library").Decimal;
        isUrgent: boolean;
        zoneId: string;
    }>;
    findPricingRulesByZone(zoneId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dayOfWeek: number;
        startHour: number;
        endHour: number;
        multiplier: import("@prisma/client/runtime/library").Decimal;
        isUrgent: boolean;
        zoneId: string;
    }[]>;
    updatePricingRule(id: string, updateRuleDto: UpdateDeliveryPricingRuleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dayOfWeek: number;
        startHour: number;
        endHour: number;
        multiplier: import("@prisma/client/runtime/library").Decimal;
        isUrgent: boolean;
        zoneId: string;
    }>;
    deletePricingRule(id: string): Promise<{
        message: string;
    }>;
    calculateDeliveryPrice(calculateDto: CalculateDeliveryPriceDto): Promise<import("./dto/delivery.dto").DeliveryPriceCalculationResponse>;
    checkServiceZone(latitude: number, longitude: number): Promise<{
        inServiceZone: boolean;
        zoneName: string;
    }>;
}
