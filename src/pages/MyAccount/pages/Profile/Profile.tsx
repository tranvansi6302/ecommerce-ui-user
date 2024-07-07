import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { User } from '~/@types/users.type'
import avatarDefault from '~/assets/images/avatarDefault.png'
import InputMUI from '~/components/InputMUI'
import MyButtonMUI from '~/components/MyButtonMUI'
import UploadAvatar from '~/components/UploadAvatar'
import { AppContext } from '~/contexts/app.context'
import useSetTitle from '~/hooks/useSetTitle'
import { UserSchemaType, userSchema } from '~/schemas/user.schema'
import usersService, { UpdateProfileRequest } from '~/services/users.service'
import { saveProfileToLS } from '~/utils/auth'

const profileSchema = userSchema.pick(['full_name', 'phone_number'])
type UpdateProfileForm = Pick<UserSchemaType, 'full_name' | 'phone_number'>
export default function Profile() {
    useSetTitle('Hồ sơ của tôi')
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(new Date())
    const { profile: profileLS, setProfile } = useContext(AppContext)
    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => usersService.getProfile()
    })
    const profile = data?.data.result
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<UpdateProfileForm>({
        resolver: yupResolver(profileSchema)
    })

    useEffect(() => {
        setValue('full_name', profile?.full_name as string)
        setValue('phone_number', (profile?.phone_number as string) ?? '')
        // setValue('email', profile?.email as string)
        const getDateOfBirth = profile?.date_of_birth ? new Date(profile?.date_of_birth) : new Date()
        setDateOfBirth(getDateOfBirth)
    }, [profile?.date_of_birth, profile?.email, profile?.full_name, profile?.phone_number, setValue])

    // Update profile
    const updateProfileMutation = useMutation({
        mutationFn: (data: UpdateProfileRequest) => usersService.updateProfile(data)
    })
    const onSubmit = handleSubmit((data) => {
        const finalData = {
            ...data,
            date_of_birth: new Date(dateOfBirth as Date).toISOString()
        }
        updateProfileMutation.mutate(finalData, {
            onSuccess: (data) => {
                const saveUser = {
                    ...profileLS,
                    full_name: data?.data.result?.full_name || '',
                    date_of_birth: data?.data.result?.date_of_birth || '',

                    updated_at: data?.data.result?.updated_at || ''
                }
                setProfile(saveUser as User)
                saveProfileToLS(saveUser as User)
            }
        })
    })

    // Handle upload avatar profile
    const uploadProfileAvatarMutation = useMutation({
        mutationFn: (body: FormData) => usersService.uploadProfileAvatar(body)
    })
    const handleChangeFile = (file?: File) => {
        const formData = new FormData()
        formData.append('file', file as File)
        uploadProfileAvatarMutation.mutate(formData, {
            onSuccess: (data) => {
                const saveUser = {
                    ...profileLS,
                    avatar: data?.data.result?.avatar || '',
                    updated_at: data?.data.result?.updated_at || ''
                }
                setProfile(saveUser as User)
                saveProfileToLS(saveUser as User)
            }
        })
    }

    return (
        <div className='rounded-sm bg-white px-2 pb-10 md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
                <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <form onSubmit={onSubmit} className='flex'>
                <div className='mt-6 md:w-[65%] flex flex-col gap-5 md:pr-12'>
                    <div>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='full_name'>
                            Họ tên
                        </label>
                        <InputMUI register={register} errors={errors} name='full_name' />
                    </div>
                    <div>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='phone_number'>
                            Email
                        </label>
                        <InputMUI disable defaultValue={profileLS?.email} register={register} errors={errors} name='email' />
                    </div>
                    <div>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='phone_number'>
                            Số điện thoại
                        </label>
                        <InputMUI register={register} errors={errors} name='phone_number' />
                    </div>
                    <div className=''>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='date_of_birth'>
                            Ngày sinh
                        </label>
                        <br />
                        <DatePicker
                            id='date_of_birth'
                            dateFormat='dd/MM/yyyy'
                            selected={dateOfBirth}
                            onChange={(date) => setDateOfBirth(date as Date)}
                        />
                    </div>

                    <MyButtonMUI
                        isLoading={updateProfileMutation.isPending}
                        type='submit'
                        sx={{ py: 1, width: '30%', borderRadius: '2px' }}
                    >
                        Xác nhận
                    </MyButtonMUI>
                </div>

                <div className='mt-6 md:w-[35%] flex flex-col items-center md:border-l-[1px] border-gray-100'>
                    <div className='my-5 h-24 w-24'>
                        {profile?.avatar ? (
                            <img src={profileLS?.avatar || ''} alt='avatar' className='h-full w-full rounded-full object-cover' />
                        ) : (
                            <div className='flex items-center justify-center h-24 w-24'>
                                <img src={avatarDefault} alt='avatar' />
                            </div>
                        )}
                    </div>
                    <UploadAvatar isPending={uploadProfileAvatarMutation.isPending} onChange={handleChangeFile} />
                    <div className='mt-3 text-gray-400 text-[13.8px]'>
                        <div>Dụng lượng file tối đa 5 MB</div>
                        <div>Định dạng:.JPEG, .PNG</div>
                    </div>
                </div>
            </form>
        </div>
    )
}
