import { CreateAddressRequest, ListAddressResponse } from '~/@types/addresses.type'
import { API_URL } from '~/configs/api.config'
import http from '~/utils/http'

const addressesService = {
    getMyAddresses: () => http.get<ListAddressResponse>(API_URL.ADDRESS),
    createAddress: (body: CreateAddressRequest) => http.post(API_URL.CREATE_ADDRESS, body),
    deleteAddress: (body: { address_id: number }) => http.delete(API_URL.ADDRESS, { data: body })
}

export default addressesService
