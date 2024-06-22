import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '~/@types/users.type'
import loginBanner from '~/assets/images/loginBanner.jpg'
import { GoogleIcon } from '~/assets/svg'
import InputAuth from '~/components/InputAuth'
import MyButtonV2 from '~/components/MyButtonV2'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import AuthLayout from '~/layouts/AuthLayout'
import { AuthSchemaType, authSchema } from '~/schemas/auth.schema'
import authService from '~/services/auth.service'
import { loginWithGoogle } from '~/utils/auth'

type LoginFormData = Pick<AuthSchemaType, 'email' | 'password'>

export default function Login() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(authSchema.pick(['email', 'password']))
    })

    const loginMutation = useMutation({
        mutationFn: (data: LoginFormData) => authService.login(data)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setIsAuthenticated(true)
                setProfile(data.data.result?.user as User)
                navigate(pathConfig.home)
            }
        })
    })

    return (
        <AuthLayout>
            <div className='hidden lg:flex flex-col items-center justify-center flex-1 bg-white text-black'>
                <div className='max-w-md text-center'>
                    <img src={loginBanner} alt='register-banner' />
                </div>
            </div>

            <div className='w-full bg-gray-100 lg:w-1/2 flex items-center justify-center'>
                <div className='max-w-md w-full p-6'>
                    <h1 className='text-3xl font-semibold mb-6 text-black text-center'>Đăng Nhập</h1>
                    <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
                        Đăng nhập để không bỏ lỡ chương trình ưu đãi nào
                    </h1>
                    <div className='mt-4 flex flex-col lg:flex-row items-center justify-between'>
                        <div className='w-full lg:mb-0'>
                            <MyButtonV2 onClick={loginWithGoogle} variant='text' sx={{ py: 1.5 }} type='button'>
                                <GoogleIcon />
                                <p className='pl-2 mt-0.5'>Tiếp tục với google</p>
                            </MyButtonV2>
                        </div>
                    </div>
                    <div className='my-5 text-sm text-gray-600 text-center'>
                        <p>hoặc với email</p>
                    </div>
                    <form onSubmit={onSubmit} className='space-y-4'>
                        <InputAuth register={register} errors={errors} name='email' label='Email' />

                        <InputAuth register={register} errors={errors} name='password' label='Mật khẩu' />

                        <MyButtonV2 loading={loginMutation.isPending} type='submit' sx={{ py: 1.5 }}>
                            Đăng nhập
                        </MyButtonV2>
                    </form>
                    <div className='mt-4 text-sm text-gray-600 text-center'>
                        <p>
                            Bạn chưa có tài khoản?{' '}
                            <Link to={pathConfig.register} className='text-black hover:underline'>
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}
