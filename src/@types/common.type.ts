export type ErrorMessage = {
    code: number
    message: string
}

export type ApiResponse<T> = {
    code: number
    message?: string
    result?: T
}

export type PaginatedApiResponse<T> = ApiResponse<T> & {
    pagination: Pagination
}

export type Pagination = {
    page: number
    limit: number
    total_page: number
}
