import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import registerBanner from '~/assets/images/registerBanner.jpg'
import { GoogleIcon } from '~/assets/svg'
import InputAuth from '~/components/InputAuth'
import pathConfig from '~/configs/path.config'
import AuthLayout from '~/layouts/AuthLayout'
import { AuthSchemaType, authSchema } from '~/schemas/auth.schema'
import authService from '~/services/auth.service'

type RegisterFormData = AuthSchemaType
type RegisterRequest = Omit<AuthSchemaType, 'confirm_password'>
export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: yupResolver(authSchema)
    })

    const registerMutation = useMutation({
        mutationFn: (data: RegisterRequest) => authService.register(data)
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
                            <Button sx={{ py: 1.5 }} type='button' fullWidth>
                                <GoogleIcon />
                                <p className='pl-2 mt-0.5'>Tiếp tục với google</p>
                            </Button>
                        </div>
                    </div>
                    <div className='my-5 text-sm text-gray-600 text-center'>
                        <p>hoặc với email</p>
                    </div>
                    <form onSubmit={onSubmit} className='space-y-4'>
                        <InputAuth register={register} errors={errors} name='full_name' label='Họ Tên' />
                        <InputAuth register={register} errors={errors} name='email' label='Email' />
                        <InputAuth register={register} errors={errors} name='password' label='Mật Khẩu' type='password' />
                        <InputAuth
                            register={register}
                            errors={errors}
                            name='confirm_password'
                            label='Xác Nhận Mật Khẩu'
                            type='password'
                        />

                        <Button type='submit' fullWidth sx={{ py: 1.5 }} variant='contained'>
                            Đăng ký
                        </Button>
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
