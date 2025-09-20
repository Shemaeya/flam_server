export declare class CreateCurrencyDto {
    code: string;
    name: string;
    symbol: string;
    symbolPosition: 'before' | 'after';
    decimalPlaces: number;
    thousandsSeparator: string;
    decimalSeparator: string;
    exchangeRate: number;
    isDefault: boolean;
    isActive: boolean;
}
export declare class UpdateCurrencyDto {
    code?: string;
    name?: string;
    symbol?: string;
    symbolPosition?: 'before' | 'after';
    decimalPlaces?: number;
    thousandsSeparator?: string;
    decimalSeparator?: string;
    exchangeRate?: number;
    isDefault?: boolean;
    isActive?: boolean;
}
export declare class CurrencyResponseDto {
    id: string;
    code: string;
    name: string;
    symbol: string;
    symbolPosition: 'before' | 'after';
    decimalPlaces: number;
    thousandsSeparator: string;
    decimalSeparator: string;
    exchangeRate: number;
    isDefault: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
