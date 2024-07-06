import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaLocationDot } from 'react-icons/fa6'
import { GoPlus } from 'react-icons/go'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { MdOutlineNoteAlt } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Address } from '~/@types/addresses.type'
import { ExtendedCartType } from '~/@types/carts.type'
import tickIcon from '~/assets/images/tickIcon.png'
import CustomDialog from '~/components/CustomDialog'
import MyButton from '~/components/MyButton'
import MyButtonMUI from '~/components/MyButtonMUI'
import pathConfig from '~/configs/path.config'
import useSetTitle from '~/hooks/useSetTitle'
import addressesService from '~/services/addresses.service'
import { getCartsFromLS } from '~/utils/auth'
import { formatToVND } from '~/utils/helpers'

type PaymentMethodType = {
    id: string
    title: string
}

const paymentMethod: PaymentMethodType[] = [
    {
        id: 'cod',
        title: 'Thanh toán khi nhận hàng'
    },
    {
        id: 'online',
        title: 'Thanh toán online'
    }
]

type ExtendedAddressType = Address & {
    checked: boolean
}

export default function Checkout() {
    useSetTitle('Thanh toán')
    const { register, handleSubmit } = useForm<{ note: string }>()
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const getCartFromLS = getCartsFromLS() as ExtendedCartType[]

    const onSubmit = handleSubmit((data) => {
        const variantIds = getCartFromLS.map((item) => {
            return {
                variant_id: item.variant.id
            }
        })

        const body = {
            ...data,
            order_details: variantIds
        }
        console.log(body)
    })

    const { data } = useQuery({
        queryKey: ['addresses'],
        queryFn: () => addressesService.getMyAddresses()
    })

    const addresses = data?.data.result as Address[]
    const [extendedAddress, setExtendedAddress] = useState<ExtendedAddressType[]>([])

    const handleChecked = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setExtendedAddress(
            produce((draft) => {
                draft.forEach((address) => {
                    address.checked = false
                })
                draft[index].checked = e.target.checked
            })
        )
    }

    useEffect(() => {
        if (addresses) {
            setExtendedAddress(
                addresses.map((address) => {
                    return {
                        ...address,
                        checked: address.is_default ? true : false
                    }
                })
            )
        }
    }, [addresses])

    const addressChecked = useMemo(() => {
        return extendedAddress.find((address) => address.checked) ?? extendedAddress.find((address) => address.is_default)
    }, [extendedAddress])

    return (
        <Container style={{ padding: '0' }}>
            <CustomDialog open={open} setOpen={setOpen}>
                <div className='w-[600px] bg-white py-6'>
                    <div className='flex justify-between  border-b'>
                        <h2 className='text-gray-600 capitalize  px-6 pb-4'>Địa chỉ của tôi</h2>
                        <Link to={pathConfig.accountCreateAddress}>
                            <MyButton
                                onClick={() => setOpen(false)}
                                className='w-[140px] mr-4 pb-4  text-blue-600 rounded-sm hover:opacity-90'
                            >
                                <GoPlus fontSize='20px' />
                                Thêm địa chỉ mới
                            </MyButton>
                        </Link>
                    </div>
                    <div className='px-4 overflow-hidden'>
                        {extendedAddress &&
                            extendedAddress.length > 0 &&
                            extendedAddress.map((address, index) => (
                                <div key={address.id} className='flex items-start border-b py-4 gap-1'>
                                    <div className='w-[80%] flex items-start gap-2'>
                                        <div className='flex items-center'>
                                            <input
                                                onChange={handleChecked(index)}
                                                id={`address-${address.id}`}
                                                checked={address.checked}
                                                type='radio'
                                                name='default-radio'
                                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                                            />
                                        </div>

                                        <label htmlFor={`address-${address.id}`}>
                                            <div className=' flex items-center gap-2'>
                                                <div className='text-text-primary'>{address?.full_name}</div>
                                                <div className='w-[1px] h-4 bg-gray-200'></div>
                                                <div className='text-gray-600 text-[14px] mt-0.5'>{address?.phone_number}</div>
                                            </div>
                                            <p className='text-[14px] text-gray-500 mt-2 leading-5'>
                                                {address?.description}, {address?.ward}, {address?.district}, {address?.province}
                                            </p>
                                        </label>
                                    </div>
                                    <div className='w-[20%]'></div>
                                </div>
                            ))}
                    </div>
                    <div className='px-6 pt-4 flex items-center justify-end gap-2'>
                        <MyButton
                            onClick={() => setOpen(false)}
                            className='w-[140px] h-[40px] bg-blue-600 text-white rounded-sm hover:opacity-90'
                        >
                            Xác nhận
                        </MyButton>
                    </div>
                </div>
            </CustomDialog>
            <div className='min-h-[100vh] pb-20'>
                <div className='line-order mt-3'></div>
                {extendedAddress && (
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
                                    <p>{addressChecked?.full_name}</p>
                                    <p className='mt-1'>{addressChecked?.phone_number}</p>
                                </div>
                                <div className='w-[60%]'>
                                    <p>
                                        {addressChecked?.description}, {addressChecked?.ward}, {addressChecked?.district},{' '}
                                        {addressChecked?.province}
                                    </p>
                                </div>
                                <div className='w-[20%] flex items-center justify-end gap-3'>
                                    {addressChecked?.is_default == 1 && (
                                        <Fragment>
                                            <button className='py-1 px-2 text-[14px] capitalize b text-red-600'>Mặc định</button>
                                            <div className='w-[0.5px] h-[20px] bg-gray-300'></div>
                                        </Fragment>
                                    )}

                                    <MyButtonMUI
                                        onClick={() => setOpen(true)}
                                        variant='outlined'
                                        sx={{ width: '100px', fontSize: '12px', px: 0, borderRadius: '2px' }}
                                    >
                                        Thay đổi
                                    </MyButtonMUI>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product */}
                <div className='bg-white'>
                    <div className='grid grid-cols-12 rounded-sm mt-3 py-5 px-9 text-sm capitalize text-gray-500 border-b'>
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

                    {/* Product Order */}
                    <div className='py-4'>
                        {getCartFromLS &&
                            getCartFromLS.length > 0 &&
                            getCartFromLS.map((item) => {
                                const promotionPrice = item.variant?.current_price_plan?.promotion_price
                                const salePrice = item.variant?.current_price_plan?.sale_price
                                return (
                                    <div key={item.id} className='my-3 rounded-sm bg-white px-5'>
                                        <div className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'>
                                            <div className='col-span-6 flex'>
                                                <div className='flex w-[80%]'>
                                                    <div className='flex-grow'>
                                                        <div className='flex'>
                                                            <Link className='h-20 w-20 flex-shrink-0' to={`123`}>
                                                                <img
                                                                    alt={item?.variant.product_name}
                                                                    src={item?.variant.product_images[0].url}
                                                                />
                                                            </Link>
                                                            <div className='flex-grow px-2 pt-1 pb-2 text-left'>
                                                                <Link to={`123`} className='text-left line-clamp-2'>
                                                                    {item?.variant.product_name}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-[20%] flex items-center justify-center text-[14px] text-blue-600 py-[4px]'>
                                                    <div className=''>
                                                        {item?.variant.size} - {item.variant.color}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-span-6'>
                                                <div className='grid grid-cols-5 items-center'>
                                                    <div className='col-span-2'>
                                                        <div className='flex items-center justify-center'>
                                                            <span className='ml-3 text-text-primary'>
                                                                {promotionPrice
                                                                    ? formatToVND(promotionPrice)
                                                                    : formatToVND(salePrice)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='col-span-1'>
                                                        <span>{item.quantity}</span>
                                                    </div>
                                                    <div className='col-span-2'>
                                                        <span className='text-orange'>
                                                            {promotionPrice
                                                                ? formatToVND(promotionPrice * item.quantity)
                                                                : formatToVND(salePrice * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>

                {/* Voucher */}
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
                    {/* Payment method */}
                    <div className='p-6 flex items-center gap-4'>
                        <div className='capitalize text-lg'>Phương thức thanh toán</div>
                        <div className=''>
                            {paymentMethod.map((item) => (
                                <button
                                    key={item.id}
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
                    {/* Total */}
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

                    {/* Submit */}
                    <form onSubmit={onSubmit} className='bg-white p-6 border-t flex justify-between items-center'>
                        <div className='w-3/6'>
                            <div className='w-full relative'>
                                <button className='absolute left-0 top-1/2 -translate-y-1/2 px-4 text-gray-400'>
                                    <MdOutlineNoteAlt fontSize='18px' />
                                </button>
                                <input
                                    {...register('note')}
                                    type='text'
                                    placeholder='Ghi chú nếu có'
                                    autoComplete='off'
                                    className='w-full h-[44px]  border border-gray-200 rounded-sm bg-[#f8f8f8] outline-none pl-10 pr-4 text-[14px] text-gray-400'
                                />
                            </div>
                        </div>
                        <MyButton type='submit' className='h-[44px] w-[240px] hover:opacity-90 bg-blue-600 text-white rounded-sm'>
                            Đặt hàng
                        </MyButton>
                    </form>
                </div>
            </div>
        </Container>
    )
}
