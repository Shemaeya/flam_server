import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateReviewDto,
  UpdateReviewDto,
  ReviewQueryDto,
} from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    const { orderId, productId, rating, comment } = createReviewDto;

    // Verify that the order exists and belongs to the user
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: {
          where: { productId },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.items.length === 0) {
      throw new BadRequestException('Product not found in this order');
    }

    // Check if order is delivered
    if (order.status !== 'DELIVERED') {
      throw new BadRequestException('Can only review products from delivered orders');
    }

    // Check if review already exists
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
      throw new BadRequestException('Review already exists for this product in this order');
    }

    // Create the review
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

    // Update product average rating
    await this.updateProductRating(productId);

    return review;
  }

  async findAll(query: ReviewQueryDto) {
    const { productId, rating, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
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

  async findByProduct(productId: string, query: ReviewQueryDto) {
    const { rating, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { productId };
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

    // Calculate average rating
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

  async findOne(id: string) {
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
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: string, userId: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findFirst({
      where: { id, userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
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

    // Update product average rating if rating changed
    if (updateReviewDto.rating) {
      await this.updateProductRating(review.productId);
    }

    return updatedReview;
  }

  async remove(id: string, userId: string) {
    const review = await this.prisma.review.findFirst({
      where: { id, userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.prisma.review.delete({
      where: { id },
    });

    // Update product average rating
    await this.updateProductRating(review.productId);

    return { message: 'Review deleted successfully' };
  }

  async getUserReviews(userId: string, query: ReviewQueryDto) {
    const { productId, rating, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
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

  private async calculateAverageRating(productId: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });

    return result._avg.rating || 0;
  }

  private async updateProductRating(productId: string) {
    const averageRating = await this.calculateAverageRating(productId);

    await this.prisma.product.update({
      where: { id: productId },
      data: { rating: averageRating },
    });
  }
}
