import classNames from 'classnames'
import { useContext } from 'react'
import { LuUser2 } from 'react-icons/lu'
import { MdEdit, MdOutlineEventNote, MdOutlineMyLocation } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, NavLink } from 'react-router-dom'
import avatarDefault from '~/assets/images/avatarDefault.png'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'

const asideBarItems = [
    {
        icon: <LuUser2 fontSize='20px' className='text-[#1849a9]' />,
        title: 'Tài khoản của tôi',
        to: pathConfig.profile
    },
    {
        icon: <RiLockPasswordLine fontSize='20px' className='text-[#1849a9]' />,
        title: 'Đổi mật khẩu',
        to: pathConfig.accountChangePassword
    },
    {
        icon: <MdOutlineMyLocation fontSize='20px' className='text-[#1849a9]' />,
        title: 'Địa chỉ',
        to: pathConfig.accountAddress
    },
    {
        icon: <MdOutlineEventNote fontSize='20px' className='text-[#1849a9]' />,
        title: 'Đơn mua',
        to: pathConfig.accountOrders
    }
]

export default function Asidebar() {
    const { profile } = useContext(AppContext)

    return (
        <div>
            <div className='flex items-center py-4'>
                <Link
                    to={pathConfig.profile}
                    className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
                >
                    <img
                        src={!profile?.avatar || profile.avatar === '' ? avatarDefault : profile.avatar}
                        alt='avatar'
                        className='h-full w-full object-cover'
                    />
                </Link>
                <div className='flex-grow pl-4'>
                    <div className='mb-1 truncate font-semibold text-text-primary'>{profile?.full_name}</div>
                    <Link to={pathConfig.profile} className='flex items-center gap-1 capitalize text-[14px] text-gray-500'>
                        <MdEdit />
                        Sửa hồ sơ
                    </Link>
                </div>
            </div>
            <div className='mt-7'>
                {asideBarItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        className={({ isActive }) =>
                            classNames('flex items-center capitalize text-[14px] mt-4  transition-colors', {
                                'text-blue-600': isActive,
                                'text-text-primary': !isActive
                            })
                        }
                    >
                        <div className='mr-3 h-[22px] w-[22px]'>{item.icon}</div>
                        {item.title}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
