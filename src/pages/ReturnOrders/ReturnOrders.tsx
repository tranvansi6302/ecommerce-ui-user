import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { ReturnOrder, ReturnOrderFilter } from '~/@types/returnOrder.type'
import pathConfig from '~/configs/path.config'
import { ReturnOrderStatus } from '~/enums/OrderStatus'
import useQueryOrders from '~/hooks/useQueryOrders'
import useSetTitle from '~/hooks/useSetTitle'
import returnOrderService from '~/services/returnOrder.service'
import MyReturnOrderItem from './MyReturnOrderItem'

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

export default function ReturnOrders() {
    useSetTitle('Đơn trả hàng')
    const navigate = useNavigate()
    const location = useLocation()
    const queryConfig = useQueryOrders()
    const [value, setValue] = useState<number>(0)
    const { register, handleSubmit } = useForm<{ search: string }>()

    const orderStatusValues: ReturnOrderStatus[] = Object.values(ReturnOrderStatus).filter((status) => status)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const status = params.get('status')

        console.log(status)
        if (status) {
            const index = orderStatusValues.indexOf(status as ReturnOrderStatus) + 1
            setValue(index)
        } else {
            setValue(0)
        }
    }, [location.search, orderStatusValues])

    const { data } = useQuery({
        queryKey: ['return-orders', queryConfig],
        queryFn: () => returnOrderService.getList(queryConfig as ReturnOrderFilter),
        staleTime: 3 * 60 * 1000, // 3 minutes
        placeholderData: keepPreviousData
    })

    console.log(data?.data.result)
    const handleChange = (_: SyntheticEvent, value: number) => {
        setValue(value)
        if (value === 0) {
            navigate({
                pathname: pathConfig.accountReturnOrder,
                search: ''
            })
        } else {
            navigate({
                pathname: pathConfig.accountReturnOrder,
                search: createSearchParams({
                    status: orderStatusValues[value - 1]
                }).toString()
            })
        }
    }

    // Handle search
    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: pathConfig.accountReturnOrder,
            search: createSearchParams({ ...queryConfig, search: data.search }).toString()
        })
    })

    return (
        <div className='rounded-sm  px-2 pb-10'>
            <div className='bg-white'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        style={{ justifyContent: 'space-between', padding: '0 20px' }}
                        value={value}
                        onChange={handleChange}
                        aria-label='tabs-order'
                    >
                        <Tab
                            sx={{ textTransform: 'capitalize', fontSize: '14px', color: '#000000DE' }}
                            label='Tất cả'
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{ textTransform: 'capitalize', fontSize: '14px', color: '#000000DE' }}
                            label='Đã gửi yêu cầu'
                            {...a11yProps(1)}
                        />

                        <Tab
                            sx={{ textTransform: 'capitalize', fontSize: '14px', color: '#000000DE' }}
                            label='Đã xác nhận'
                            {...a11yProps(3)}
                        />

                        <Tab
                            sx={{ textTransform: 'capitalize', fontSize: '14px', color: '#000000DE' }}
                            label='Từ chối'
                            {...a11yProps(4)}
                        />
                    </Tabs>
                </Box>
            </div>
            <div className='min-h-[100vh] mt-3'>
                <TabStatusOrder value={value} index={0}>
                    <form onSubmit={onSubmit} className='w-full relative'>
                        <button className='absolute left-0 top-1/2 -translate-y-1/2 px-4 text-gray-400'>
                            <FiSearch fontSize='18px' />
                        </button>
                        <input
                            {...register('search')}
                            type='text'
                            placeholder='Tìm kiếm theo mã đơn hàng'
                            className='w-full h-[44px]  border border-gray-200 rounded-sm bg-[#eaeaea] outline-none pl-10 pr-4 text-[14px] text-gray-400'
                        />
                    </form>
                    <div className='py-3'>
                        <MyReturnOrderItem returnOrders={data?.data.result as unknown as ReturnOrder[]} />
                    </div>
                </TabStatusOrder>
                <TabStatusOrder value={value} index={1}>
                    <MyReturnOrderItem returnOrders={data?.data.result as unknown as ReturnOrder[]} />
                </TabStatusOrder>
                <TabStatusOrder value={value} index={2}>
                    <MyReturnOrderItem returnOrders={data?.data.result as unknown as ReturnOrder[]} />
                </TabStatusOrder>
                <TabStatusOrder value={value} index={3}>
                    <MyReturnOrderItem returnOrders={data?.data.result as unknown as ReturnOrder[]} />
                </TabStatusOrder>
            </div>
        </div>
    )
}
