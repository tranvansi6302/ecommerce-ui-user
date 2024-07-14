import { ApiResponse } from './common.type'

export type MomoType = {
    qr_code: string
}

export type CreatePaymentMomoResponse = ApiResponse<MomoType>
