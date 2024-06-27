import { ListCategoryResponse } from '~/@types/categories.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const brandsService = {
    getAllBrands: () => http.get<ListCategoryResponse>(API_URL.BRANDS)
}

export default brandsService
