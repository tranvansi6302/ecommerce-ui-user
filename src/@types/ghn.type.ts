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

export type ProvinceResponse = ApiGHNResponse<Province[]>
export type DistrictResponse = ApiGHNResponse<District[]>
export type WardResponse = ApiGHNResponse<Ward[]>
