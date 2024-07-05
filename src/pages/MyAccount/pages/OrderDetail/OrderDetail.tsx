import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { FiGift } from 'react-icons/fi'
import { GiAlliedStar, GiConfirmed } from 'react-icons/gi'
import { IoChevronBack } from 'react-icons/io5'
import { MdOutlineLocalShipping, MdOutlinePendingActions } from 'react-icons/md'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Order } from '~/@types/orders.type'
import ordersService from '~/services/orders.service'
import { formatToVND } from '~/utils/helpers'
export default function OrderDetail() {
    const navigate = useNavigate()
    const { id: orderId } = useParams<{ id: string }>()
    const { data } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => ordersService.getOrderById(orderId as string),
        enabled: !!orderId
    })

    const order = data?.data.result as Order
    const totalMoney = useMemo(() => {
        return order?.order_details.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    }, [order])

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className='rounded-sm  pb-10  min-h-[100vh] md:pb-20'>
            <div className='border-b border-b-gray-200 py-6 flex items-center justify-between px-2 md:px-7 bg-white'>
                <button onClick={handleBack} className='flex items-center gap-1 uppercase text-gray-500'>
                    <IoChevronBack />
                    Trở lại
                </button>
                <div className='flex items-center text-[14px]'>
                    <div className='uppercase text-text-primary'>Mã đơn hàng: YIDYI27272</div>
                    <div className='w-[1px] h-[15px] bg-gray-400 mx-4'></div>
                    <div className='uppercase text-blue-600'>Đơn hàng đã hoàn thành</div>
                </div>
            </div>
            <div className='pt-12 pb-24 bg-white'>
                <div className='flex items-center justify-center md:px-7'>
                    <div className='text-[14px] w-20 h-20 text-center'>
                        <div className='mb-2 w-full h-full rounded-full  border-green-400 border-[4px] flex items-center justify-center text-green-400'>
                            <MdOutlinePendingActions fontSize='30px' />
                        </div>
                        <p>Chờ xác nhận</p>
                    </div>
                    <div className='w-24 h-[4px] bg-green-400'></div>
                    <div className='text-[14px] w-20 h-20 text-center'>
                        <div className='mb-2 w-full h-full rounded-full  border-green-400 border-[4px] flex items-center justify-center text-green-400'>
                            <GiConfirmed fontSize='30px' />
                        </div>
                        <p>Đã xác nhận</p>
                    </div>
                    <div className='w-24 h-[4px] bg-green-400'></div>

                    <div className='text-[14px] w-20 h-20 text-center'>
                        <div className='mb-2 w-full h-full rounded-full  border-green-400 border-[4px] flex items-center justify-center text-green-400'>
                            <MdOutlineLocalShipping fontSize='30px' />
                        </div>
                        <p>Đang giao hàng</p>
                    </div>
                    <div className='w-24 h-[4px] bg-green-400'></div>

                    <div className='text-[14px] w-20 h-20 text-center'>
                        <div className='mb-2 w-full h-full rounded-full  border-green-400 border-[4px] flex items-center justify-center text-green-400'>
                            <FiGift fontSize='30px' />
                        </div>
                        <p>Đã nhận hàng</p>
                    </div>
                    <div className='w-24 h-[4px] bg-green-400'></div>

                    <div className='text-[14px] w-20 h-20 text-center'>
                        <div className='mb-2 w-full h-full rounded-full  border-green-400 border-[4px] flex items-center justify-center text-green-400'>
                            <GiAlliedStar fontSize='30px' />
                        </div>
                        <p>Đánh giá</p>
                    </div>
                </div>
            </div>
            <div className='line-order'></div>
            <div className='px-7 pt-8 flex gap-14  bg-white py-6'>
                <div className='w-1/2'>
                    <h2 className='capitalize text-lg'>Địa chỉ nhận hàng</h2>
                    <div className='mt-4'>
                        <h5 className='text-text-primary'>Trần Văn Sĩ</h5>
                        <p className='mt-2 text-[12px]'>(+84) 877751514</p>
                        <p className='mt-2 text-[12px] text-gray-500 leading-5'>
                            Ngay Chung Cư - Nhà Trọ Bình Điền Lam, Đoàn Nguyễn Tuấn, Ấp 2, Xã Hưng Long, Huyện Bình Chánh, TP. Hồ
                            Chí Minh
                        </p>
                    </div>
                </div>
                <div className='w-[0.5px] h-[150px] bg-gray-200'></div>
                <div className='w-1/2'>
                    <h2 className='capitalize text-lg'>Thông tin đơn hàng</h2>
                    <div className='mt-4'>
                        <h5 className='text-text-primary'>Ngày đặt hàng: 20/11/2022</h5>
                        <p className='mt-2 text-[12px] leading-5'>
                            Ghi chú: Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda explicabo qui sequi fugiat
                        </p>
                    </div>
                </div>
            </div>

            <div className='p-7 bg-white mt-4'>
                <div className='border-t-[1px]'>
                    {order &&
                        order.order_details.map((orderDetail) => (
                            <div key={orderDetail.variant.id} className='border-t-[1px]'>
                                <div className='my-6 flex justify-between'>
                                    <div className='w-[70%] flex gap-1'>
                                        <div className='w-20 h-20 flex-shrink-0'>
                                            <img
                                                className='w-full h-full object-cover'
                                                src={orderDetail?.variant?.product_images[0].url}
                                                alt='product'
                                            />
                                        </div>
                                        <div className='flex-grow px-2 pt-1 pb-2 text-left text-[14px] flex flex-col gap-1'>
                                            <Link to={`123`} className='text-left line-clamp-1'>
                                                {orderDetail.variant.product_name}
                                            </Link>
                                            <p className='text-[14px] text-gray-500'>
                                                Phân loại: {orderDetail.variant.color} - {orderDetail.variant.size}
                                            </p>
                                            <span>x{orderDetail.quantity}</span>
                                        </div>
                                    </div>
                                    <div className='w-[30%] flex items-center justify-end text-[15px] gap-2 px-6'>
                                        <span className='text-blue-600'>{formatToVND(orderDetail.price)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className=' bg-white'>
                <div className='px-7 bg-white'>
                    <div className='flex justify-end h-[48px] items-center px-6 border-t'>
                        <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                            Tổng tiền hàng
                        </h2>
                        <h2 className='text-[14px] text-text-primary text-end w-[20%]'>{formatToVND(totalMoney)}</h2>
                    </div>
                    <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                        <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                            Phí vận chuyển
                        </h2>
                        <h2 className='text-[14px] text-text-primary text-end w-[20%]'>Miễn phí</h2>
                    </div>
                    <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                        <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                            Thành tiền
                        </h2>
                        <h2 className='text-[24px] text-blue-600 text-end w-[20%]'>{formatToVND(totalMoney)}</h2>
                    </div>
                    <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                        <h2 className='text-[12px] text-gray-400 w-[25%] border-r justify-end px-4 h-full flex items-center gap-1'>
                            <RiSecurePaymentLine fontSize='20px' className='text-blue-600' />
                            Phương thức thanh toán
                        </h2>
                        <h2 className='text-[14px] text-text-primary text-end w-[20%]'>Thanh toán khi nhận hàng</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
