import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { MouseEvent, useContext, useState } from 'react'
import { GrLanguage } from 'react-icons/gr'
import { LuBadgeInfo } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import { Cart } from '~/@types/carts.type'
import avatarDefault from '~/assets/images/avatarDefault.png'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import cartsService from '~/services/carts.service'
import { clearProfileFromLS, clearTokenFromLS } from '~/utils/auth'
import HeaderSearch from '../HeaderSearch'
import MiniCart from '../MiniCart'

const settings = [
    {
        id: 'account',
        label: 'Tài khoản của tôi',
        link: pathConfig.profile
    },
    {
        id: 'order',
        label: 'Đơn mua',
        link: pathConfig.accountOrders
    },
    {
        id: 'logout',
        label: 'Đăng xuất'
    }
]
export default function MainHeader() {
    const navigate = useNavigate()
    const { profile, isAuthenticated, setIsAuthenticated } = useContext(AppContext)

    const [openSetting, setOpenSetting] = useState<null | HTMLElement>(null)

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => setOpenSetting(event.currentTarget)

    const handleSetting = (setting: string) => {
        setOpenSetting(null)
        switch (setting) {
            case 'logout':
                clearProfileFromLS()
                clearTokenFromLS()
                setIsAuthenticated(false)
                navigate(pathConfig.login)
                toast.success('Đăng xuất thành công')
                break
            default:
        }
    }

    const { data: productsInCart } = useQuery({
        queryKey: ['productsInCart'],
        queryFn: () => cartsService.getAllProductFromCarts(),
        enabled: isAuthenticated
    })

    return (
        <Fragment>
            <header className='bg-white sticky top-0 z-50'>
                <div className='hidden border-b border-stroke sm:block py-2'>
                    <Container style={{ padding: '0' }}>
                        <div className='-mx-4 flex flex-wrap items-center'>
                            <div className='w-full px-4 md:w-2/3 lg:w-1/2'>
                                <ul className='-mx-3 flex items-center'>
                                    <li>
                                        <Link
                                            to={''}
                                            className='inline-block px-3 text-[13px] font-medium text-text-primary capitalize hover:text-blue-600'
                                        >
                                            Về chúng tôi
                                        </Link>
                                    </li>
                                    <li className='w-[0.5px] h-[12px] bg-gray-300'></li>
                                    <li>
                                        <Link
                                            to={''}
                                            className='inline-block px-3 text-[13px] font-medium text-text-primary capitalize hover:text-blue-600'
                                        >
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='w-full px-4 md:w-1/3 lg:w-1/2'>
                                <div className='hidden items-center gap-6 justify-end md:flex'>
                                    <div>
                                        <div className='relative text-text-primary'>
                                            <span className='capitalize text-[13px] flex items-center gap-1'>
                                                <span className='mb-[1px]'>
                                                    <GrLanguage />
                                                </span>
                                                Tiếng việt
                                            </span>
                                        </div>
                                    </div>
                                    {isAuthenticated ? (
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip title={'Cài đặt'}>
                                                <IconButton
                                                    onClick={handleOpenUserMenu}
                                                    sx={{ p: 0, display: 'flex', alignItems: 'center' }}
                                                >
                                                    <img
                                                        className='w-[15px] h-[15px] border object-cover rounded-full mb-[1px]'
                                                        src={profile?.avatar ? profile.avatar : avatarDefault}
                                                        alt=''
                                                    />
                                                    <p className='text-[13px] text-text-primary ml-1'>{profile?.full_name}</p>
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '20px' }}
                                                id='menu-appbar'
                                                anchorEl={openSetting}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                                open={Boolean(openSetting)}
                                                onClose={() => setOpenSetting(null)}
                                            >
                                                {settings.map((setting) => (
                                                    <Link key={setting.id} to={setting.link || pathConfig.home}>
                                                        <MenuItem
                                                            sx={{
                                                                '&:hover': {
                                                                    color: '#2563eb',
                                                                    backgroundColor: '#fcfbfb'
                                                                }
                                                            }}
                                                            onClick={() => handleSetting(setting.id)}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    textTransform: 'capitalize'
                                                                }}
                                                                fontSize='14px'
                                                                textAlign='center'
                                                            >
                                                                {setting.label}
                                                            </Typography>
                                                        </MenuItem>
                                                    </Link>
                                                ))}
                                            </Menu>
                                        </Box>
                                    ) : (
                                        <Link
                                            to={pathConfig.login}
                                            className='text-blue-600 text-[13px] capitalize flex items-center gap-1 hover:text-blue-500'
                                        >
                                            Chưa đăng nhập
                                            <LuBadgeInfo fontSize='15px' />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <Container style={{ padding: '0' }}>
                    <div className='w-full h-[72px]'>
                        <div className='relative -mx-4 flex items-center justify-center sm:justify-between'>
                            <div className='w-60 max-w-full px-4'>
                                <Link to={pathConfig.home} className='py-5 lg:py-3 flex items-center gap-2'>
                                    <img
                                        src='https://techmayntra.com/wp-content/uploads/2023/03/E-commerce-Img-Techmayntra.png'
                                        alt='logo'
                                        className='w-[80%] h-full object-cover'
                                    />
                                </Link>
                            </div>
                            <div className='flex w-full items-center justify-end px-4 lg:justify-between'>
                                <div className='flex w-[80%] items-center justify-between px-4'>
                                    <div className='w-full'>
                                        <HeaderSearch />
                                    </div>
                                </div>
                                <div className='hidden w-[20%] items-center gap-6 justify-end space-x-4 pr-[70px] sm:flex lg:pr-16'>
                                    <div className='relative z-1'>
                                        <MiniCart productsInCart={(productsInCart?.data.result as Cart[]) || []} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </header>
        </Fragment>
    )
}
