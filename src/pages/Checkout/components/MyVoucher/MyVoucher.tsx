import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CustomDialog from '~/components/CustomDialog'
import MyButton from '~/components/MyButton'
import { formatToVND } from '~/utils/helpers'
import { fakeDataVoucher, Voucher } from './fake'

type MyVoucherProps = {
    totalCheckoutProduct: number
    openVoucher: boolean
    setOpenVoucher: React.Dispatch<React.SetStateAction<boolean>>
    selectedShippingVoucher: Voucher | null
    setSelectedShippingVoucher: React.Dispatch<React.SetStateAction<Voucher | null>>
    selectedOrderVoucher: Voucher | null
    setSelectedOrderVoucher: React.Dispatch<React.SetStateAction<Voucher | null>>
}

type ExtendedVoucher = Voucher & { isSelected: boolean }

export default function MyVoucher({
    openVoucher,
    setOpenVoucher,
    selectedOrderVoucher,
    setSelectedOrderVoucher,
    selectedShippingVoucher,
    setSelectedShippingVoucher,
    totalCheckoutProduct
}: MyVoucherProps) {
    const [extendVouchers, setExtendVouchers] = useState<ExtendedVoucher[]>([])
    const shippingVouchers = extendVouchers.filter((voucher) => voucher.voucher_type === 'SHIPPING')
    const orderVouchers = extendVouchers.filter((voucher) => voucher.voucher_type === 'ORDER')

    useEffect(() => {
        setExtendVouchers(
            fakeDataVoucher.map((voucher) => {
                return {
                    ...voucher,
                    isSelected: voucher.min_order_value <= totalCheckoutProduct
                }
            })
        )
    }, [totalCheckoutProduct])

    const handleShippingVoucherSelect = (voucher: Voucher) => {
        setSelectedShippingVoucher(voucher)
        toast.success('Áp dụng mã vận chuyển thành công!')
    }

    const handleOrderVoucherSelect = (voucher: Voucher) => {
        setSelectedOrderVoucher(voucher)
        toast.success('Áp dụng mã giảm giá thành công!')
    }

    return (
        <CustomDialog open={openVoucher} setOpen={setOpenVoucher}>
            <div className='w-[600px] bg-white py-6'>
                <div className=''>
                    <div className='flex justify-between border-b'>
                        <h2 className='text-gray-600 capitalize px-6 pb-4'>Chọn Voucher</h2>
                    </div>
                    <div className='px-4 overflow-hidden flex flex-col gap-3 mt-5'>
                        <h3 className='text-[14px] capitalize text-gray-400'>Mã miễn phí vận chuyển tối đa 1 voucher</h3>
                        {shippingVouchers.map((voucher) => (
                            <div
                                key={voucher.id}
                                className={`flex items-start border gap-1 ${!voucher.isSelected && 'bg-gray-100 opacity-65 pointer-events-none'}`}
                            >
                                <label className='w-full items-center flex justify-between cursor-pointer'>
                                    <div className='w-[90%] flex items-center gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <div className='relative w-[100px] h-[100px] bg-[#00bfa5] flex items-center justify-center'>
                                                <div className='rounded-full'>
                                                    <img
                                                        className='w-[56px] h-[56px] object-cover rounded-full'
                                                        src='https://down-vn.img.susercontent.com/file/vn-11134004-7r98o-lnsgkt98pujx04'
                                                        alt='Logo'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-[15px] flex flex-col'>
                                            <h4 className='text-gray-600'>
                                                Giảm tối đa{' '}
                                                {voucher.discount_type === 'MONEY'
                                                    ? `${formatToVND(voucher.value)}`
                                                    : `${voucher.value}%`}
                                            </h4>
                                            <p className='text-gray-600 mt-1'>
                                                Đơn tối thiểu {formatToVND(voucher.min_order_value)}
                                            </p>
                                            <p className='text-gray-400 text-[13px] font-thin mt-2'>HSD: 12/02/2022</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center py-4 pr-4'>
                                        <input
                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                                            type='radio'
                                            checked={selectedShippingVoucher?.id === voucher.id}
                                            onChange={() => handleShippingVoucherSelect(voucher)}
                                        />
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='px-4 overflow-hidden flex flex-col gap-3 mt-5'>
                        <h3 className='text-[14px] capitalize text-gray-400'>Mã giảm giá tối đa 1 voucher</h3>
                        {orderVouchers.map((voucher) => (
                            <div
                                key={voucher.id}
                                className={`flex items-start border gap-1 ${!voucher.isSelected && 'bg-gray-100 opacity-65 pointer-events-none'}`}
                            >
                                <label className='w-full items-center flex justify-between cursor-pointer'>
                                    <div className='w-[90%] flex items-center gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <div className='relative w-[100px] h-[100px] bg-[#ff6464] flex items-center justify-center'>
                                                <div className='rounded-full'>
                                                    <img
                                                        className='w-[56px] h-[56px] object-cover rounded-full'
                                                        src='https://down-vn.img.susercontent.com/file/sg-11134004-7qvcu-lewmsss6on7ada'
                                                        alt='Logo'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-[15px] flex flex-col'>
                                            <h4 className='text-gray-600'>
                                                {' '}
                                                Giảm tối đa{' '}
                                                {voucher.discount_type === 'MONEY'
                                                    ? `${formatToVND(voucher.value)}`
                                                    : `${voucher.value}%`}
                                            </h4>
                                            <p className='text-gray-600 mt-1'>
                                                Đơn tối thiểu {formatToVND(voucher.min_order_value)}
                                            </p>
                                            <p className='text-gray-400 text-[13px] font-thin mt-2'>HSD: 12/02/2022</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center py-4 pr-4'>
                                        <input
                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                                            type='radio'
                                            checked={selectedOrderVoucher?.id === voucher.id}
                                            onChange={() => handleOrderVoucherSelect(voucher)}
                                        />
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='sticky bottom-0 px-6 bg-white py-5 flex items-center justify-end gap-2'>
                    <MyButton
                        onClick={() => setOpenVoucher(false)}
                        className='w-[140px] h-[40px] bg-blue-600 text-white rounded-sm hover:opacity-90'
                    >
                        Xác nhận
                    </MyButton>
                </div>
            </div>
        </CustomDialog>
    )
}
