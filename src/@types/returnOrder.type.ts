import { ApiResponse } from './common.type'
import { PaginatedApiResponse } from './common.type'
import { Variant } from './variants.type'

export type ReturnOrder = {
    id: number
    order_id: number
    product_image: string
    price: number
    order_detail: null
    old_variant_id: number
    product_name: string
    order_code: string
    rejected_reason: string
    date_requested: string
    date_accepted: string
    date_rejected: string
    created_at: string
    variant_id: number
    return_reason: string
    old_price: number
    return_status: string
    variant: Variant
    old_variant: Variant
}

export type ReturnOrderFilter = {
    page?: number
    limit?: number
    status?: string
    search?: string
}
export type ReturnOrderResponse = ApiResponse<ReturnOrder>
export type ReturnOrderListResponse = PaginatedApiResponse<ReturnOrderResponse>
