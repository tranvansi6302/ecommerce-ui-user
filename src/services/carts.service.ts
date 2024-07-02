import { AddToCartResponse, ListCartProductResponse } from '~/@types/cart.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const cartsService = {
    getAllProductFromCarts: () => http.get<ListCartProductResponse>(API_URL.CARTS),
    addProductToCart: (body: { variant_id: number; quantity: number }) => http.post<AddToCartResponse>(API_URL.CARTS, body)
}

export default cartsService
