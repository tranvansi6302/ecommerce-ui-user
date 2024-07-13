import {
    AvailableServiceRequest,
    DistrictResponse,
    FeeRequest,
    FeeResponse,
    LeadtimeRequest,
    LeadtimeResponse,
    ListAvailableServiceResponse,
    ProvinceResponse,
    WardResponse
} from '~/@types/ghn.type'
import { API_URL } from '~/configs/api.config'
import httpGhn from '~/utils/httpghn'

const ghnService = {
    getProvince: () => httpGhn.get<ProvinceResponse>(API_URL.GHN_GET_PROVINCE),
    getDistrict: (body: { province_id: number }) => httpGhn.get<DistrictResponse>(API_URL.GHN_GET_DISTRICT, { params: body }),
    getWard: (body: { district_id: number }) => httpGhn.get<WardResponse>(API_URL.GHN_GET_WARD, { params: body }),
    getAvailableServices: (body: AvailableServiceRequest) =>
        httpGhn.post<ListAvailableServiceResponse>(API_URL.GHN_GET_AVAILABLE_SERVICES, body),
    getLeadtime: (body: LeadtimeRequest) => httpGhn.post<LeadtimeResponse>(API_URL.GHN_GET_LEADTIME, body),
    getFee: (body: FeeRequest) => httpGhn.post<FeeResponse>(API_URL.GHN_GET_FEE, body)
}

export default ghnService
