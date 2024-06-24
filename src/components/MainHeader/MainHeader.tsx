import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { MouseEvent, useContext, useState } from 'react'
import { IoChevronDownSharp } from 'react-icons/io5'
import { LuBadgeInfo } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { MyCartIcon, NeedHelpIcon } from '~/assets/svg'
import pathConfig from '~/configs/path.config'
import { LuChevronDown } from 'react-icons/lu'
import { AppContext } from '~/contexts/app.context'
import { clearProfileFromLS, clearTokenFromLS } from '~/utils/auth'
import avatarDefault from '~/assets/images/avatarDefault.png'
import { toast } from 'react-toastify'

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

    return (
        <Fragment>
            <header className='w-full bg-white'>
                <div className='hidden border-b border-stroke sm:block'>
                    <Container className='container mx-auto'>
                        <div className='-mx-4 flex flex-wrap items-center'>
                            <div className='w-full px-4 md:w-2/3 lg:w-1/2'>
                                <ul className='-mx-3 flex items-center'>
                                    <li>
                                        <Link
                                            to={''}
                                            className='inline-block px-3 py-4 text-sm font-medium text-text-primary capitalize'
                                        >
                                            Về chúng tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={''}
                                            className='inline-block px-3 py-4 text-sm font-medium text-text-primary capitalize'
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
                                            className='text-blue-600 text-[14px] capitalize flex items-center gap-1'
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
                <Container>
                    <div className='container mx-auto'>
                        <div className='relative -mx-4 flex items-center justify-center sm:justify-between'>
                            <div className='w-60 max-w-full px-4 lg:w-48'>
                                <a href='index.html' className='block w-full py-5 lg:py-3'>
                                    <img
                                        src='https://demo.tailgrids.com/templates/planet/build/src/assets/images/logo/logo-primary.svg'
                                        alt='logo'
                                        className='w-full'
                                    />
                                </a>
                            </div>
                            <div className='flex w-full items-center justify-end px-4 lg:justify-between'>
                                <div className='flex w-full items-center justify-between px-4'>
                                    <div className='w-full'>
                                        <button
                                            id='navbarToggler'
                                            className='absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden'
                                        >
                                            <span className='relative my-[6px] block h-[2px] w-[30px] bg-body-color' />
                                            <span className='relative my-[6px] block h-[2px] w-[30px] bg-body-color' />
                                            <span className='relative my-[6px] block h-[2px] w-[30px] bg-body-color' />
                                        </button>
                                        <nav className='absolute right-4 top-full w-full max-w-[250px] justify-center rounded-lg bg-white px-6 py-5 shadow lg:static lg:flex lg:w-full lg:max-w-full lg:justify-start lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none hidden'>
                                            <ul className='block items-center lg:flex'>
                                                <li>
                                                    <Link
                                                        to={pathConfig.home}
                                                        className='flex justify-between py-2 text-base font-medium text-text-primary lg:mx-5 lg:inline-flex lg:py-6 2xl:mx-[18px] capitalize'
                                                    >
                                                        Trang chủ
                                                    </Link>
                                                </li>
                                                <li className='group relative lg:py-4'>
                                                    <div className='flex cursor-pointer items-center justify-between py-2 text-base font-medium text-text-primary group lg:mx-6 lg:inline-flex lg:py-2 2xl:mx-[18px] capitalize'>
                                                        Sản phẩm
                                                        <span className='pl-[6px]'>
                                                            <IoChevronDownSharp />
                                                        </span>
                                                    </div>
                                                    <div className='relative z-50 left-0 top-full  rounded-[5px] bg-white px-2 transition-all group-hover:opacity-100 lg:invisible lg:absolute lg:top-[115%] lg:w-[500px] lg:border-[.5px] lg:border-stroke lg:px-[50px] lg:pb-7 lg:pt-9 lg:opacity-0 lg:group-hover:visible lg:group-hover:top-full xl:w-[500px] hidden lg:block'>
                                                        <span className='absolute -top-[6px] left-8 -z-10 hidden h-3 w-3 rotate-45 rounded-sm border-[.5px] border-b-0 border-r-0 border-stroke bg-white lg:block xl:left-10' />
                                                        <div className='-mx-4 flex'>
                                                            <div className='w-full px-4 lg:w-1/2'>
                                                                <div>
                                                                    <h3 className='mb-[14px] text-base font-semibold text-text-primary capitalize'>
                                                                        Loại sản phẩm
                                                                    </h3>
                                                                    <Link
                                                                        to={pathConfig.productFilters}
                                                                        className='block py-[6px] hover:text-blue-600 text-base text-body-color capitalize'
                                                                    >
                                                                        Áo thun nam
                                                                    </Link>
                                                                    <Link
                                                                        to={pathConfig.productFilters}
                                                                        className='block py-[6px] hover:text-blue-600 text-base text-body-color capitalize'
                                                                    >
                                                                        Áo khoác nữ
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className='w-full px-4 lg:w-1/2'>
                                                                <div>
                                                                    <h3 className='mb-[14px] text-base font-semibold text-text-primary capitalize'>
                                                                        Thương hiệu
                                                                    </h3>
                                                                    <Link
                                                                        to={pathConfig.productFilters}
                                                                        className='block py-[6px] hover:text-blue-600 text-base text-body-color capitalize'
                                                                    >
                                                                        Adidas
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className='hidden w-full items-center gap-6 justify-end space-x-4 pr-[70px] sm:flex lg:pr-0'>
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

                                    <div className='relative z-20'>
                                        <div className='flex max-w-[200px] justify-end'>
                                            <button className='relative flex h-[42px] w-[42px] items-center justify-center rounded-full border-[.5px] border-stroke bg-gray-2 text-text-primary'>
                                                <MyCartIcon />
                                                <span className='absolute -right-1 -top-1 h-[18px] w-[18px] rounded-full bg-primary text-[10px] font-semibold leading-[18px] text-white'>
                                                    1
                                                </span>
                                            </button>
                                        </div>
                                        <div
                                            x-show='cartOpen'
                                            className='absolute right-0 top-full mt-3 w-[330px]'
                                            style={{ display: 'none' }}
                                        >
                                            <div className='overflow-hidden rounded-lg bg-white p-8 shadow-1'>
                                                <div className='mb-5 border-b border-stroke pb-3'>
                                                    <div className='-mx-1 flex items-center justify-between pb-4'>
                                                        <div className='flex items-center px-1'>
                                                            <div className='mr-3 h-10 w-full max-w-[40px] overflow-hidden rounded'>
                                                                <img
                                                                    src='src/assets/ecom-images/checkout/checkout-02/image-02.jpg'
                                                                    alt='product image'
                                                                    className='w-full'
                                                                />
                                                            </div>
                                                            <div>
                                                                <a href='"' className='text-sm font-medium text-text-primary'>
                                                                    Circular Sienna
                                                                </a>
                                                                <p className='truncate text-xs font-medium text-body-color'>
                                                                    Awesome white shirt
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='px-1'>
                                                            <p className='text-base font-semibold text-text-primary'>$36.00</p>
                                                        </div>
                                                    </div>
                                                    <div className='-mx-1 flex items-center justify-between py-4'>
                                                        <div className='flex items-center px-1'>
                                                            <div className='mr-3 h-10 w-full max-w-[40px] overflow-hidden rounded'>
                                                                <img
                                                                    src='src/assets/ecom-images/checkout/checkout-02/image-03.jpg'
                                                                    alt='product image'
                                                                    className='w-full'
                                                                />
                                                            </div>
                                                            <div>
                                                                <a href='"' className='text-sm font-medium text-text-primary'>
                                                                    Black T-shirt
                                                                </a>
                                                                <p className='truncate text-xs font-medium text-body-color'>
                                                                    It's a nice black t-shirt
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='px-1'>
                                                            <p className='text-base font-semibold text-text-primary'>$36.00</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='-mx-1 border-b border-stroke pb-5'>
                                                    <div className='mb-3 flex items-center justify-between'>
                                                        <div className='px-1'>
                                                            <p className='text-base text-text-primary'>Subtotal</p>
                                                        </div>
                                                        <div className='px-1'>
                                                            <p className='text-base font-medium text-text-primary'>$108</p>
                                                        </div>
                                                    </div>
                                                    <div className='mb-3 flex items-center justify-between'>
                                                        <div className='px-1'>
                                                            <p className='text-base text-text-primary'>Shipping Cost (+)</p>
                                                        </div>
                                                        <div className='px-1'>
                                                            <p className='text-base font-medium text-text-primary'>$10.85</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='px-1'>
                                                            <p className='text-base text-text-primary'>Discount (-)</p>
                                                        </div>
                                                        <div className='px-1'>
                                                            <p className='text-base font-medium text-text-primary'>$9.00</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='-mx-1 flex items-center justify-between pb-6 pt-5'>
                                                    <div className='px-1'>
                                                        <p className='text-base text-text-primary'>Total Payable</p>
                                                    </div>
                                                    <div className='px-1'>
                                                        <p className='text-base font-medium text-text-primary'>$88.15</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button className='flex w-full items-center justify-center rounded-md bg-primary px-10 py-[13px] text-center text-base font-medium text-white hover:bg-blue-dark'>
                                                        Place Order
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
