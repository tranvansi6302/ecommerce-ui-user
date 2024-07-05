import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useQuery } from '@tanstack/react-query'
import { SyntheticEvent, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { Order, OrderFilters } from '~/@types/orders.type'
import pathConfig from '~/configs/path.config'
import useQueryOrders from '~/hooks/useQueryOrders'
import ordersService from '~/services/orders.service'
import MyOrderItem from './components/MyOrderItem'
import { OrderStatus } from '~/enums/OrderStatus'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

const TabStatusOrder = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props
    return (
        <div role='taborder' hidden={value !== index} id={`x-taborder-${index}`} aria-labelledby={`x-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

const a11yProps = (index: number) => {
    return {
        id: `x-tab-${index}`,
        'aria-controls': `x-taborder-${index}`
    }
}

export default function MyOrder() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryConfig = useQueryOrders()
    const [value, setValue] = useState<number>(0)

    const orderStatusValues: OrderStatus[] = Object.values(OrderStatus)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const status = params.get('status')
        if (status) {
            const index = orderStatusValues.indexOf(status as OrderStatus) + 1
            setValue(index)
        } else {
            setValue(0)
        }
    }, [location.search, orderStatusValues])

    const { data } = useQuery({
        queryKey: ['orders', queryConfig],
        queryFn: () => ordersService.getAllOrders(queryConfig as OrderFilters)
    })

    const handleChange = (_: SyntheticEvent, value: number) => {
        setValue(value)
        if (value === 0) {
            navigate({
                pathname: pathConfig.accountOrders,
                search: ''
            })
        } else {
            navigate({
                pathname: pathConfig.accountOrders,
                search: createSearchParams({
                    ...queryConfig,
                    status: orderStatusValues[value - 1]
                }).toString()
            })
        }
    }

    return (
        <div className='rounded-sm  px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='bg-white'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        style={{ justifyContent: 'space-between' }}
                        value={value}
                        onChange={handleChange}
                        aria-label='tabs-order'
                    >
                        <Tab sx={{ textTransform: 'capitalize', fontSize: '16px' }} label='Tất cả' {...a11yProps(0)} />
                        <Tab sx={{ textTransform: 'capitalize', fontSize: '16px' }} label='Chờ xác nhận' {...a11yProps(1)} />
                        <Tab sx={{ textTransform: 'capitalize', fontSize: '16px' }} label='Đã xác nhận' {...a11yProps(2)} />
                        <Tab sx={{ textTransform: 'capitalize', fontSize: '16px' }} label='Đang giao hàng' {...a11yProps(3)} />
                        <Tab sx={{ textTransform: 'capitalize', fontSize: '16px' }} label='Hoàn thành' {...a11yProps(4)} />
                        <Tab sx={{ textTransform: 'capitalize', fontSize: '16px' }} label='Đã hủy' {...a11yProps(5)} />
                    </Tabs>
                </Box>
            </div>
            <div className='min-h-[100vh] mt-3'>
                <TabStatusOrder value={value} index={0}>
                    <div className='w-full relative'>
                        <button className='absolute left-0 top-1/2 -translate-y-1/2 px-4 text-gray-400'>
                            <FiSearch fontSize='18px' />
                        </button>
                        <input
                            type='text'
                            placeholder='Tìm kiếm theo mã đơn hàng'
                            className='w-full h-[44px]  border border-gray-200 rounded-sm bg-[#eaeaea] outline-none pl-10 pr-4 text-[14px] text-gray-400'
                        />
                    </div>
                    <div className='py-3'>
                        <MyOrderItem orders={data?.data.result as Order[]} />
                    </div>
                </TabStatusOrder>
                <TabStatusOrder value={value} index={1}>
                    <MyOrderItem orders={data?.data.result as Order[]} />
                </TabStatusOrder>
                <TabStatusOrder value={value} index={2}>
                    <MyOrderItem orders={data?.data.result as Order[]} />
                </TabStatusOrder>
                <TabStatusOrder value={value} index={3}>
                    <MyOrderItem orders={data?.data.result as Order[]} />
                </TabStatusOrder>
                <TabStatusOrder value={value} index={4}>
                    <MyOrderItem orders={data?.data.result as Order[]} />
                </TabStatusOrder>
                <TabStatusOrder value={value} index={5}>
                    <MyOrderItem orders={data?.data.result as Order[]} />
                </TabStatusOrder>
            </div>
        </div>
    )
}