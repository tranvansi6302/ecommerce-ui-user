import { MessageResponse } from '~/@types/common.type'
import { ListReviewResponse, ReviewFilters, ReviewResponse } from '~/@types/reviews.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const reviewsService = {
    createReview: (body: { rating: number; comment: string; product_id: number; variant_id: number; order_id: number }) =>
        http.post<ReviewResponse>(API_URL.REVIEWS, body),
    uploadImages: (id: number, body: FormData) => {
        return http.patch<ReviewResponse>(`${API_URL.REVIEWS}/${id}/upload-images`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    getReviewsByProductId: (productId: number, params: ReviewFilters) =>
        http.get<ListReviewResponse>(`${API_URL.REVIEWS}/${productId}/products`, {
            params
        }),

    findByReviewExist: (body: { user_id: number; variant_id: number; order_id: number }) =>
        http.post<ReviewResponse>(`${API_URL.REVIEWS}/variants`, body),

    findByReviewExistByOrderId: (params: { user_id: number; variant_id: number; order_id: number }) =>
        http.get<ReviewResponse>(`${API_URL.REVIEWS}/variants`, { params }),

    updateReview: (id: number, body: { rating: number; comment: string }) =>
        http.patch<ReviewResponse>(`${API_URL.REVIEWS}/${id}`, body),

    deleteReview: (id: number) => http.delete<MessageResponse>(`${API_URL.REVIEWS}/${id}`)
}

export default reviewsService
