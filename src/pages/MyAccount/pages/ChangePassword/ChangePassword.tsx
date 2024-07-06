import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import InputMUI from '~/components/InputMUI'
import MyButtonMUI from '~/components/MyButtonMUI'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import { UserSchemaType, userSchema } from '~/schemas/user.schema'
import usersService from '~/services/users.service'
import { clearProfileFromLS, clearTokenFromLS } from '~/utils/auth'

type ChangePasswordForm = Pick<UserSchemaType, 'current_password' | 'new_password' | 'confirm_new_password'>
const changePasswordSchema = userSchema.pick(['current_password', 'new_password', 'confirm_new_password'])
export default function ChangePassword() {
    const { setIsAuthenticated } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ChangePasswordForm>({
        resolver: yupResolver(changePasswordSchema)
    })

    // Change password
    const changePasswordMutation = useMutation({
        mutationFn: (data: Omit<ChangePasswordForm, 'confirm_new_password'>) => usersService.changePassword(data)
    })
    const onSubmit = handleSubmit((data) => {
        changePasswordMutation.mutate(data, {
            onSuccess: () => {
                setIsAuthenticated(false)
                clearTokenFromLS()
                clearProfileFromLS()
                navigate(pathConfig.login)
            }
        })
    })
    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
                <div className='mt-1 text-sm text-gray-700'>
                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                </div>
            </div>
            <form onSubmit={onSubmit} className='flex'>
                <div className='mt-6 w-full md:w-[65%] flex flex-col gap-5 md:pr-12'>
                    <div>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='current_password'>
                            Mật khẩu hiện tại
                        </label>
                        <InputMUI type='password' register={register} errors={errors} name='current_password' />
                    </div>
                    <div>
                        <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor='new_password'>
                            Mật khẩu mới
                        </label>
                        <InputMUI type='password' register={register} errors={errors} name='new_password' />
                    </div>

                    <div>
                        <label
                            className='text-text-primary text-[14px] inline-block mb-2 capitalize'
                            htmlFor='confirm_new_password'
                        >
                            Xác nhận mật khẩu mới
                        </label>
                        <InputMUI type='password' register={register} errors={errors} name='confirm_new_password' />
                    </div>

                    <MyButtonMUI
                        isLoading={changePasswordMutation.isPending}
                        type='submit'
                        sx={{ py: 1, width: '30%', borderRadius: '2px' }}
                    >
                        Xác nhận
                    </MyButtonMUI>
                </div>
            </form>
        </div>
    )
}
