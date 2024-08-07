import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import registerBanner from '~/assets/images/registerBanner.jpg'
import { GoogleIcon } from '~/assets/svg'
import InputMUI from '~/components/InputMUI'
import MyButtonMUI from '~/components/MyButtonMUI'
import pathConfig from '~/configs/path.config'
import AuthLayout from '~/layouts/AuthLayout'
import { AuthSchemaType, authSchema } from '~/schemas/auth.schema'
import authService from '~/services/auth.service'
import { loginWithGoogle } from '~/utils/auth'

type RegisterFormData = AuthSchemaType
export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        resolver: yupResolver(authSchema)
    })

    const registerMutation = useMutation({
        mutationFn: (data: Omit<AuthSchemaType, 'confirm_password'>) => authService.register(data)
    })

    const onSubmit = handleSubmit((data) => {
        registerMutation.mutate(omit(data, 'confirm_password'), {
            onSuccess: () => navigate(pathConfig.login)
        })
    })

    return (
        <AuthLayout>
            <div className='hidden lg:flex flex-col items-center justify-center flex-1 bg-white text-black'>
                <div className='max-w-md text-center'>
                    <img src={registerBanner} alt='register-banner' />
                </div>
            </div>

            <div className='w-full bg-gray-100 lg:w-1/2 flex items-center justify-center'>
                <div className='max-w-md w-full p-6'>
                    <h1 className='text-3xl font-semibold mb-6 text-black text-center'>Đăng Ký</h1>
                    <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
                        Đăng ký tài khoản để sử dụng dịch vụ của chúng tôi
                    </h1>
                    <div className='mt-4 flex flex-col lg:flex-row items-center justify-between'>
                        <div className='w-full lg:mb-0'>
                            <MyButtonMUI onClick={loginWithGoogle} variant='text' sx={{ py: 1.5 }} type='button'>
                                <GoogleIcon />
                                <p className='pl-2 mt-0.5'>Tiếp tục với google</p>
                            </MyButtonMUI>
                        </div>
                    </div>
                    <div className='my-5 text-sm text-gray-600 text-center'>
                        <p>hoặc với email</p>
                    </div>
                    <form onSubmit={onSubmit} className='space-y-4'>
                        <InputMUI register={register} errors={errors} name='full_name' label='Họ Tên' />
                        <InputMUI register={register} errors={errors} name='email' label='Email' />
                        <InputMUI register={register} errors={errors} name='password' label='Mật Khẩu' type='password' />
                        <InputMUI
                            register={register}
                            errors={errors}
                            name='confirm_password'
                            label='Xác Nhận Mật Khẩu'
                            type='password'
                        />

                        <MyButtonMUI isLoading={registerMutation.isPending} type='submit' sx={{ py: 1.5 }}>
                            Đăng ký
                        </MyButtonMUI>
                    </form>
                    <div className='mt-4 text-sm text-gray-600 text-center'>
                        <p>
                            Bạn đã có tài khoản?{' '}
                            <Link to={pathConfig.login} className='text-black hover:underline'>
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}
