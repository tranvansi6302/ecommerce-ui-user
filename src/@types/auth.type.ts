import { ApiResponse } from './common.type'
import { User } from './users.type'

export type RegisterResponse = ApiResponse<Pick<User, 'id' | 'full_name' | 'email'>>
export type LoginResponse = ApiResponse<{ token: string; user: User }>
