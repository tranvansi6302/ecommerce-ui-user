import { PricePlan } from './pricePlans.type'
import { Warehouse } from './warehouses.type'

export type Variant = {
    id: number
    sku: string
    color: string
    size: string
    warehouse: Warehouse
    variant_name: string
    product_name: string
    product_id: number
    current_price_plan: PricePlan
    return_order: 'REQUESTED' | 'ACCEPTED' | 'REJECTED'
}
