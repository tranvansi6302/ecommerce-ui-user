import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ArrowDownward'
import { Link } from 'react-router-dom'
import { formatDate, formatToVND } from '~/utils/helpers'
import { MdSecurity } from 'react-icons/md'
import { Order } from '~/@types/orders.type'
import { Fragment } from 'react/jsx-runtime'

type MyOrderItemProps = {
    orders: Order[]
}

export default function MyOrderItem({ orders }: MyOrderItemProps) {
    return (
        <Fragment>
            {orders &&
                orders.length > 0 &&
                orders.map((order) => {
                    const totalMoney = order.order_details.reduce((acc, cur) => acc + cur.price, 0)
                    return (
                        <Accordion
                            key={order.id}
                            style={{
                                borderRadius: '0',
                                boxShadow: '1px 0 1px 0 rgba(0,0,0,0.1)',
                                padding: '10px 0',
                                marginBottom: '10px'
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-[14px] flex justify-between w-full'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex items-center'>
                                                <div className='w-[120px]'>Mã Đơn Hàng:</div>
                                                <Link className='text-blue-600' to={''}>
                                                    {order.order_code}
                                                </Link>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='w-[120px] capitalize'>Tổng tiền:</div>
                                                <p>{formatToVND(totalMoney)}</p>
                                            </div>
                                        </div>
                                        <div className='mr-8 flex items-center'>
                                            <p className='capitalize'>Ngày đặt: {formatDate(order.order_date)}</p>
                                            <div className='h-full w-[1px] bg-gray-400 mx-3'></div>
                                            <p className='uppercase text-red-600'>Đã Hủy</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className=''>
                                    {order.order_details.map((orderDetail) => (
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

                                    <div className='mt-6 flex justify-end gap-3 items-center py-6 px-6 border-t-[1px] bg-blue-50'>
                                        <div className='text-text-primary text-[14px] capitalize flex items-center gap-1'>
                                            <MdSecurity className='text-[18px] text-blue-600 mb-1' />
                                            Thành tiền:
                                        </div>
                                        <div className='text-blue-600 text-2xl'>{formatToVND(totalMoney)}</div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
        </Fragment>
    )
}
