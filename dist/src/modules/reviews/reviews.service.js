"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createReviewDto) {
        const { orderId, productId, rating, comment } = createReviewDto;
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
            include: {
                items: {
                    where: { productId },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.items.length === 0) {
            throw new common_1.BadRequestException('Product not found in this order');
        }
        if (order.status !== 'DELIVERED') {
            throw new common_1.BadRequestException('Can only review products from delivered orders');
        }
        const existingReview = await this.prisma.review.findUnique({
            where: {
                userId_orderId_productId: {
                    userId,
                    orderId,
                    productId,
                },
            },
        });
        if (existingReview) {
            throw new common_1.BadRequestException('Review already exists for this product in this order');
        }
        const review = await this.prisma.review.create({
            data: {
                userId,
                orderId,
                productId,
                rating,
                comment,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                product: {
                    include: {
                        brand: true,
                        category: true,
                        type: true,
                    },
                },
            },
        });
        await this.updateProductRating(productId);
        return review;
    }
    async findAll(query) {
        const { productId, rating, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (productId) {
            where.productId = productId;
        }
        if (rating) {
            where.rating = rating;
        }
        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                    product: {
                        include: {
                            brand: true,
                            category: true,
                            type: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.review.count({ where }),
        ]);
        return {
            reviews,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findByProduct(productId, query) {
        const { rating, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = { productId };
        if (rating) {
            where.rating = rating;
        }
        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.review.count({ where }),
        ]);
        const averageRating = await this.calculateAverageRating(productId);
        return {
            reviews,
            averageRating,
            totalReviews: total,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const review = await this.prisma.review.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                product: {
                    include: {
                        brand: true,
                        category: true,
                        type: true,
                    },
                },
            },
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        return review;
    }
    async update(id, userId, updateReviewDto) {
        const review = await this.prisma.review.findFirst({
            where: { id, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        const updatedReview = await this.prisma.review.update({
            where: { id },
            data: updateReviewDto,
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                product: {
                    include: {
                        brand: true,
                        category: true,
                        type: true,
                    },
                },
            },
        });
        if (updateReviewDto.rating) {
            await this.updateProductRating(review.productId);
        }
        return updatedReview;
    }
    async remove(id, userId) {
        const review = await this.prisma.review.findFirst({
            where: { id, userId },
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        await this.prisma.review.delete({
            where: { id },
        });
        await this.updateProductRating(review.productId);
        return { message: 'Review deleted successfully' };
    }
    async getUserReviews(userId, query) {
        const { productId, rating, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = { userId };
        if (productId) {
            where.productId = productId;
        }
        if (rating) {
            where.rating = rating;
        }
        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                where,
                include: {
                    product: {
                        include: {
                            brand: true,
                            category: true,
                            type: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.review.count({ where }),
        ]);
        return {
            reviews,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async calculateAverageRating(productId) {
        const result = await this.prisma.review.aggregate({
            where: { productId },
            _avg: { rating: true },
        });
        return result._avg.rating || 0;
    }
    async updateProductRating(productId) {
        const averageRating = await this.calculateAverageRating(productId);
        await this.prisma.product.update({
            where: { id: productId },
            data: { rating: averageRating },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map