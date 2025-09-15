export declare class CreateDeliveryZoneDto {
    name: string;
    basePrice: number;
    pricePerKm: number;
    freeDeliveryThreshold?: number;
    supportsUrgentDelivery?: boolean;
    polygonCoordinates: number[][];
}
export declare class UpdateDeliveryZoneDto {
    name?: string;
    basePrice?: number;
    pricePerKm?: number;
    freeDeliveryThreshold?: number;
    supportsUrgentDelivery?: boolean;
    polygonCoordinates?: number[][];
    isActive?: boolean;
}
export declare class CreateDeliveryPricingRuleDto {
    zoneId: string;
    dayOfWeek: number;
    startHour: number;
    endHour: number;
    multiplier: number;
    isUrgent?: boolean;
}
export declare class UpdateDeliveryPricingRuleDto {
    dayOfWeek?: number;
    startHour?: number;
    endHour?: number;
    multiplier?: number;
    isUrgent?: boolean;
}
export declare class CalculateDeliveryPriceDto {
    latitude: number;
    longitude: number;
    orderSubtotal: number;
    isUrgent?: boolean;
}
export declare class DeliveryPriceCalculationResponse {
    basePrice: number;
    distancePrice: number;
    timeMultiplier: number;
    urgentMultiplier: number;
    totalPrice: number;
    isFreeDelivery: boolean;
    calculationDetails: string;
    zoneName: string;
    distance: number;
}
