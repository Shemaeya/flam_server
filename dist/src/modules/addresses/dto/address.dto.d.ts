export declare class CreateAddressDto {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
    label?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
}
export declare class UpdateAddressDto {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phone?: string;
    label?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
}
