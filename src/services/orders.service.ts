import { ListOrderResponse, OrderFilters } from '~/@types/orders.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const ordersService = {
    getAllOrders: (params: OrderFilters) =>
        http.get<ListOrderResponse>(API_URL.ORDER, {
            params
        })
}

export default ordersService
