import { yupResolver } from '@hookform/resolvers/yup'
import { pick } from 'lodash'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import InputAuth from '~/components/InputAuth'
import MyButtonV2 from '~/components/MyButtonV2'
import { UserSchemaType, userSchema } from '~/schemas/user.schema'

const profileSchema = userSchema.pick(['full_name', 'phone_number'])
type UpdateProfileForm = Pick<UserSchemaType, 'full_name' | 'phone_number'>
export default function Profile() {
    const [startdate, setStartDate] = useState<Date | undefined>(new Date())
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UpdateProfileForm>({
        resolver: yupResolver(profileSchema)
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
                <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <form onSubmit={onSubmit} className='flex'>
                <div className='mt-6 md:w-[60%] flex flex-col gap-5'>
                    <div>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='full_name'>
                            Họ tên
                        </label>
                        <InputAuth register={register} errors={errors} name='full_name' />
                    </div>
                    <div>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='phone_number'>
                            Số điện thoại
                        </label>
                        <InputAuth register={register} errors={errors} name='phone_number' />
                    </div>
                    <div className=''>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='phone_number'>
                            Ngày sinh
                        </label>
                        <br />
                        <DatePicker
                            dateFormat='dd/MM/yyyy'
                            selected={startdate}
                            onChange={(date) => setStartDate(date as Date)}
                        />
                    </div>

                    <MyButtonV2 type='submit' sx={{ py: 1, width: '40%' }}>
                        Xác nhận
                    </MyButtonV2>
                </div>
                <div className='mt-6 md:w-[40%]'>
                    <h2>Avatar</h2>
                </div>
            </form>
        </div>
    )
}
