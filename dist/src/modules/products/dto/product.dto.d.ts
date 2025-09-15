export declare class CreateBrandDto {
    name: string;
    logo?: string;
    colors?: string[];
    gasColor?: string;
    description?: string;
    hotline?: string;
    website?: string;
}
export declare class UpdateBrandDto {
    name?: string;
    logo?: string;
    colors?: string[];
    gasColor?: string;
    description?: string;
    hotline?: string;
    website?: string;
    isActive?: boolean;
}
export declare class CreateCategoryDto {
    name: string;
    pricePurchase: number;
    priceRefill: number;
    currentName?: string;
    usage?: string;
    size?: string;
    weight?: number;
    unit?: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    pricePurchase?: number;
    priceRefill?: number;
    currentName?: string;
    usage?: string;
    size?: string;
    weight?: number;
    unit?: string;
    isActive?: boolean;
}
export declare class CreateTypeDto {
    name: string;
}
export declare class UpdateTypeDto {
    name?: string;
    isActive?: boolean;
}
export declare class CreateProductDto {
    brandId: string;
    categoryId: string;
    typeId: string;
    imageUrl?: string;
}
export declare class UpdateProductDto {
    brandId?: string;
    categoryId?: string;
    typeId?: string;
    imageUrl?: string;
    isActive?: boolean;
}
export declare class ProductQueryDto {
    brandId?: string;
    categoryId?: string;
    typeId?: string;
    search?: string;
    page?: number;
    limit?: number;
}
