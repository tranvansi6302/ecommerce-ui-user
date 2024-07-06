import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateAddressRequest } from '~/@types/addresses.type'
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

type CreateAddressForm = AddressSchemaType

export default function CreateAddress() {
    const { globalOpenAddessDialog, setGlobalOpenAddessDialog } = useContext(AppContext)
    const [chooseProvince, setChooseProvince] = useState<Province | null>(null)
    const [chooseDistrict, setChooseDistrict] = useState<District | null>(null)

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors }
    } = useForm<CreateAddressForm>({
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
    const createAddressMutation = useMutation({
        mutationFn: (body: CreateAddressRequest) => addressesService.createAddress(body)
    })
    const onSubmit = handleSubmit((data) => {
        const finalData = {
            ...data,
            province: chooseProvince?.ProvinceName as string,
            district: chooseDistrict?.DistrictName as string,
            ward: (data.ward as Ward).WardName as string
        }
        createAddressMutation.mutate(finalData, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['addresses']
                })
                setGlobalOpenAddessDialog(false)
            }
        })
    })

    return (
        <CustomDialog open={globalOpenAddessDialog} setOpen={setGlobalOpenAddessDialog}>
            <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-5 w-[800px]'>
                <div className='border-b border-b-gray-200 py-6 flex items-center justify-between'>
                    <h1 className='text-lg font-medium capitalize text-gray-900'>Thêm mới địa chỉ</h1>
                </div>
                <form onSubmit={onSubmit} className='mt-6 relative'>
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
                                    data={provinces?.data.data as Province[]}
                                    onChange={(_, value) => {
                                        setChooseProvince(value)
                                        if (!value) {
                                            setValue('district', null as any)
                                            setValue('ward', null as any)
                                        }
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
                                    data={districts?.data.data as District[]}
                                    onChange={(_, value) => {
                                        setChooseDistrict(value)
                                        if (!value) {
                                            setValue('ward', null as any)
                                        }
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
                                    data={wards?.data.data as Ward[]}
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
                            className={`textarea-address w-full p-5 text-[14px] 
                    rounded-[4px] text-text-primary bg-white border border-[#aeaeae] ${errors.description?.message ? 'invalid' : false}`}
                        />
                        {errors.description && (
                            <p className='text-[12px] ml-[14px] mt-[3px] text-[#d32f2f]'>{errors.description.message}</p>
                        )}
                    </div>
                    <div className='flex justify-end sticky bottom-0 bg-white pb-5 border-t mt-6'>
                        <MyButton
                            isLoading={createAddressMutation.isPending}
                            type='submit'
                            className='w-[160px] h-[40px] bg-blue-600 text-white rounded-sm mt-6'
                        >
                            Lưu lại
                        </MyButton>
                    </div>
                </form>
            </div>
        </CustomDialog>
    )
}
