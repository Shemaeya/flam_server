import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto, ReviewQueryDto } from './dto/review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(user: any, createReviewDto: CreateReviewDto): Promise<{
        product: {
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
        };
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
    }>;
    findAll(query: ReviewQueryDto): Promise<{
        reviews: ({
            product: {
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
            };
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
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    findByProduct(productId: string, query: ReviewQueryDto): Promise<{
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
        averageRating: number;
        totalReviews: number;
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getUserReviews(user: any, query: ReviewQueryDto): Promise<{
        reviews: ({
            product: {
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
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    findOne(id: string): Promise<{
        product: {
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
        };
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
    }>;
    update(id: string, user: any, updateReviewDto: UpdateReviewDto): Promise<{
        product: {
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
        };
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
    }>;
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
