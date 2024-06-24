import { PricePlan } from './pricePlans.type'

export type Variant = {
    id: number
    sku: string
    color: string
    size: string
    warehouse: {
        id: number
        available_quantity: number
        purchase_price: number
    }
    variant_name: string
    product_name: string
    product_id: number
    current_price_plan: PricePlan
}
