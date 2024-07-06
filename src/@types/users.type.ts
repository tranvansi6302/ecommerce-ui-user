import { Address } from './addresses.type'
import { ApiResponse } from './common.type'
import { Role } from './role.type'

export type User = {
    id: number
    full_name: string
    avatar: string
    email: string
    date_of_birth: string
    phone_number: string
    roles: Role[]
    status: string
    created_at: string
    updated_at: string
}

export type Profile = Omit<User, 'roles'> & {
    address: Address[]
}

export type ProfileResponse = ApiResponse<Profile>
export type UpdateProfile = ApiResponse<Profile>
