import { ListReviewResponse, ReviewResponse } from '~/@types/reviews.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const reviewsService = {
    createReview: (body: { rating: number; comment: string; product_id: number; variant_id: number }) =>
        http.post<ReviewResponse>(API_URL.REVIEWS, body),
    uploadImages: (id: number, body: FormData) => {
        return http.patch<ReviewResponse>(`${API_URL.REVIEWS}/${id}/upload-images`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getReviewsByProductId: (productId: number) => http.get<ListReviewResponse>(`${API_URL.REVIEWS}/${productId}/products`)
}

export default reviewsService
