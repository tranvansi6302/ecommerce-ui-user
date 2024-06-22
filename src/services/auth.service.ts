import { LoginResponse, RegisterResponse } from '~/@types/auth.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const authService = {
    register: (body: { full_name: string; email: string; password: string }) =>
        http.post<RegisterResponse>(API_URL.REGISTER, body),
    login: (body: { email: string; password: string }) => http.post<LoginResponse>(API_URL.LOGIN, body)
}

export default authService
