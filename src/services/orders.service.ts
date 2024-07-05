import { ListOrderResponse, OrderFilters, OrderResponse } from '~/@types/orders.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const ordersService = {
    getAllOrders: (params: OrderFilters) =>
        http.get<ListOrderResponse>(API_URL.ORDER, {
            params
        }),
    updateOrder: (body: { id: string; status: string; cancel_reason: string }) => http.patch(`${API_URL.ORDER}/${body.id}`, body),
    getOrderById: (id: string) => http.get<OrderResponse>(`${API_URL.ORDER}/${id}`)
}

export default ordersService
