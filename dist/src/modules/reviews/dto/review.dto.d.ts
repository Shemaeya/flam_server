export declare class CreateReviewDto {
    orderId: string;
    productId: string;
    rating: number;
    comment?: string;
}
export declare class UpdateReviewDto {
    rating?: number;
    comment?: string;
}
export declare class ReviewQueryDto {
    productId?: string;
    rating?: number;
    page?: number;
    limit?: number;
}
