import { PaginatedApiResponse } from './common.type'

export type Category = {
    id: number
    name: string
    slug: string
    icon: string
    summary: string
    created_at: string
    updated_at: string
}

export type ListCategoryResponse = PaginatedApiResponse<Category[]>
