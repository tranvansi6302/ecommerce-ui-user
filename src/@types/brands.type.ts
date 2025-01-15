import { PaginatedApiResponse } from './common.type'

export type Brand = {
    id: number
    name: string
    slug: string
    icon: string
    summary: string
    created_at: string
    updated_at: string
}

export type ListBrandResponse = PaginatedApiResponse<Brand[]>
