import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { MouseEvent, useContext, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { LuBadgeInfo, LuChevronDown } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import { Cart } from '~/@types/cart.type'
import avatarDefault from '~/assets/images/avatarDefault.png'
import { NeedHelpIcon } from '~/assets/svg'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import cartsService from '~/services/carts.service'
import { clearProfileFromLS, clearTokenFromLS } from '~/utils/auth'
import MyButton from '../MyButton'
import MiniCart from './components/MiniCart'
import vtiLogo from '~/assets/images/vtiLogo.png'

const settings = [
    {
        id: 'account',
        label: 'Tài khoản của tôi'
    },
    {
        id: 'order',
        label: 'Đơn mua'
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
            <header className='w-full bg-white'>
                <div className='hidden border-b border-stroke sm:block'>
                    <Container style={{ padding: '0' }}>
                        <div className='-mx-4 flex flex-wrap items-center'>
                            <div className='w-full px-4 md:w-2/3 lg:w-1/2'>
                                <ul className='-mx-3 flex items-center'>
                                    <li>
                                        <Link
                                            to={''}
                                            className='inline-block px-3 py-4 text-sm font-medium text-text-primary capitalize hover:text-blue-600'
                                        >
                                            Về chúng tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={''}
                                            className='inline-block px-3 py-4 text-sm font-medium text-text-primary capitalize hover:text-blue-600'
                                        >
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='w-full px-4 md:w-1/3 lg:w-1/2'>
                                <div className='hidden items-center gap-6 justify-end md:flex'>
                                    <div>
                                        <div className='relative'>
                                            <select
                                                name='lang'
                                                className='w-full appearance-none rounded-lg bg-transparent py-3 pl-3 pr-5 text-sm font-medium text-body-color outline-none capitalize'
                                            >
                                                <option>Tiếng việt</option>
                                                <option>English</option>
                                            </select>
                                            <span className='absolute right-0 top-1/2 -translate-y-1/2 text-body-color'>
                                                <LuChevronDown />
                                            </span>
                                        </div>
                                    </div>
                                    {isAuthenticated ? (
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip title={profile?.full_name}>
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                    <Avatar
                                                        sx={{ width: '32px', height: '32px' }}
                                                        alt='avatar'
                                                        src={profile?.avatar ? profile.avatar : avatarDefault}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
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
                                                    <MenuItem key={setting.id} onClick={() => handleSetting(setting.id)}>
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
                                                ))}
                                            </Menu>
                                        </Box>
                                    ) : (
                                        <Link
                                            to={pathConfig.login}
                                            className='text-blue-600 text-[14px] capitalize flex items-center gap-1 hover:text-blue-500'
                                        >
                                            Chưa đăng nhập
                                            <LuBadgeInfo fontSize='16px' />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <Container style={{ padding: '0' }}>
                    <div className=' mx-auto'>
                        <div className='relative -mx-4 flex items-center justify-center sm:justify-between'>
                            <div className='w-60 max-w-full px-4 lg:w-48'>
                                <Link to={pathConfig.home} className='w-[60px] py-5 lg:py-3 flex items-center gap-2'>
                                    <img src={vtiLogo} alt='logo' className='w-full' />
                                </Link>
                            </div>
                            <div className='flex w-full items-center justify-end px-4 lg:justify-between'>
                                <div className='flex w-[70%] items-center justify-between px-4'>
                                    <div className='w-full'>
                                        <form className='mx-auto'>
                                            <label
                                                htmlFor='default-search'
                                                className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                                            >
                                                Search
                                            </label>
                                            <div className='relative'>
                                                <input
                                                    type='search'
                                                    id='default-search'
                                                    className='block w-full px-4  py-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none'
                                                    placeholder='Tìm kiếm sản phẩm...'
                                                />
                                                <MyButton
                                                    type='submit'
                                                    className='text-white absolute right-[3px] top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 h-[85%] rounded-md '
                                                >
                                                    <FiSearch fontSize='20px' />
                                                </MyButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='hidden w-[30%] items-center gap-6 justify-end space-x-4 pr-[70px] sm:flex lg:pr-0'>
                                    <div className='hidden items-center pr-1 xl:flex'>
                                        <div className='mr-3 flex h-[42px] w-[42px] items-center justify-center rounded-full border-[.5px] border-stroke bg-gray-2 text-text-primary'>
                                            <NeedHelpIcon />
                                        </div>
                                        <div>
                                            <p className='text-sm font-medium text-text-primary capitalize'>
                                                Cần hổ trợ?
                                                <br />
                                                +84 369060306
                                            </p>
                                        </div>
                                    </div>

                                    <div className='relative z-1'>
                                        <MiniCart productsInCart={productsInCart?.data.result as Cart[]} />
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
