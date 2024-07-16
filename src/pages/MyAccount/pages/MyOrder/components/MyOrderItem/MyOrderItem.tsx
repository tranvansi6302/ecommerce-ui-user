import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaStarHalfStroke } from 'react-icons/fa6'
import { IoMdOpen } from 'react-icons/io'
import { IoCheckmarkDone } from 'react-icons/io5'
import { MdSecurity } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { Order, OrderDetail } from '~/@types/orders.type'
import { Review } from '~/@types/reviews.type'
import noOrder from '~/assets/images/noOrder.png'
import CustomDialog from '~/components/CustomDialog'
import InputMUI from '~/components/InputMUI'
import MyButton from '~/components/MyButton'
import MyButtonMUI from '~/components/MyButtonMUI'
import pathConfig from '~/configs/path.config'
import { OrderStatus } from '~/enums/OrderStatus'
import useCheckReviews from '~/hooks/useCheckReviews'
import { queryClient } from '~/main'
import { OrderSchemaType, ordersSchema } from '~/schemas/order.schema'
import cartsService from '~/services/carts.service'
import ordersService from '~/services/orders.service'
import { convertOrderStatus, formatDateFull, formatToVND } from '~/utils/helpers'
import CreateReview from '../../../OrderDetail/components/CreateReview/CreateReview'
import UpdateReview from '../../../OrderDetail/components/UpdateReview'

type MyOrderItemProps = {
    orders: Order[]
}

type CancelReasonForm = OrderSchemaType

export default function MyOrderItem({ orders }: MyOrderItemProps) {
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const [orderId, setOrderId] = useState<number>(0)
    const { reviews, reviewExistence } = useCheckReviews(orders)
    const [orderDetailCreated, setOrderDetailCreated] = useState<OrderDetail | null>(null)
    const [orderDetailUpdated, setOrderDetailUpdated] = useState<OrderDetail | null>(null)
    const [openReviewUpdated, setOpenReviewUpdated] = useState<boolean>(false)
    const [openReviewCreated, setOpenReviewCreated] = useState<boolean>(false)
    const [reviewUpdate, setReviewUpdate] = useState<Review | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CancelReasonForm>({
        resolver: yupResolver(ordersSchema)
    })
    const handleCancelOrder = (orderId: number) => {
        setOpen(true)
        setOrderId(orderId)
    }

    const updateOrderMutation = useMutation({
        mutationFn: (body: { id: string; status: string; canceled_reason: string }) => ordersService.updateOrder(body)
    })

    const onSubmit = handleSubmit((data) => {
        const body = {
            id: orderId.toString(),
            status: OrderStatus.CANCELLED as string,
            canceled_reason: data.canceled_reason as string
        }
        updateOrderMutation.mutate(body, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] })
        })
        setValue('canceled_reason', '')
        setOpen(false)
        setOrderId(0)
    })

    const onViewReviewUpdated = (orderDetail: OrderDetail) => {
        setOpenReviewUpdated(true)
        setReviewUpdate(reviews[orderDetail.id] as Review | null)
        setOrderDetailUpdated(orderDetail)
    }

    const onViewReviewCreated = (orderDetail: OrderDetail, orderId: number) => {
        setOpenReviewCreated(true)
        setOrderId(orderId)
        setOrderDetailCreated(orderDetail)
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
        <Fragment>
            <UpdateReview
                review={reviewUpdate as Review}
                orderDetail={orderDetailUpdated as OrderDetail}
                openReview={openReviewUpdated}
                setOpenReview={setOpenReviewUpdated}
            />
            <CreateReview
                orderId={orderId as number}
                orderDetail={orderDetailCreated as OrderDetail}
                openReview={openReviewCreated}
                setOpenReview={setOpenReviewCreated}
            />
            {orders && orders.length === 0 && (
                <div className='min-h-[100vh] bg-white flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center mb-20'>
                        <img className='w-[100px] h-[100px] object-cover' src={noOrder} alt='noOrder' />
                        <p className='mt-3 text-text-primary capitalize'>Chưa có đơn hàng</p>
                    </div>
                </div>
            )}
            {orders &&
                orders.length > 0 &&
                orders.map((order) => {
                    const totalProduct = order?.order_details.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                    const totalCheckout = totalProduct + order?.shipping_fee - order?.discount_order - order?.discount_shipping
                    let statusColorClass = ''

                    switch (order.status) {
                        case OrderStatus.PENDING:
                            statusColorClass = 'text-yellow-600'
                            break
                        case OrderStatus.CONFIRMED:
                            statusColorClass = 'text-blue-600'
                            break
                        case OrderStatus.DELIVERING:
                            statusColorClass = 'text-green-600'
                            break
                        case OrderStatus.DELIVERED:
                            statusColorClass = 'text-gray-600'
                            break
                        case OrderStatus.CANCELLED:
                            statusColorClass = 'text-red-600'
                            break
                        case OrderStatus.PAID:
                            statusColorClass = 'text-green-600'
                            break
                        case OrderStatus.UNPAID:
                            statusColorClass = 'text-orange-800'
                            break
                        default:
                            statusColorClass = 'text-gray-500'
                    }
                    return (
                        <Fragment key={order.id}>
                            <CustomDialog open={open} setOpen={setOpen}>
                                <div className='rounded-sm bg-white px-2 md:px-7 w-[600px]'>
                                    <div className=''>
                                        <div className='border-b border-b-gray-200 py-6 flex items-center justify-between'>
                                            <h1 className='text-lg font-medium capitalize text-gray-900'>Hủy đơn hàng</h1>
                                        </div>
                                    </div>
                                    <p className='my-5 text-[14px] capitalize text-gray-600'>
                                        Hãy cho chúng tôi biết lý do bạn muốn hủy đơn hàng này!
                                    </p>

                                    <form onSubmit={onSubmit} className='pb-6 mt-8'>
                                        <InputMUI register={register} errors={errors} name='canceled_reason' label='Lý do hủy' />
                                        <div className='flex items-center justify-end mt-6 gap-3'>
                                            <MyButton
                                                onClick={() => setOpen(false)}
                                                className='h-[40px] rounded-sm text-blue-600 px-3 border border-blue-600'
                                            >
                                                Đóng
                                            </MyButton>
                                            <MyButton
                                                isLoading={updateOrderMutation.isPending}
                                                type='submit'
                                                className='h-[40px] rounded-sm text-white bg-red-600 w-[130px] border'
                                            >
                                                Hủy đơn
                                            </MyButton>
                                        </div>
                                    </form>
                                </div>
                            </CustomDialog>
                            <div
                                key={order.id}
                                className='rounded-sm border border-gray-200 bg-white w-full'
                                style={{
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    padding: '16px',
                                    marginBottom: '8px',
                                    borderRight: '4px solid #2563eb'
                                }}
                            >
                                <div aria-controls='panel1-content' id='panel1-header'>
                                    <div className='flex flex-col w-full'>
                                        <div className='text-[14px] flex justify-between px-5 w-full h-[36px] pb-3'>
                                            <div className='flex flex-col gap-2 justify-center'>
                                                <div className='flex items-center'>
                                                    <div className='w-[120px] capitalize'>Mã đơn hàng:</div>
                                                    <Link
                                                        className='text-blue-600 flex items-center gap-1'
                                                        to={`${pathConfig.accountOrders}/${order.id}`}
                                                    >
                                                        {order.order_code}
                                                        <IoMdOpen fontSize='18px' className='mb-0.5' />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='capitalize'>Ngày đặt: {formatDateFull(order.order_date)}</p>
                                                <div className='h-[20px] w-[0.5px] bg-gray-400 mx-3'></div>
                                                <p className={`uppercase ${statusColorClass}`}>
                                                    {convertOrderStatus(order.status as OrderStatus)}
                                                </p>
                                                {order.status === OrderStatus.PENDING && (
                                                    <MyButtonMUI
                                                        onClick={() => handleCancelOrder(order.id)}
                                                        variant='text'
                                                        color='error'
                                                        sx={{ width: '100px', px: 0 }}
                                                    >
                                                        Hủy đơn
                                                    </MyButtonMUI>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className=''>
                                        {order.order_details.map((orderDetail) => {
                                            const existReview = reviewExistence[orderDetail.id]

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
                                                                    Phân loại: {orderDetail.variant.color} -{' '}
                                                                    {orderDetail.variant.size}
                                                                </p>
                                                                <span>x{orderDetail.quantity}</span>
                                                            </div>
                                                        </div>
                                                        <div className='w-[35%] flex flex-col items-end justify-end text-[15px] gap-2 px-6'>
                                                            <span className='text-blue-600'>
                                                                {formatToVND(orderDetail.price)}
                                                            </span>
                                                            <div className='flex justify-start items-start gap-2 w-full mt-4'>
                                                                {/* Repurchase */}
                                                                {order?.status === OrderStatus.DELIVERED && (
                                                                    <Fragment>
                                                                        {existReview ? (
                                                                            <button
                                                                                className='flex justify-center capitalize items-center bg-white border border-blue-600 px-4 py-2 w-[60%] text-[14px] text-blue-600 gap-1 rounded-sm hover:opacity-85 h-[32px]'
                                                                                onClick={() => onViewReviewUpdated(orderDetail)}
                                                                            >
                                                                                <IoCheckmarkDone fontSize='16px' />
                                                                                Xem đánh giá
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                onClick={() =>
                                                                                    onViewReviewCreated(orderDetail, order.id)
                                                                                }
                                                                                className='flex justify-center items-center capitalize bg-white border border-red-500 px-4 py-2 w-[60%] text-[14px] text-red-500 gap-1 rounded-sm hover:opacity-85 h-[32px]'
                                                                            >
                                                                                <FaStarHalfStroke />
                                                                                Đánh giá
                                                                            </button>
                                                                        )}
                                                                        <MyButton
                                                                            onClick={() =>
                                                                                handleRepurchase(
                                                                                    orderDetail?.variant.id,
                                                                                    orderDetail?.quantity
                                                                                )
                                                                            }
                                                                            className='py-2 w-[40%] rounded-sm px-4 bg-blue-600 text-white h-[32px] flex items-center justify-center'
                                                                        >
                                                                            Mua lại
                                                                        </MyButton>
                                                                    </Fragment>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <div className='mt-6 flex justify-end gap-3 items-center py-3 px-6 border-t-[1px] bg-blue-50'>
                                            <div className='text-text-primary text-[14px] capitalize flex items-center gap-1'>
                                                <MdSecurity className='text-[18px] text-blue-600 mb-1' />
                                                Thành tiền:
                                            </div>
                                            <div className='text-blue-600 text-2xl'>{formatToVND(totalCheckout)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                })}
        </Fragment>
    )
}
