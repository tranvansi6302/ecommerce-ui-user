import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Order } from '~/@types/orders.type'
import reviewsService from '~/services/reviews.service'

export default function useCheckReviews(orders: Order[]) {
    // Define a unique key for the query
    const queryKey = ['checkReviews']
    // Fetch function that loops through orders and fetches reviews
    const fetchReviews = async () => {
        const reviews: { [key: number]: any } = {}
        const reviewExistence: { [key: number]: boolean } = {}

        for (const order of orders) {
            for (const orderDetail of order.order_details) {
                try {
                    const response = await reviewsService.findByReviewExistByOrderId({
                        user_id: order.user.id,
                        variant_id: orderDetail.variant.id,
                        order_id: order.id
                    })

                    const exists = response?.data.result?.id !== null
                    reviewExistence[orderDetail.id] = exists
                    reviews[orderDetail.id] = response.data.result
                } catch (error) {
                    console.error(`Error fetching review for orderDetail ${orderDetail.id}`, error)
                }
            }
        }

        return { reviewExistence, reviews }
    }

    // Use `useQuery` with the updated API for React Query v5
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: fetchReviews,
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData,
        enabled: orders?.length > 0 // Only run query if orders are present
    })
    console.log('data', data?.reviews)
    // Return the data along with loading and error states
    return {
        reviewExistence: data?.reviewExistence ?? {},
        reviews: data?.reviews ?? {},
        isLoading,
        error
    }
}
