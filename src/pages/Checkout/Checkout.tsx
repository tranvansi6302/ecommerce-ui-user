import { Container } from '@mui/material'
import { FaLocationDot } from 'react-icons/fa6'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import MyButtonMUI from '~/components/MyButtonMUI'
import useSetTitle from '~/hooks/useSetTitle'
import { formatToVND } from '~/utils/helpers'
import tickIcon from '~/assets/images/tickIcon.png'
import { useState } from 'react'
import MyButton from '~/components/MyButton'

type PaymentType = {
    id: string
    title: string
}

const payment: PaymentType[] = [
    {
        id: 'cod',
        title: 'Thanh toán khi nhận hàng'
    },
    {
        id: 'online',
        title: 'Thanh toán online'
    }
]

export default function Checkout() {
    useSetTitle('Thanh toán')
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    return (
        <Container style={{ padding: '0' }}>
            <div className='min-h-[100vh] pb-20'>
                <div className='line-order mt-3'></div>
                <div className=' bg-white p-6 rounded-sm'>
                    <div className=''>
                        <div className=''>
                            <div className='text-blue-600 text-lg flex items-center gap-2'>
                                <FaLocationDot />
                                Địa chỉ nhận hàng
                            </div>
                        </div>
                        <div className='flex mt-4'>
                            <div className='w-[20%] text-text-primary font-semibold'>
                                <p>Trần Văn Sĩ</p>
                                <p className='mt-1'>0369060306</p>
                            </div>
                            <div className='w-[60%]'>
                                <p>
                                    Ngay Chung Cư - Nhà Trọ Bình Điền Lam, Đoàn Nguyễn Tuấn, Ấp 2, Xã Hưng Long, Huyện Bình Chánh,
                                    TP. Hồ Chí Minh
                                </p>
                            </div>
                            <div className='w-[20%] flex items-center justify-end gap-3'>
                                <button className='py-1 px-2 text-[14px] capitalize b text-red-600'>Mặc định</button>
                                <div className='w-[0.5px] h-[20px] bg-gray-300'></div>
                                <MyButtonMUI
                                    variant='outlined'
                                    sx={{ width: '100px', fontSize: '12px', px: 0, borderRadius: '2px' }}
                                >
                                    Thay đổi
                                </MyButtonMUI>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white'>
                    <div className='grid grid-cols-12 rounded-sm mt-3 py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                        <div className='col-span-6'>
                            <div className='flex items-center'>
                                <div className='flex-grow text-text-primary mt-[2px] w-[80%]'>Sản phẩm</div>
                                <div className='flex-grow text-text-primary mt-[2px] w-[20%] text-center'>Phân loại</div>
                            </div>
                        </div>
                        <div className='col-span-6'>
                            <div className='grid grid-cols-5 text-center'>
                                <div className='col-span-2'>Đơn giá</div>
                                <div className='col-span-1'>Số lượng</div>
                                <div className='col-span-2'>Số tiền</div>
                            </div>
                        </div>
                    </div>

                    <div className='py-4'>
                        <div className='my-3 rounded-sm bg-white px-5'>
                            <div className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'>
                                <div className='col-span-6 flex'>
                                    <div className='flex w-[80%]'>
                                        <div className='flex-grow'>
                                            <div className='flex'>
                                                <Link className='h-20 w-20 flex-shrink-0' to={`123`}>
                                                    <img
                                                        alt='product'
                                                        src='https://down-vn.img.susercontent.com/file/sg-11134201-23030-lrgd6zeag5nv09'
                                                    />
                                                </Link>
                                                <div className='flex-grow px-2 pt-1 pb-2 text-left'>
                                                    <Link to={`123`} className='text-left line-clamp-2'>
                                                        Quần jean nam vá da boy phố rách gối màu đen chất liệu bò co dãn 4 chiều
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[20%] flex items-center justify-center text-[14px] text-blue-600 py-[4px]'>
                                        <div className=''>XXL - Red</div>
                                    </div>
                                </div>
                                <div className='col-span-6'>
                                    <div className='grid grid-cols-5 items-center'>
                                        <div className='col-span-2'>
                                            <div className='flex items-center justify-center'>
                                                <span className='ml-3 text-text-primary'>{formatToVND(120000)}</span>
                                            </div>
                                        </div>
                                        <div className='col-span-1'>
                                            <span>1</span>
                                        </div>
                                        <div className='col-span-2'>
                                            <span className='text-orange'>{formatToVND(1200000)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-3 rounded-sm bg-white px-5'>
                            <div className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'>
                                <div className='col-span-6 flex'>
                                    <div className='flex w-[80%]'>
                                        <div className='flex-grow'>
                                            <div className='flex'>
                                                <Link className='h-20 w-20 flex-shrink-0' to={`123`}>
                                                    <img
                                                        alt='product'
                                                        src='https://down-vn.img.susercontent.com/file/sg-11134201-23030-lrgd6zeag5nv09'
                                                    />
                                                </Link>
                                                <div className='flex-grow px-2 pt-1 pb-2 text-left'>
                                                    <Link to={`123`} className='text-left line-clamp-2'>
                                                        Quần jean nam vá da boy phố rách gối màu đen chất liệu bò co dãn 4 chiều
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[20%] flex items-center justify-center text-[14px] text-blue-600 py-[4px]'>
                                        <div className=''>XXL - Red</div>
                                    </div>
                                </div>
                                <div className='col-span-6'>
                                    <div className='grid grid-cols-5 items-center'>
                                        <div className='col-span-2'>
                                            <div className='flex items-center justify-center'>
                                                <span className='ml-3 text-text-primary'>{formatToVND(120000)}</span>
                                            </div>
                                        </div>
                                        <div className='col-span-1'>
                                            <span>1</span>
                                        </div>
                                        <div className='col-span-2'>
                                            <span className='text-orange'>{formatToVND(1200000)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-2 bg-white'>
                    <div className='text-blue-800 text-[15px] cursor-pointer hover:text-blue-700 flex items-center justify-between p-6'>
                        <div className='flex items-center gap-3'>
                            <LiaMoneyCheckAltSolid fontSize='26px' />
                            <span className='capitalize mt-[1px] text-lg'>Shop voucher</span>
                        </div>
                        <span className='capitalize'> Chọn mã giảm giá</span>
                    </div>
                </div>

                <div className='mt-2 bg-white'>
                    <div className='p-6 flex items-center gap-4'>
                        <div className='capitalize text-lg'>Phương thức thanh toán</div>
                        <div className=''>
                            {payment.map((item) => (
                                <button
                                    onClick={() => setSelectedPayment(item.title.toLowerCase())}
                                    className={`items-center bg-blue-50 justify-center  border rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words capitalize ${selectedPayment === (item.title as string).toLowerCase() ? 'border-blue-600' : 'border-gray-300 '}`}
                                >
                                    {item.title as string}
                                    {selectedPayment === (item.title as string).toLowerCase() && (
                                        <div className='nkxh-v4'>
                                            <img alt='icon-tick-bold' className='qx2j-qy' src={tickIcon} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='p-6 border-t bg-blue-50 flex items-end flex-col gap-4'>
                        <div className='flex items-center w-[25%] justify-between text-[14px] '>
                            <h4 className='text-gray-500'>Tổng tiền hàng</h4>
                            <span className='text-text-primary'>{formatToVND(1200000)}</span>
                        </div>
                        <div className='flex items-center w-[25%] justify-between text-[14px]'>
                            <h4 className='text-gray-500'>Phí vận chuyển</h4>
                            <span className='text-text-primary'>Miễn phí</span>
                        </div>
                        <div className='flex items-center w-[25%] justify-between text-[14px]'>
                            <h4 className='text-gray-500'>Giảm giá</h4>
                            <span className='text-text-primary'>{formatToVND(0)}</span>
                        </div>
                        <div className='flex items-center w-[25%] justify-between text-[14px]'>
                            <h4 className='text-gray-500'>Tổng thanh toán</h4>
                            <span className='text-blue-600 text-[24px]'>{formatToVND(1200000)}</span>
                        </div>
                    </div>

                    <div className='bg-white p-6 border-t flex justify-end'>
                        <MyButton className='h-[40px] w-[240px] hover:opacity-90 bg-blue-600 text-white rounded-sm'>
                            Đặt hàng
                        </MyButton>
                    </div>
                </div>
            </div>
        </Container>
    )
}
