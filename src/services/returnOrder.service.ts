import { ReturnOrderFilter, ReturnOrderResponse } from '~/@types/returnOrder.type'
import { ReturnOrderListResponse } from '~/@types/returnOrder.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

// {
//     "order_detail_id":46,
//     "old_variant_id":21,
//     "variant_id":91,
//     "return_reason":"Không vừa 2",
//     "price":200,
//     "old_price": 100
//   }

export interface ReturnOrderBody {
    order_detail_id: number
    old_variant_id: number
    variant_id: number
    return_reason: string
    price: number
    old_price: number
}

const returnOrderService = {
    createReturnOrder: (body: ReturnOrderBody) => http.post(API_URL.RETURN_ORDER, body),
    getList: (params: ReturnOrderFilter) => {
        return http.get<ReturnOrderListResponse>('/return-orders', { params })
    },
    getDetail: (id: number) => {
        return http.get<ReturnOrderResponse>(`/return-orders/${id}`)
    }
}

export default returnOrderService
