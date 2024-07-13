import { ApiGHNResponse } from './common.type'

export type Province = {
    ProvinceID: number
    ProvinceName: string
    CountryID: number
    Code: string
    NameExtension: string[]
    IsEnable: number
    RegionID: number
    RegionCPN: number
    UpdatedBy: number
    CreatedAt: string
    UpdatedAt: string
    CanUpdateCOD: boolean
    Status: number
    UpdatedIP: string
    UpdatedEmployee: number
    UpdatedSource: string
    UpdatedDate: string
}

export type District = {
    DistrictID: number
    ProvinceID: number
    DistrictName: string
    Code: string
    Type: number
    SupportType: number
    NameExtension: string[]
    IsEnable: number
    UpdatedBy: number
    CreatedAt: string
    UpdatedAt: string
    CanUpdateCOD: boolean
    Status: number
    PickType: number
    DeliverType: number
    WhiteListClient: {
        From: any
        To: any
        Return: any
    }
    WhiteListDistrict: {
        From: any[]
        To: any[]
    }
    ReasonCode: string
    ReasonMessage: string
    OnDates: any
    UpdatedDate: string
}

export type Ward = {
    WardCode: string
    DistrictID: number
    WardName: string
    NameExtension: string[]
    CanUpdateCOD: boolean
    SupportType: number
    PickType: number
    DeliverType: number
    WhiteListClient: {
        From: any
        To: any
        Return: any
    }
    WhiteListWard: {
        From: any
        To: any
    }
    Status: number
    ReasonCode: string
    ReasonMessage: string
    OnDates: any
    CreatedIP: string
    CreatedEmployee: number
    CreatedSource: string
    CreatedDate: string
    UpdatedIP: string
    UpdatedEmployee: number
    UpdatedSource: string
    UpdatedDate: string
}

export type LeadtimeRequest = {
    from_district_id: number
    from_ward_code: string
    to_district_id: number
    to_ward_code: string
    service_id: number
}

export type AvailableServiceRequest = {
    shop_id: number
    from_district: number
    to_district: number
}

export type FeeRequest = {
    service_type_id: number // Default: 2
    to_district_id: number
    to_ward_code: string
    height: number
    length: number
    weight: number
    width: number
}

export type Leadtime = {
    leadtime: number
    order_date: number
}

export type AvailableService = {
    service_id: number
    short_name: string
    service_type_id: number
    config_fee_id: string
    extra_cost_id: string
    standard_config_fee_id: string
    standard_extra_cost_id: string
}

export type Fee = {
    total: number
    service_fee: number
    insurance_fee: number
    pick_station_fee: number
    coupon_value: number
    r2s_fee: number
    return_again: number
    document_return: number
    double_check: number
    cod_fee: number
    pick_remote_areas_fee: number
    deliver_remote_areas_fee: number
    cod_failed_fee: number
}

export type ProvinceResponse = ApiGHNResponse<Province[]>
export type DistrictResponse = ApiGHNResponse<District[]>
export type WardResponse = ApiGHNResponse<Ward[]>
export type LeadtimeResponse = ApiGHNResponse<Leadtime>
export type ListAvailableServiceResponse = ApiGHNResponse<AvailableService[]>
export type FeeResponse = ApiGHNResponse<Fee>
