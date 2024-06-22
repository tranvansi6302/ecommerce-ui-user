export type ErrorMessage = {
    code: number
    message: string
}

export type ApiResponse<T> = {
    code: number
    message?: string
    result?: T
}
