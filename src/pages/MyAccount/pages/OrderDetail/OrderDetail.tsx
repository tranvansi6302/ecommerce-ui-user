import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useMemo } from 'react'
import { FaStarHalfStroke } from 'react-icons/fa6'
import { IoChevronBack } from 'react-icons/io5'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Order } from '~/@types/orders.type'
import MyButton from '~/components/MyButton'
import pathConfig from '~/configs/path.config'
import { OrderStatus } from '~/enums/OrderStatus'
import { queryClient } from '~/main'
import cartsService from '~/services/carts.service'
import ordersService from '~/services/orders.service'
import { convertOrderStatus, formatDate, formatToVND } from '~/utils/helpers'
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
    const totalMoney = useMemo(() => {
        return order?.order_details.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    }, [order])

    const handleBack = () => {
        navigate(-1)
    }

    // Handle Repurchase
    const addToCartMutation = useMutation({
        mutationFn: (body: { variant_id: number; quantity: number }) => cartsService.addProductToCart(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['productsInCart']
            })
        }
    })
    const handleRepurchase = async (variantId: number, quantity: number) => {
        const res = await addToCartMutation.mutateAsync({
            variant_id: variantId,
            quantity
        })

        navigate(pathConfig.carts, {
            state: {
                cart_detail_id: res.data.result?.cart_detail.id
            }
        })
    }

    return (
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

            {/* Order Detail Product */}
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
                                    <div className='w-[30%] flex flex-col  text-[15px] gap-2 px-6'>
                                        <span className='text-blue-600 text-end inline-block'>
                                            {formatToVND(orderDetail.price)}
                                        </span>
                                        <div className='flex justify-start items-start gap-2 w-full mt-4'>
                                            {/* Repurchase */}
                                            {order?.status === OrderStatus.DELIVERED && (
                                                <Fragment>
                                                    <button className='flex justify-center capitalize bg-white border border-blue-600 px-4 py-2 w-[50%] text-[14px] text-blue-600 gap-1 rounded-sm hover:opacity-85'>
                                                        <FaStarHalfStroke />
                                                        Đánh giá
                                                    </button>
                                                    <MyButton
                                                        onClick={() =>
                                                            handleRepurchase(orderDetail.variant.id, orderDetail.quantity)
                                                        }
                                                        className='py-2 w-[50%] rounded-sm px-4 bg-blue-600 text-white'
                                                    >
                                                        Mua lại
                                                    </MyButton>
                                                </Fragment>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Total */}
            <div className=' bg-white'>
                <div className='px-7 bg-white'>
                    <div className='flex justify-end h-[48px] items-center px-6 border-t'>
                        <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                            Tổng tiền hàng
                        </h2>
                        <h2 className='text-[14px] text-text-primary text-end w-[20%]'>{formatToVND(totalMoney)}</h2>
                    </div>
                    {order?.status !== OrderStatus.CANCELLED && (
                        <Fragment>
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
                        </Fragment>
                    )}
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
