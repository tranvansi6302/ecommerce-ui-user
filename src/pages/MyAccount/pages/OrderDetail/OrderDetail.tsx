import { Alert } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useMemo } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Order } from '~/@types/orders.type'
import MyButton from '~/components/MyButton'
import { OrderStatus } from '~/enums/OrderStatus'
import ordersService from '~/services/orders.service'
import paymentsService from '~/services/payments.service'
import { convertOrderStatus, convertPaymentMethod, formatDate, formatDateFull, formatToVND } from '~/utils/helpers'
import OrderStep from './components/OrderStep'
export default function OrderDetail() {
    const navigate = useNavigate()
    const { id: orderId } = useParams<{ id: string }>()
    const { data } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => ordersService.getOrderById(orderId as string),
        enabled: !!orderId
    })

    const order = data?.data.result as Order

    console.log('order', order)

    const handleBack = () => {
        navigate(-1)
    }

    const totalProduct = useMemo(() => {
        return order?.order_details.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    }, [order])

    const totalCheckout = useMemo(() => {
        return totalProduct + order?.shipping_fee - order?.discount_order - order?.discount_shipping
    }, [order?.discount_order, order?.discount_shipping, order?.shipping_fee, totalProduct])

    // Repayment
    const createPaymentMomoMutation = useMutation({
        mutationFn: (body: { amount: number; order_id: string }) => paymentsService.createPaymentMomo(body)
    })
    const handleRepayment = () => {
        createPaymentMomoMutation.mutate(
            {
                amount: Math.round(totalCheckout),
                order_id: order?.order_code
            },
            {
                onSuccess: (data) => {
                    window.location.href = data.data.result?.qr_code as string
                }
            }
        )
    }
    console.log(order?.delivered_date)
    return (
        <Fragment>
            <div className='rounded-sm  pb-10  min-h-[100vh] md:pb-20'>
                <div className='border-b border-b-gray-200 py-6 flex items-center justify-between px-2 md:px-7 bg-white'>
                    <button onClick={handleBack} className='flex items-center gap-1 uppercase text-gray-500'>
                        <IoChevronBack />
                        Trở lại
                    </button>
                    <div className='flex items-center text-[14px]'>
                        <div className='uppercase text-text-primary'>Mã đơn hàng: {order?.order_code}</div>
                        <div className='w-[1px] h-[15px] bg-gray-400 mx-4'></div>
                        <div className='uppercase text-blue-600'>Đơn hàng {convertOrderStatus(order?.status as OrderStatus)}</div>
                    </div>
                </div>
                {order?.online_payment_status === OrderStatus.UNPAID && (
                    <div className='p-6 bg-white'>
                        <Alert sx={{ fontSize: '14px' }} severity='warning'>
                            Vui lòng thanh toán đơn hàng trong 24h. Sau 24h chưa thanh toán đơn hàng sẽ tự động hủy!
                        </Alert>
                    </div>
                )}
                {order?.status !== OrderStatus.CANCELLED ? (
                    <OrderStep order={order} />
                ) : (
                    <div className=''>
                        <div className='py-12 bg-red-50 px-6'>
                            <p className='text-red-600 capitalize text-[20px]'>Đã hủy đơn hàng</p>
                            <p className='mt-2'>vào lúc {formatDate(order.canceled_date)}</p>
                        </div>
                        <div className='px-6 bg-white'>
                            <p className='text-[14px] text-gray-500 my-2 py-6 text-text-primary'>
                                Lý do hủy đơn hàng: {order.canceled_reason}
                            </p>
                        </div>
                    </div>
                )}

                <div className='line-order'></div>
                {/* Info order */}
                <div className='px-7 pt-12 flex gap-14  bg-white py-6'>
                    <div className='w-1/2'>
                        <h2 className='capitalize text-lg'>Địa chỉ nhận hàng</h2>
                        <div className='mt-4'>
                            <h5 className='text-text-primary'>Trần Văn Sĩ</h5>
                            <p className='mt-2 text-[12px]'>(+84) 877751514</p>
                            <p className='mt-2 text-[12px] text-gray-500 leading-5'>{order?.address}</p>
                        </div>
                    </div>
                    <div className='w-[0.5px] h-[150px] bg-gray-200'></div>
                    <div className='w-1/2'>
                        <h2 className='capitalize text-lg'>Thông tin đơn hàng</h2>
                        <div className='mt-4'>
                            <h5 className='text-gray-500'>Ngày đặt hàng: {formatDateFull(order?.order_date)}</h5>
                            {order?.status === OrderStatus.DELIVERED && (
                                <h5 className='text-blue-600 mt-3'>Ngày nhận hàng: {formatDateFull(order?.delivered_date)}</h5>
                            )}
                            <p className='mt-3 text-[12px] leading-5'>Ghi chú: {order?.note || 'Không có'}</p>
                        </div>
                    </div>
                </div>

                {/* Order Detail Product */}
                <div className='p-7 bg-white mt-4'>
                    <div className='border-t-[1px]'>
                        {order &&
                            order.order_details.map((orderDetail) => {
                                return (
                                    <div key={orderDetail.variant.id} className='border-t-[1px]'>
                                        <div className='my-6 flex justify-between'>
                                            <div className='w-[65%] flex gap-1'>
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
                                            <div className='w-[35%] flex flex-col  text-[15px] gap-2 px-6'>
                                                <span className='text-blue-600 text-end inline-block'>
                                                    {formatToVND(orderDetail.price)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>

                {/* Total */}
                <div className=' bg-white'>
                    <div className='px-7 bg-white'>
                        <div className='flex justify-end h-[48px] items-center px-6 border-t'>
                            <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                Tổng tiền hàng
                            </h2>
                            <h2 className='text-[14px] text-text-primary text-end w-[20%]'>{formatToVND(totalProduct)}</h2>
                        </div>
                        {order?.status !== OrderStatus.CANCELLED && (
                            <Fragment>
                                <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                    <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                        Phí vận chuyển
                                    </h2>
                                    <h2 className='text-[14px] text-text-primary text-end w-[20%]'>
                                        {formatToVND(order?.shipping_fee)}
                                    </h2>
                                </div>
                                <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                    <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                        Giảm giá phí vận chuyển
                                    </h2>
                                    <h2 className='text-[14px] text-text-primary text-end w-[20%]'>
                                        {formatToVND(order?.discount_shipping || 0)}
                                    </h2>
                                </div>
                                <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                    <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                        Giảm giá
                                    </h2>
                                    <h2 className='text-[14px] text-text-primary text-end w-[20%]'>
                                        {formatToVND(order?.discount_order || 0)}
                                    </h2>
                                </div>
                                <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                    <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                        Thành tiền
                                    </h2>
                                    <h2 className='text-[24px] text-blue-600 text-end w-[20%]'>{formatToVND(totalCheckout)}</h2>
                                </div>
                            </Fragment>
                        )}
                        <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                            <h2 className='text-[12px] text-gray-400 w-[25%] border-r justify-end px-4 h-full flex items-center gap-1'>
                                <RiSecurePaymentLine fontSize='20px' className='text-blue-600' />
                                Phương thức thanh toán
                            </h2>
                            <h2 className='text-[14px] text-text-primary text-end w-[20%]'>
                                {convertPaymentMethod(order?.payment_method)}
                            </h2>
                        </div>
                        {order?.online_payment_status === OrderStatus.UNPAID && (
                            <div className='flex justify-end pb-8 items-center px-6 border-t'>
                                <div className='mt-4'>
                                    <MyButton
                                        type='button'
                                        onClick={handleRepayment}
                                        className='h-[40px] px-8 border-blue-600 border text-blue-600'
                                    >
                                        Thanh toán ngay
                                    </MyButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
