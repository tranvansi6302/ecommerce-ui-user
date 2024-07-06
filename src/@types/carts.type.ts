import { Address } from './addresses.type'
import { ApiResponse, PaginatedApiResponse } from './common.type'
import { ProductImage } from './productImage.type'
import { User } from './users.type'
import { Variant } from './variants.type'

export type Cart = {
    id: number
    quantity: number
    variant: Variant & {
        product_images: ProductImage[]
    }
}

type CartCreatedUpdated = {
    id: number
    user: User
    addresses: Address[]
    cart_detail: Cart
}

export type ExtendedCartType = Cart & {
    disabled: boolean
    checked: boolean
}

export type ListCartProductResponse = PaginatedApiResponse<Cart[]>
export type CartCreatedUpdatedResponse = ApiResponse<CartCreatedUpdated>
