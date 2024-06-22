import { RegisterResponse } from '~/@types/auth.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const authService = {
    register: (body: { full_name: string; email: string; password: string }) =>
        http.post<RegisterResponse>(API_URL.REGISTER, body)
}

export default authService
