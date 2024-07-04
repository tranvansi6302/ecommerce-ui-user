import { ApiResponse } from './common.type'

export type Address = {
    id: number
    province: string
    district: string
    ward: string
    description: string
    full_name: string
    phone_number: string
    is_default: number
}
export type CreateAddressRequest = {
    full_name: string
    phone_number: string
    description: string
    province: string
    district: string
    ward: string
}
export type CreateAddressResponse = ApiResponse<Address>
