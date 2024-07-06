import { DistrictResponse, ProvinceResponse, WardResponse } from '~/@types/ghn.type'
import { API_URL } from '~/configs/api.config'
import httpGhn from '~/utils/httpghn'

const ghnService = {
    getProvince: () => httpGhn.get<ProvinceResponse>(API_URL.GET_PROVINCE),
    getDistrict: (body: { province_id: number }) => httpGhn.get<DistrictResponse>(API_URL.GET_DISTRICT, { params: body }),
    getWard: (body: { district_id: number }) => httpGhn.get<WardResponse>(API_URL.GET_WARD, { params: body })
}

export default ghnService
