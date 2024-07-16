import { ApiResponse, PaginatedApiResponse } from './common.type'
import { ProductImage } from './productImage.type'
import { User } from './users.type'
import { Variant } from './variants.type'

export type Review = {
    id: number
    rating: number
    comment: string
    order_id: string
    user: User
    created_at: string
    updated_at: string
    variant: Variant & {
        product_images: ProductImage[]
    }
    review_images: [
        {
            url: string
        }
    ]
}

export type ReviewFilters = {
    page?: number
    limit?: number
    rating?: number
}

export type ReviewResponse = ApiResponse<Review>
export type ListReviewResponse = PaginatedApiResponse<Review[]>
