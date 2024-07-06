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

export type ListOrderResponse = PaginatedApiResponse<Order[]>
export type OrderResponse = ApiResponse<Order>
