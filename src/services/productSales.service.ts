import { ListProductSaleResponse, ProductSaleResponse } from '~/@types/productSales.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const productSalesService = {
    getAllProductSales: () => http.get<ListProductSaleResponse>(API_URL.PRODUCT_SALES),
    getProductSale: (id: number) => http.get<ProductSaleResponse>(API_URL.PRODUCT_SALES + `/${id}`)
}

export default productSalesService
