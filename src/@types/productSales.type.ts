import { Brand } from './brands.type'
import { Category } from './categories.type'
import { ApiResponse, PaginatedApiResponse } from './common.type'
import { ProductImage } from './productImage.type'
import { Variant } from './variants.type'

export type ProductSale = {
    id: number
    brand: Brand
    category: Category
    description: string
    images: ProductImage[]
    variants: Variant[]
    product_id: number
    product_name: 'string'
    total_sold: number
    average_rating: number
    total_reviews: number
    min_price: number
    created_at: string
    updated_at: string
}

export type ProductSaleFilters = {
    page?: number
    limit?: number
    category?: string
    brand?: string
    sort_order?: 'asc' | 'desc'
    sort_by?: 'price' | 'sold'
}

export type ListProductSaleResponse = PaginatedApiResponse<ProductSale[]>
export type ProductSaleResponse = ApiResponse<ProductSale>
