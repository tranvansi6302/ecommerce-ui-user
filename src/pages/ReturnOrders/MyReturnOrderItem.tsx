import { FaExchangeAlt } from 'react-icons/fa'
import { GrFormNextLink } from 'react-icons/gr'
import { IoMdOpen } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { ReturnOrder } from '~/@types/returnOrder.type'
import noOrder from '~/assets/images/noOrder.png'
import pathConfig from '~/configs/path.config'
import { convertReturnOrderStatus, formatDateFull, formatToVND, RETURN_ORDER_STATUS } from '~/utils/helpers'

type MyReturnOrderItemProps = {
    returnOrders: ReturnOrder[]
}

export default function MyReturnOrderItem({ returnOrders }: MyReturnOrderItemProps) {
    // const handleRejectReturnOrder = (id: number) => {
    //     console.log(id)
    // }

    return (
        <Fragment>
            {returnOrders && returnOrders.length === 0 && (
                <div className='min-h-[100vh] bg-white flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center mb-20'>
                        <img className='w-[100px] h-[100px] object-cover' src={noOrder} alt='noOrder' />
                        <p className='mt-3 text-text-primary capitalize'>Chưa có đơn hàng</p>
                    </div>
                </div>
            )}
            {returnOrders &&
                returnOrders.length > 0 &&
                returnOrders.map((order) => {
                    let statusColorClass = ''

                    switch (order.return_status) {
                        case RETURN_ORDER_STATUS.REQUESTED:
                            statusColorClass = 'text-yellow-600'
                            break
                        case RETURN_ORDER_STATUS.ACCEPTED:
                            statusColorClass = 'text-green-600'
                            break
                        case RETURN_ORDER_STATUS.REJECTED:
                            statusColorClass = 'text-red-600'
                            break

                        default:
                            statusColorClass = 'text-gray-500'
                    }
                    return (
                        <Fragment key={order.id}>
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
                                        <div className='text-[14px] flex justify-between  w-full h-[36px]'>
                                            <div className='flex items-center gap-2 justify-center'>
                                                <div className='flex items-center'>
                                                    <div className='w-[120px] capitalize'>Mã đơn hàng:</div>
                                                    <Link
                                                        className='text-blue-600 flex items-center'
                                                        to={`${pathConfig.accountOrders}/${order.order_id}`}
                                                    >
                                                        {order.order_code}
                                                        <IoMdOpen fontSize='18px' className='mb-0.5' />
                                                    </Link>
                                                </div>
                                                <div className='w-[1px] h-[16px] bg-gray-400 mx-3'></div>
                                                <Link
                                                    to={`${pathConfig.accountReturnOrder}/${order.id}`}
                                                    className='text-[14px] text-blue-500 flex items-center gap-1'
                                                >
                                                    Chi tiết đổi trả
                                                    <GrFormNextLink fontSize={'20px'} className='ml-1' />
                                                </Link>
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='capitalize text-gray-500'>
                                                    Ngày yêu cầu: {formatDateFull(order.created_at)}
                                                </p>

                                                <div className='h-[20px] w-[0.5px] bg-gray-400 mx-3'></div>
                                                <p className={`uppercase ${statusColorClass}`}>
                                                    {convertReturnOrderStatus(order.return_status as string)}
                                                </p>

                                                {/* {order.return_status === RETURN_ORDER_STATUS.REQUESTED && (
                                                    <MyButtonMUI
                                                        onClick={() => handleRejectReturnOrder(order.id)}
                                                        variant='text'
                                                        color='error'
                                                        sx={{ width: '100px', px: 0 }}
                                                    >
                                                        Hủy yêu cầu
                                                    </MyButtonMUI>
                                                )} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className=''>
                                        <div className='mt-6 flex justify-between'>
                                            <div className='w-full flex gap-1'>
                                                <div className='w-20 h-20 flex-shrink-0'>
                                                    <img
                                                        className='w-full h-full object-cover border border-gray-200 rounded-sm'
                                                        src={order?.product_image}
                                                        alt='product'
                                                    />
                                                </div>
                                                <div className='flex-grow px-2 pt-1 pb-2 text-left text-[14px] flex flex-col gap-1'>
                                                    <p className='text-left line-clamp-1'>{order.product_name}</p>
                                                    <div className='flex items-center gap-2 mt-1'>
                                                        <div className='text-[14px] text-gray-500  flex items-center gap-2'>
                                                            <span className='text-yellow-500'>
                                                                <span className='mr-1'>Size cũ: </span>
                                                                {order.old_variant.size} - {order.old_variant.color}
                                                            </span>
                                                            <FaExchangeAlt className='mx-2 text-blue-500 text-lg' />
                                                            <span className='text-yellow-500'>
                                                                <span className='mr-1'>Size mới: </span>
                                                                {order.variant.size} - {order.variant.color}
                                                            </span>
                                                        </div>
                                                        <div className='h-[15px] w-[1px] bg-slate-400 mx-4'></div>
                                                        <div className='text-[14px] text-gray-500 flex items-center gap-2'>
                                                            <span className='text-yellow-500'>
                                                                <span className='mr-1'>Giá cũ: </span>
                                                                {formatToVND(order.old_price)}
                                                            </span>
                                                            <FaExchangeAlt className='mx-2 text-blue-500 text-lg' />
                                                            <span className='text-yellow-500'>
                                                                <span className='mr-1'>Giá mới: </span>
                                                                {formatToVND(order.price)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
