import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import registerBanner from '~/assets/images/registerBanner.jpg'
import { GoogleIcon } from '~/assets/svg'
import pathConfig from '~/configs/path.config'
import AuthLayout from '~/layouts/AuthLayout'

export default function Register() {
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
                    <div className='mb-5 text-sm text-gray-600 text-center'>
                        <p>hoặc với email</p>
                    </div>
                    <form className='space-y-4'>
                        <TextField fullWidth id='email' label='Email' variant='outlined' />

                        <TextField fullWidth id='password' label='Mật khẩu' variant='outlined' />

                        <TextField fullWidth id='confirm_password' label='Xác nhận mật khẩu' variant='outlined' />

                        <Button fullWidth sx={{ py: 1.5 }} variant='contained'>
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
