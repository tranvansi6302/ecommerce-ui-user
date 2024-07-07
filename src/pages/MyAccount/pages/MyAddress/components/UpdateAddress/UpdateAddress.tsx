import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Address, AddressRequest } from '~/@types/addresses.type'
import { District, Province, Ward } from '~/@types/ghn.type'
import AutocompleteAddress from '~/components/AutocompleteAddress'
import CustomDialog from '~/components/CustomDialog'
import InputMUI from '~/components/InputMUI'
import MyButton from '~/components/MyButton'
import { AppContext } from '~/contexts/app.context'
import { queryClient } from '~/main'
import { addressSchema, AddressSchemaType } from '~/schemas/address.schema'
import addressesService from '~/services/addresses.service'
import ghnService from '~/services/ghn.service'

type UpdateAddressForm = AddressSchemaType

export default function UpdateAddress() {
    const { globalOpenUpdateAddessDialog, setGlobalOpenUpdateAddessDialog, addressIdContext, setAddressIdContext } =
        useContext(AppContext)
    const [chooseProvince, setChooseProvince] = useState<Province | null>(null)
    const [chooseDistrict, setChooseDistrict] = useState<District | null>(null)

    const {
        control,
        setValue,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UpdateAddressForm>({
        resolver: yupResolver(addressSchema)
    })

    const { data: addressData } = useQuery({
        queryKey: ['address', addressIdContext],
        queryFn: () => addressesService.getAddressById(addressIdContext as number),
        enabled: !!addressIdContext
    })
    const address = addressData?.data.result as Address

    const { data: provincesData } = useQuery({
        queryKey: ['provinces'],
        queryFn: () => ghnService.getProvince()
    })
    const provinces = provincesData?.data.data as Province[]

    const { data: districtsData, refetch: refetchDistricts } = useQuery({
        queryKey: ['districts', chooseProvince?.ProvinceID],
        queryFn: () => ghnService.getDistrict({ province_id: chooseProvince?.ProvinceID as number }),
        enabled: !!chooseProvince?.ProvinceID
    })
    const districts = districtsData?.data.data as District[]

    const { data: wardsData, refetch: refetchWards } = useQuery({
        queryKey: ['wards', chooseDistrict?.DistrictID],
        queryFn: () => ghnService.getWard({ district_id: chooseDistrict?.DistrictID as number }),
        enabled: !!chooseDistrict?.DistrictID
    })
    const wards = wardsData?.data.data as Ward[]

    useEffect(() => {
        if (address) {
            const findProvince = provinces?.find((province) => province.ProvinceID === address.province_id)
            if (findProvince) {
                setChooseProvince(findProvince)
            }
        }
    }, [address, provinces])

    useEffect(() => {
        if (address && districts) {
            const findDistrict = districts?.find((district) => district.DistrictID === address.district_id)
            if (findDistrict) {
                setChooseDistrict(findDistrict)
            }
        }
    }, [address, districts])

    useEffect(() => {
        if (address && wards) {
            setValue('ward', wards.find((ward) => ward.WardCode === address.ward_id) as Ward)
        }
    }, [address, wards, setValue])

    useEffect(() => {
        if (address) {
            setValue('full_name', address.full_name)
            setValue('phone_number', address.phone_number)
            setValue('description', address.description)
            setValue('province', chooseProvince as Province)
            setValue('district', chooseDistrict as District)
        }
    }, [address, chooseProvince, chooseDistrict, setValue])

    const updateAddressMutation = useMutation({
        mutationFn: (payload: { id: number; body: AddressRequest }) => addressesService.updateAddress(payload.id, payload.body)
    })

    const onSubmit = handleSubmit((data) => {
        const finalData = {
            ...data,
            province: chooseProvince?.ProvinceName as string,
            district: chooseDistrict?.DistrictName as string,
            ward: (data.ward as Ward).WardName as string,
            province_id: chooseProvince?.ProvinceID as number,
            district_id: chooseDistrict?.DistrictID as number,
            ward_id: (data.ward as Ward).WardCode as string
        }
        updateAddressMutation.mutate(
            { id: addressIdContext as number, body: finalData },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['addresses']
                    })
                    setGlobalOpenUpdateAddessDialog(false)
                    setAddressIdContext(0)
                }
            }
        )
    })

    return (
        <CustomDialog open={globalOpenUpdateAddessDialog} setOpen={setGlobalOpenUpdateAddessDialog}>
            <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-5 w-[800px]'>
                <div className='border-b border-b-gray-200 py-6 flex items-center justify-between'>
                    <h1 className='text-lg font-medium capitalize text-gray-900'>Cập nhật địa chỉ</h1>
                </div>
                <form className='mt-6 relative' onSubmit={onSubmit}>
                    <div className='flex gap-4'>
                        <div className='w-1/2'>
                            <div className=''>
                                <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='full_name'>
                                    Họ tên
                                </label>
                                <InputMUI register={register} errors={errors} name='full_name' />
                            </div>
                            <div className='mt-[22px]'>
                                <label
                                    className='text-text-primary text-[14px] inline-block mb-2 capitalize'
                                    htmlFor='phone_number'
                                >
                                    Số điện thoại
                                </label>
                                <InputMUI register={register} errors={errors} name='phone_number' />
                            </div>
                        </div>

                        <div className='w-1/2 flex flex-col mt-[2.5px]'>
                            <div className=''>
                                <AutocompleteAddress
                                    displayLabel='ProvinceName'
                                    label='Tỉnh/Thành'
                                    placeholder='Chọn tỉnh thành'
                                    control={control}
                                    errors={errors}
                                    name='province'
                                    chooseProvince={chooseProvince}
                                    data={provinces}
                                    onChange={(_, value) => {
                                        setChooseProvince(value)
                                        setChooseDistrict(null)
                                        setValue('district', null as any)
                                        setValue('ward', null as any)
                                        refetchDistricts()
                                    }}
                                />
                            </div>

                            <div className='mt-6'>
                                <AutocompleteAddress
                                    displayLabel='DistrictName'
                                    label='Quận/Huyện'
                                    placeholder='Chọn quận huyện'
                                    control={control}
                                    errors={errors}
                                    chooseProvince={chooseProvince}
                                    name='district'
                                    data={districts}
                                    onChange={(_, value) => {
                                        setChooseDistrict(value)
                                        setValue('ward', null as any)
                                        refetchWards()
                                    }}
                                />
                            </div>

                            <div className='mt-6'>
                                <AutocompleteAddress
                                    displayLabel='WardName'
                                    label='Phường/Xã'
                                    placeholder='Chọn phường xã'
                                    control={control}
                                    errors={errors}
                                    chooseDistrict={chooseDistrict}
                                    name='ward'
                                    data={wards}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='description'>
                            Mô tả chi tiết
                        </label>
                        <textarea
                            {...register('description')}
                            id='description'
                            rows={5}
                            className={`textarea-address w-full p-5 text-[14px] rounded-[4px] text-text-primary bg-white border border-[#aeaeae] ${errors.description?.message ? 'invalid' : ''}`}
                        />
                        {errors.description && (
                            <p className='text-[12px] ml-[14px] mt-[3px] text-[#d32f2f]'>{errors.description.message}</p>
                        )}
                    </div>
                    <div className='flex justify-end sticky bottom-0 bg-white pb-5 border-t mt-6'>
                        <MyButton type='submit' className='w-[160px] h-[40px] bg-blue-600 text-white rounded-sm mt-6'>
                            Lưu lại
                        </MyButton>
                    </div>
                </form>
            </div>
        </CustomDialog>
    )
}
