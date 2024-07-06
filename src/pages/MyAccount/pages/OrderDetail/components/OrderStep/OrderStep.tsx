import { FiGift } from 'react-icons/fi'
import { GiAlliedStar, GiConfirmed } from 'react-icons/gi'
import { MdOutlineLocalShipping, MdOutlinePendingActions } from 'react-icons/md'
import { Fragment } from 'react/jsx-runtime'

import { Order } from '~/@types/orders.type'
import { OrderStatus } from '~/enums/OrderStatus'
import { formatDateFull } from '~/utils/helpers'

type OrderStepProps = {
    order: Order
}

export default function OrderStep({ order }: OrderStepProps) {
    const statusSteps = [
        { status: OrderStatus.PENDING, label: 'Đặt hàng', icon: MdOutlinePendingActions, date: order?.pending_date },
        { status: OrderStatus.CONFIRMED, label: 'Đã xác nhận', icon: GiConfirmed, date: order?.confirmed_date },
        { status: OrderStatus.DELIVERING, label: 'Đã giao cho DVVC', icon: MdOutlineLocalShipping, date: order?.delivering_date },
        { status: OrderStatus.DELIVERED, label: 'Đã nhận hàng', icon: FiGift, date: order?.delivered_date }
    ]

    const getStatusIndex = (status: OrderStatus) => statusSteps.findIndex((step) => step.status === status)

    const currentStatusIndex = getStatusIndex(order?.status as OrderStatus)

    return (
        <div className='pt-12 pb-24 bg-white'>
            <div className='flex items-center justify-center md:px-7'>
                {statusSteps.map((step, index) => {
                    const isActive = index <= currentStatusIndex
                    return (
                        <Fragment key={step.status}>
                            <div className='text-[14px] w-24 h-24 text-center'>
                                <div
                                    className={`mb-2 w-full h-full rounded-full border-[4px] flex items-center justify-center ${isActive ? 'border-green-400 text-green-400' : 'border-gray-400 text-gray-400'}`}
                                >
                                    <step.icon fontSize='30px' />
                                </div>
                                <p className='mt-4'>{step.label}</p>
                                {step.date && <p className='text-[12px] text-gray-400 mt-1'>{formatDateFull(step?.date)}</p>}
                            </div>
                            {index < statusSteps.length - 1 && (
                                <div className={`w-24 h-[4px] ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                            )}
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}
