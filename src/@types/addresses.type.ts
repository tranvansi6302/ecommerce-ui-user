import { ApiResponse, PaginatedApiResponse } from './common.type'

export type Address = {
    id: number
    province: string
    district: string
    ward: string
    description: string
    full_name: string
    phone_number: string
    is_default: number
    province_id: number
    district_id: number
    ward_id: string
}
export type AddressRequest = {
    full_name: string
    phone_number: string
    description: string
    province: string
    district: string
    ward: string
    province_id: number
    district_id: number
    ward_id: string
}
export type CreateAddressResponse = ApiResponse<Address>
export type ListAddressResponse = PaginatedApiResponse<Address[]>
export type AddressResponse = ApiResponse<Address>
