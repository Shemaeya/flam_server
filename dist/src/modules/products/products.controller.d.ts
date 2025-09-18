import { ProductsService } from './products.service';
import { CreateBrandDto, UpdateBrandDto, CreateCategoryDto, UpdateCategoryDto, CreateTypeDto, UpdateTypeDto, CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createBrand(createBrandDto: CreateBrandDto): Promise<{
        id: string;
        name: string;
        logo: string | null;
        colors: import("@prisma/client/runtime/library").JsonValue | null;
        gasColor: string | null;
        description: string | null;
        hotline: string | null;
        website: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllBrands(): Promise<{
        id: string;
        name: string;
        logo: string | null;
        colors: import("@prisma/client/runtime/library").JsonValue | null;
        gasColor: string | null;
        description: string | null;
        hotline: string | null;
        website: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findBrandById(id: string): Promise<{
        products: ({
            category: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                pricePurchase: import("@prisma/client/runtime/library").Decimal;
                priceRefill: import("@prisma/client/runtime/library").Decimal;
                currentName: string | null;
                usage: string | null;
                size: string | null;
                weight: import("@prisma/client/runtime/library").Decimal | null;
                unit: string | null;
            };
            type: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            brandId: string;
            categoryId: string;
            typeId: string;
        })[];
    } & {
        id: string;
        name: string;
        logo: string | null;
        colors: import("@prisma/client/runtime/library").JsonValue | null;
        gasColor: string | null;
        description: string | null;
        hotline: string | null;
        website: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateBrand(id: string, updateBrandDto: UpdateBrandDto): Promise<{
        id: string;
        name: string;
        logo: string | null;
        colors: import("@prisma/client/runtime/library").JsonValue | null;
        gasColor: string | null;
        description: string | null;
        hotline: string | null;
        website: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteBrand(id: string): Promise<{
        message: string;
    }>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        pricePurchase: import("@prisma/client/runtime/library").Decimal;
        priceRefill: import("@prisma/client/runtime/library").Decimal;
        currentName: string | null;
        usage: string | null;
        size: string | null;
        weight: import("@prisma/client/runtime/library").Decimal | null;
        unit: string | null;
    }>;
    findAllCategories(): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        pricePurchase: import("@prisma/client/runtime/library").Decimal;
        priceRefill: import("@prisma/client/runtime/library").Decimal;
        currentName: string | null;
        usage: string | null;
        size: string | null;
        weight: import("@prisma/client/runtime/library").Decimal | null;
        unit: string | null;
    }[]>;
    findCategoryById(id: string): Promise<{
        products: ({
            brand: {
                id: string;
                name: string;
                logo: string | null;
                colors: import("@prisma/client/runtime/library").JsonValue | null;
                gasColor: string | null;
                description: string | null;
                hotline: string | null;
                website: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
            type: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            brandId: string;
            categoryId: string;
            typeId: string;
        })[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        pricePurchase: import("@prisma/client/runtime/library").Decimal;
        priceRefill: import("@prisma/client/runtime/library").Decimal;
        currentName: string | null;
        usage: string | null;
        size: string | null;
        weight: import("@prisma/client/runtime/library").Decimal | null;
        unit: string | null;
    }>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        pricePurchase: import("@prisma/client/runtime/library").Decimal;
        priceRefill: import("@prisma/client/runtime/library").Decimal;
        currentName: string | null;
        usage: string | null;
        size: string | null;
        weight: import("@prisma/client/runtime/library").Decimal | null;
        unit: string | null;
    }>;
    deleteCategory(id: string): Promise<{
        message: string;
    }>;
    createType(createTypeDto: CreateTypeDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllTypes(): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findTypeById(id: string): Promise<{
        products: ({
            brand: {
                id: string;
                name: string;
                logo: string | null;
                colors: import("@prisma/client/runtime/library").JsonValue | null;
                gasColor: string | null;
                description: string | null;
                hotline: string | null;
                website: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
            category: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                pricePurchase: import("@prisma/client/runtime/library").Decimal;
                priceRefill: import("@prisma/client/runtime/library").Decimal;
                currentName: string | null;
                usage: string | null;
                size: string | null;
                weight: import("@prisma/client/runtime/library").Decimal | null;
                unit: string | null;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            brandId: string;
            categoryId: string;
            typeId: string;
        })[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateType(id: string, updateTypeDto: UpdateTypeDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteType(id: string): Promise<{
        message: string;
    }>;
    createProduct(createProductDto: CreateProductDto): Promise<{
        brand: {
            id: string;
            name: string;
            logo: string | null;
            colors: import("@prisma/client/runtime/library").JsonValue | null;
            gasColor: string | null;
            description: string | null;
            hotline: string | null;
            website: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        category: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            pricePurchase: import("@prisma/client/runtime/library").Decimal;
            priceRefill: import("@prisma/client/runtime/library").Decimal;
            currentName: string | null;
            usage: string | null;
            size: string | null;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            unit: string | null;
        };
        type: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        rating: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        brandId: string;
        categoryId: string;
        typeId: string;
    }>;
    findAllProducts(query: ProductQueryDto): Promise<{
        products: {
            averageRating: number;
            reviewCount: number;
            totalStock: number;
            isInStock: boolean;
            brand: {
                id: string;
                name: string;
                logo: string | null;
                colors: import("@prisma/client/runtime/library").JsonValue | null;
                gasColor: string | null;
                description: string | null;
                hotline: string | null;
                website: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
            category: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                pricePurchase: import("@prisma/client/runtime/library").Decimal;
                priceRefill: import("@prisma/client/runtime/library").Decimal;
                currentName: string | null;
                usage: string | null;
                size: string | null;
                weight: import("@prisma/client/runtime/library").Decimal | null;
                unit: string | null;
            };
            type: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
            shopStocks: ({
                shop: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    address: string;
                    city: string;
                    state: string;
                    latitude: import("@prisma/client/runtime/library").Decimal;
                    longitude: import("@prisma/client/runtime/library").Decimal;
                    phone: string;
                    email: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                quantity: number;
                shopId: string;
                productId: string;
            })[];
            reviews: {
                rating: number;
            }[];
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            brandId: string;
            categoryId: string;
            typeId: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getProductsForMobile(query: ProductQueryDto): Promise<{
        success: boolean;
        data: {
            products: {
                averageRating: number;
                reviewCount: number;
                totalStock: number;
                isInStock: boolean;
                stockByShop: {
                    shopId: string;
                    shopName: string;
                    quantity: number;
                    shop: {
                        id: string;
                        name: string;
                        address: string;
                        city: string;
                        state: string;
                        latitude: import("@prisma/client/runtime/library").Decimal;
                        longitude: import("@prisma/client/runtime/library").Decimal;
                        phone: string;
                        email: string;
                    };
                }[];
                brand: {
                    id: string;
                    name: string;
                    logo: string;
                    colors: import("@prisma/client/runtime/library").JsonValue;
                    gasColor: string;
                    description: string;
                    hotline: string;
                    website: string;
                };
                category: {
                    id: string;
                    name: string;
                    pricePurchase: import("@prisma/client/runtime/library").Decimal;
                    priceRefill: import("@prisma/client/runtime/library").Decimal;
                    currentName: string;
                    usage: string;
                    size: string;
                    weight: import("@prisma/client/runtime/library").Decimal;
                    unit: string;
                };
                type: {
                    id: string;
                    name: string;
                };
                shopStocks: ({
                    shop: {
                        id: string;
                        name: string;
                        address: string;
                        city: string;
                        state: string;
                        latitude: import("@prisma/client/runtime/library").Decimal;
                        longitude: import("@prisma/client/runtime/library").Decimal;
                        phone: string;
                        email: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    quantity: number;
                    shopId: string;
                    productId: string;
                })[];
                reviews: {
                    rating: number;
                }[];
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                rating: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                brandId: string;
                categoryId: string;
                typeId: string;
            }[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
    }>;
    searchProducts(searchTerm: string): Promise<{
        averageRating: number;
        reviewCount: any;
        totalStock: any;
        isInStock: boolean;
        brand: {
            id: string;
            name: string;
            logo: string | null;
            colors: import("@prisma/client/runtime/library").JsonValue | null;
            gasColor: string | null;
            description: string | null;
            hotline: string | null;
            website: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        category: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            pricePurchase: import("@prisma/client/runtime/library").Decimal;
            priceRefill: import("@prisma/client/runtime/library").Decimal;
            currentName: string | null;
            usage: string | null;
            size: string | null;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            unit: string | null;
        };
        type: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        shopStocks: ({
            shop: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                city: string;
                state: string;
                latitude: import("@prisma/client/runtime/library").Decimal;
                longitude: import("@prisma/client/runtime/library").Decimal;
                phone: string;
                email: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            shopId: string;
            productId: string;
        })[];
        reviews: {
            rating: number;
        }[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        rating: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        brandId: string;
        categoryId: string;
        typeId: string;
    }[]>;
    findProductById(id: string): Promise<{
        averageRating: number;
        reviewsCount: number;
        brand: {
            id: string;
            name: string;
            logo: string | null;
            colors: import("@prisma/client/runtime/library").JsonValue | null;
            gasColor: string | null;
            description: string | null;
            hotline: string | null;
            website: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        category: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            pricePurchase: import("@prisma/client/runtime/library").Decimal;
            priceRefill: import("@prisma/client/runtime/library").Decimal;
            currentName: string | null;
            usage: string | null;
            size: string | null;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            unit: string | null;
        };
        type: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        shopStocks: ({
            shop: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                address: string;
                city: string;
                state: string;
                latitude: import("@prisma/client/runtime/library").Decimal;
                longitude: import("@prisma/client/runtime/library").Decimal;
                phone: string;
                email: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            shopId: string;
            productId: string;
        })[];
        reviews: ({
            user: {
                id: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            productId: string;
            userId: string;
            orderId: string;
            comment: string | null;
        })[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        rating: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        brandId: string;
        categoryId: string;
        typeId: string;
    }>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<{
        brand: {
            id: string;
            name: string;
            logo: string | null;
            colors: import("@prisma/client/runtime/library").JsonValue | null;
            gasColor: string | null;
            description: string | null;
            hotline: string | null;
            website: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        category: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            pricePurchase: import("@prisma/client/runtime/library").Decimal;
            priceRefill: import("@prisma/client/runtime/library").Decimal;
            currentName: string | null;
            usage: string | null;
            size: string | null;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            unit: string | null;
        };
        type: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        rating: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        brandId: string;
        categoryId: string;
        typeId: string;
    }>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
