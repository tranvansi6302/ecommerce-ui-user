import { CreateAddressRequest } from '~/@types/addresses.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const addressesService = {
    createAddress: (body: CreateAddressRequest) => http.post(API_URL.CREATE_ADDRESS, body)
}

export default addressesService
