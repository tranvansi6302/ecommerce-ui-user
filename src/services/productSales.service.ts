import { ListProductSaleResponse } from '~/@types/productSales.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const productSalesService = {
    getAllProductSales: () => http.get<ListProductSaleResponse>(API_URL.PRODUCT_SALES)
}

export default productSalesService
