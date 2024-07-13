import { Profile } from './users.type'
import { ProductImage } from './productImage.type'
import { PricePlan } from './pricePlans.type'
import { ApiResponse, PaginatedApiResponse } from './common.type'
import { Variant } from './variants.type'
import { OrderStatus } from '~/enums/OrderStatus'

export type Order = {
    id: number
    address: string
    note: string
    status: string
    user: Profile
    phone_number: string
    canceled_date: string
    canceled_reason: string
    confirmed_date: string
    delivered_date: string
    delivering_date: string
    pending_date: string
    order_code: string
    order_date: string
    payment_method: string
    discount_order: number
    discount_shipping: number
    paid_date: string
    shipping_fee: number
    online_payment_status: string
    order_details: OrderDetail[]
}

export type OrderDetail = {
    price: number
    quantity: number

    current_price_plans: PricePlan
    variant: Variant & {
        product_images: ProductImage[]
    }
}

export type OrderFilters = {
    status?: keyof typeof OrderStatus
    search?: string
}

export type CreateOrderRequest = {
    full_name: string | undefined
    phone_number: string | undefined
    address: string
    order_details: {
        variant_id: number
    }[]
    discount_on_order: number
    discount_shipping: number
    payment_method: string
    shipping_fee: number
    note: string
}
export type ListOrderResponse = PaginatedApiResponse<Order[]>
export type OrderResponse = ApiResponse<Order>
