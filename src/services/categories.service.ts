import { ListCategoryResponse } from '~/@types/categories.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const categoriesService = {
    getAllCategories: () => http.get<ListCategoryResponse>(API_URL.CATEGORIES)
}

export default categoriesService
