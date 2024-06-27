import { ListProductSaleResponse, ProductSaleFilters, ProductSaleResponse } from '~/@types/productSales.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const productSalesService = {
    getAllProductSales: (params: ProductSaleFilters) => http.get<ListProductSaleResponse>(API_URL.PRODUCT_SALES, { params }),
    getProductSale: (id: number) => http.get<ProductSaleResponse>(API_URL.PRODUCT_SALES + `/${id}`)
}

export default productSalesService
