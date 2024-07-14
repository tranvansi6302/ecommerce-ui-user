import { CreatePaymentMomoResponse } from '~/@types/payments.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const paymentsService = {
    createPaymentMomo: (body: { amount: number; order_id: string }) =>
        http.post<CreatePaymentMomoResponse>(API_URL.PAYMENTS_MOMO, body)
}

export default paymentsService
