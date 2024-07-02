import { CartCreatedUpdatedResponse, ListCartProductResponse } from '~/@types/cart.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const cartsService = {
    getAllProductFromCarts: () => http.get<ListCartProductResponse>(API_URL.CARTS),
    addProductToCart: (body: { variant_id: number; quantity: number }) =>
        http.post<CartCreatedUpdatedResponse>(API_URL.CARTS, body),
    updateProductFromCart: (body: { cartDetailId: number; quantity: number }) =>
        http.patch<CartCreatedUpdatedResponse>(`${API_URL.CARTS}/${body.cartDetailId}`, body)
}

export default cartsService
