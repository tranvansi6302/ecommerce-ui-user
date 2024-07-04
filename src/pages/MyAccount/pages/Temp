import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'
import { District, Province, Ward } from '~/@types/ghn.type'
import AutocompleteAddress from '~/components/AutocompleteAddress'
import MyButton from '~/components/MyButton'
import { addressSchema, AddressSchemaType } from '~/schemas/address.schema'
import ghnService from '~/services/ghn.service'

export default function Address() {
    const [chooseProvince, setChooseProvince] = useState<Province | null>(null)
    const [chooseDistrict, setChooseDistrict] = useState<District | null>(null)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<AddressSchemaType>({
        resolver: yupResolver(addressSchema)
    })

    const { data: provinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: () => ghnService.getProvince()
    })

    const { data: districts } = useQuery({
        queryKey: ['districts'],
        queryFn: () => ghnService.getDistrict({ province_id: chooseProvince?.ProvinceID as number }),
        enabled: !!chooseProvince
    })
    const { data: wards } = useQuery({
        queryKey: ['wards'],
        queryFn: () => ghnService.getWard({ district_id: chooseDistrict?.DistrictID as number }),
        enabled: !!chooseDistrict
    })

    const onSubmit = handleSubmit((data) => {
        const result = {
            province: chooseProvince?.ProvinceName,
            district: chooseDistrict?.DistrictName,
            ward: (data.ward as Ward).WardName
        }
        console.log(result)
    })

    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6 flex items-center justify-between'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Địa chỉ của tôi</h1>
                <MyButton className='rounded-sm bg-blue-600 text-white h-[40px] px-6 flex items-center gap-1'>
                    <GoPlus fontSize='22px' />
                    Thêm địa chỉ mới
                </MyButton>
            </div>
            <form onSubmit={onSubmit} className='mt-6 '>
                <div className='flex items-center gap-3'>
                    <AutocompleteAddress
                        displayLabel='ProvinceName'
                        label='Tỉnh/Thành'
                        control={control}
                        errors={errors}
                        name='province'
                        chooseProvince={chooseProvince}
                        data={provinces?.data.data as Province[]}
                        onChange={(_, value) => {
                            setChooseProvince(value)
                            if (!value) {
                                setValue('district', null as any)
                                setValue('ward', null as any)
                            }
                        }}
                    />

                    <AutocompleteAddress
                        displayLabel='DistrictName'
                        label='Quận/Thành'
                        control={control}
                        errors={errors}
                        chooseProvince={chooseProvince}
                        name='district'
                        data={districts?.data.data as District[]}
                        onChange={(_, value) => {
                            setChooseDistrict(value)
                            if (!value) {
                                setValue('ward', null as any)
                            }
                        }}
                    />
                    <AutocompleteAddress
                        displayLabel='WardName'
                        label='Phường/Xã'
                        control={control}
                        errors={errors}
                        chooseDistrict={chooseDistrict}
                        name='ward'
                        data={wards?.data.data as Ward[]}
                    />
                </div>
                <MyButton type='submit' className='w-[160px] h-[40px] bg-blue-600 text-white rounded-sm mt-6'>
                    Lưu lại
                </MyButton>
            </form>
        </div>
    )
}
