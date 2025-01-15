import { Container } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaShippingFast } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { GoPlus } from 'react-icons/go'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { MdOutlineNoteAlt } from 'react-icons/md'
import { TfiExchangeVertical } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'
import { Address } from '~/@types/addresses.type'
import { SaveCartToLSType } from '~/@types/carts.type'
import { AvailableService, AvailableServiceRequest, FeeRequest, Leadtime, LeadtimeRequest } from '~/@types/ghn.type'
import noOrder from '~/assets/images/noOrder.png'
import tickIcon from '~/assets/images/tickIcon.png'
import CustomDialog from '~/components/CustomDialog'
import MyButton from '~/components/MyButton'
import goodsDefaultConfig from '~/configs/goods.config'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import useSetTitle from '~/hooks/useSetTitle'
import addressesService from '~/services/addresses.service'
import ghnService from '~/services/ghn.service'
import { getCartsFromLS } from '~/utils/auth'
import { convertTimestampToDate, formatToVND } from '~/utils/helpers'
import MyVoucher from './components/MyVoucher'
import { Voucher } from './components/MyVoucher/fake'
import { toast } from 'react-toastify'
import { CreateOrderRequest } from '~/@types/orders.type'
import ordersService from '~/services/orders.service'
import paymentsService from '~/services/payments.service'
import { PaymentMethod } from '~/enums/PaymentMethod'
import momoLogo from '~/assets/images/momoLogo.png'
import vnpayLogo from '~/assets/images/vnpayLogo.png'

const paymentTitle = [
    {
        id: 'cod',
        title: 'Thanh toán khi nhận hàng'
    },
    {
        id: 'online_banking',
        title: 'Thanh toán online'
    }
]

type OnlinePaymentType = {
    id: string
    title: string
    logo: string
}

const onlinePayment: OnlinePaymentType[] = [
    {
        id: PaymentMethod.MOMO,
        title: 'Thanh toán bằng Momo',
        logo: momoLogo
    },
    {
        id: PaymentMethod.VNPAY,
        title: 'Thanh toán bằng VNPay',
        logo: vnpayLogo
    }
]

type ExtendedAddressType = Address & {
    checked: boolean
}

export default function Checkout() {
    useSetTitle('Thanh toán')
    const [leadtimeDate, setLeadtimeDate] = useState<string | undefined>('')
    const [feeMoney, setFeeMoney] = useState<number>(0)
    const { setGlobalOpenCreateAddessDialog, setGlobalOpenUpdateAddessDialog, setAddressIdContext, profile } =
        useContext(AppContext)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<{ note: string }>()
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [openVoucher, setOpenVoucher] = useState<boolean>(false)
    const [selectedShippingVoucher, setSelectedShippingVoucher] = useState<Voucher | null>(null)
    const [selectedOrderVoucher, setSelectedOrderVoucher] = useState<Voucher | null>(null)
    const [selectedMethodOnline, setSelectedMethodOnline] = useState<string>('')
    const getCartLS = getCartsFromLS() as SaveCartToLSType
    const cartUser = getCartLS.user_id
    const cartDetails = useMemo(() => {
        return cartUser === profile?.id ? getCartLS.cart_details : []
    }, [cartUser, getCartLS.cart_details, profile?.id])

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

    // Total
    const totalCheckoutProduct = useMemo(() => {
        return cartDetails.reduce((acc, item) => {
            // Ensure we have a valid price, defaulting to 0 if not available
            const price = item.variant?.current_price_plan?.sale_price
                ? item.variant.current_price_plan.sale_price
                : item.variant?.current_price_plan?.promotion_price ?? 0
            const quantity = typeof item.quantity === 'number' ? item.quantity : 0
            return acc + price * quantity
        }, 0)
    }, [cartDetails])

    const onUpdateAddress = (id: number) => {
        setGlobalOpenUpdateAddessDialog(true)
        setAddressIdContext(id)
    }

    // Handle GHN service
    const getAvailableServiceMutation = useMutation({
        mutationFn: (body: AvailableServiceRequest) => ghnService.getAvailableServices(body)
    })

    const getleadtimeMutation = useMutation({
        mutationFn: (body: LeadtimeRequest) => ghnService.getLeadtime(body),
        onSuccess: (data) => {
            setLeadtimeDate(convertTimestampToDate((data?.data?.data as Leadtime).leadtime))
        }
    })

    const getFeeMutation = useMutation({
        mutationFn: (body: FeeRequest) => ghnService.getFee(body),
        onSuccess: (data) => {
            setFeeMoney(Number(data?.data?.data?.total))
        }
    })

    useEffect(() => {
        const handleGetLeadtime = async () => {
            const service = await getAvailableServiceMutation.mutateAsync({
                from_district: Number(import.meta.env.VITE_DISTRICT_GHN_ID),
                to_district: Number(addressChecked?.district_id),
                shop_id: Number(import.meta.env.VITE_SHOP_GHN_ID)
            })
            await getleadtimeMutation.mutateAsync({
                from_district_id: Number(import.meta.env.VITE_DISTRICT_GHN_ID),
                from_ward_code: import.meta.env.VITE_WARD_GHN_ID,
                to_district_id: Number(addressChecked?.district_id),
                to_ward_code: addressChecked?.ward_id.toString() as string,
                service_id: Number((service?.data?.data as AvailableService[])[0].service_id)
            })
        }
        if (addressChecked) {
            handleGetLeadtime()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressChecked])

    useEffect(() => {
        const data: FeeRequest = {
            service_type_id: 2, // Default
            to_district_id: Number(addressChecked?.district_id),
            to_ward_code: addressChecked?.ward_id.toString() as string,
            height: goodsDefaultConfig.HEIGHT,
            length: goodsDefaultConfig.LENGTH,
            weight: goodsDefaultConfig.WEIGHT * cartDetails.map((item) => item.quantity).reduce((acc, cur) => acc + cur, 0),
            width: goodsDefaultConfig.WIDTH
        }
        getFeeMutation.mutate(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressChecked])

    const amountVoucherOrder = useMemo(() => {
        if (selectedOrderVoucher) {
            if (selectedOrderVoucher.discount_type === 'MONEY') {
                return formatToVND(selectedOrderVoucher.value)
            } else {
                return formatToVND((totalCheckoutProduct * selectedOrderVoucher.value) / 100)
            }
        }
        return 'Chưa áp dụng'
    }, [selectedOrderVoucher, totalCheckoutProduct])

    const amountVoucherShipping = useMemo(() => {
        if (selectedShippingVoucher) {
            if (selectedShippingVoucher.discount_type === 'MONEY' && feeMoney > selectedShippingVoucher.value) {
                return selectedShippingVoucher.value
            }

            if (selectedShippingVoucher.discount_type === 'MONEY' && feeMoney <= selectedShippingVoucher.value) {
                return feeMoney
            }

            if (selectedShippingVoucher.discount_type === 'PERCENTAGE' && selectedShippingVoucher.value === 100) {
                return feeMoney
            }
        }
        return null
    }, [feeMoney, selectedShippingVoucher])

    const totalCheckout = useMemo(() => {
        return formatToVND(
            totalCheckoutProduct - Number(amountVoucherOrder.replace(/\D/g, '')) - Number(amountVoucherShipping) + feeMoney
        )
    }, [totalCheckoutProduct, amountVoucherOrder, feeMoney, amountVoucherShipping])

    // Handle checkout
    const createOrderMutation = useMutation({
        mutationFn: (body: CreateOrderRequest) => ordersService.createOrder(body)
    })
    const createPaymentMomoMutation = useMutation({
        mutationFn: (body: { amount: number; order_id: string }) => paymentsService.createPaymentMomo(body)
    })
    const onSubmit = handleSubmit(async (data) => {
        if (extendedAddress.length === 0) {
            toast.warn('Vui lòng thêm địa chỉ nhận hàng!')
            return
        }
        if (!selectedPayment) {
            toast.warn('Vui lòng chọn phương thức thanh toán!')
            return
        }

        if (!selectedMethodOnline && selectedPayment === 'online_banking') {
            toast.warn('Vui lòng chọn phương thức thanh toán online!')
            return
        }

        const variantIds = cartDetails.map((item) => {
            return {
                variant_id: item.variant.id
            }
        })

        const body = {
            ...data,
            full_name: addressChecked?.full_name,
            phone_number: addressChecked?.phone_number,
            address: `${addressChecked?.description}, ${addressChecked?.ward}, ${addressChecked?.district}, ${addressChecked?.province}`,
            order_details: variantIds,
            discount_on_order: selectedOrderVoucher?.value ?? 0,
            discount_shipping: amountVoucherShipping ?? 0,
            payment_method: PaymentMethod.MOMO,
            shipping_fee: feeMoney ?? 0
        }
        const resOrder = await createOrderMutation.mutateAsync(body)

        if (selectedMethodOnline === PaymentMethod.MOMO) {
            await createPaymentMomoMutation.mutateAsync(
                {
                    amount: Number(totalCheckout.replace(/\D/g, '')),
                    order_id: resOrder?.data?.result?.order_code.toString() || ''
                },
                {
                    onSuccess: (data) => {
                        window.location.href = data.data.result?.qr_code as string
                    }
                }
            )
        } else {
            toast.success('Đặt hàng thành công!')
            navigate(pathConfig.carts)
        }
    })
    return (
        <Container style={{ padding: '0' }}>
            <MyVoucher
                totalCheckoutProduct={totalCheckoutProduct}
                selectedOrderVoucher={selectedOrderVoucher}
                setSelectedOrderVoucher={setSelectedOrderVoucher}
                selectedShippingVoucher={selectedShippingVoucher}
                setSelectedShippingVoucher={setSelectedShippingVoucher}
                openVoucher={openVoucher}
                setOpenVoucher={setOpenVoucher}
            />
            <CustomDialog open={open} setOpen={setOpen}>
                <div className='w-[600px] bg-white py-6'>
                    <div className='flex justify-between  border-b'>
                        <h2 className='text-gray-600 capitalize  px-6 pb-4'>Địa chỉ của tôi</h2>

                        <MyButton
                            onClick={() => setGlobalOpenCreateAddessDialog(true)}
                            className='w-[140px] mr-4 pb-4  text-blue-600 rounded-sm hover:opacity-90'
                        >
                            <GoPlus fontSize='20px' />
                            Thêm địa chỉ mới
                        </MyButton>
                    </div>
                    <div className='px-4 overflow-hidden'>
                        {extendedAddress &&
                            extendedAddress.length > 0 &&
                            extendedAddress.map((address, index) => (
                                <div key={address.id} className='flex items-start border-b gap-1'>
                                    <div className='w-[80%] flex items-start gap-2'>
                                        <div className='flex items-center py-4'>
                                            <input
                                                onChange={handleChecked(index)}
                                                id={`address-${address.id}`}
                                                checked={address.checked}
                                                type='radio'
                                                name='default-radio'
                                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                                            />
                                        </div>

                                        <label className='py-4 w-full' htmlFor={`address-${address.id}`}>
                                            <div className=' flex items-center gap-2'>
                                                <div className='text-text-primary'>{address?.full_name}</div>
                                                <div className='w-[1px] h-4 bg-gray-200'></div>
                                                <div className='text-gray-600 text-[14px] mt-0.5'>{address?.phone_number}</div>
                                            </div>
                                            <p className='text-[14px] text-gray-500 mt-2 leading-5'>
                                                {address?.description}, {address?.ward}, {address?.district}, {address?.province}
                                            </p>
                                            {address.is_default === 1 && (
                                                <span className='px-3 text-[12px] capitalize py-1 border border-red-600 inline-block mt-2 rounded-sm text-red-600 bg-red-50'>
                                                    Mặc định
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div className='w-[20%] flex items-center justify-end'>
                                        <button
                                            onClick={() => onUpdateAddress(address.id)}
                                            className='text-blue-600 capitalize text-[14px] mt-4 pr-6'
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className='sticky bottom-0 px-6 bg-white py-5 flex items-center justify-end gap-2'>
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
                                <div className='text-blue-600 text-lg flex items-center gap-2 capitalize'>
                                    <FaLocationDot />
                                    Địa chỉ nhận hàng
                                </div>
                            </div>
                            {addressChecked ? (
                                <div className='flex mt-4'>
                                    <div className='w-[20%] text-text-primary font-semibold'>
                                        <p>{addressChecked?.full_name}</p>
                                        <p className='mt-1'>{addressChecked?.phone_number}</p>
                                    </div>
                                    <div className='w-[50%]'>
                                        <p>
                                            {addressChecked?.description}, {addressChecked?.ward}, {addressChecked?.district},{' '}
                                            {addressChecked?.province}
                                        </p>
                                    </div>
                                    <div className='w-[30%] flex items-center justify-end gap-3'>
                                        {addressChecked?.is_default == 1 && (
                                            <Fragment>
                                                <button className='py-1 px-2 text-[14px] capitalize b text-red-600'>
                                                    Mặc định
                                                </button>
                                                <div className='w-[0.5px] h-[20px] bg-gray-300'></div>
                                            </Fragment>
                                        )}
                                        <button
                                            onClick={() => setOpen(true)}
                                            className='py-1 px-2 text-[14px] capitalize b text-blue-600 flex items-center gap-1'
                                        >
                                            <TfiExchangeVertical />
                                            Thay đổi địa chỉ
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='mt-6'>
                                    <MyButton
                                        onClick={() => setGlobalOpenCreateAddessDialog(true)}
                                        className='w-[140px] mr-4 pb-4  text-blue-600 rounded-sm hover:opacity-90'
                                    >
                                        <GoPlus fontSize='20px' />
                                        Thêm địa chỉ mới
                                    </MyButton>
                                </div>
                            )}
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
                        {cartDetails &&
                            cartDetails.length > 0 &&
                            cartDetails.map((item) => {
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

                        {cartDetails && cartDetails.length === 0 && (
                            <div className='flex flex-col justify-center items-center'>
                                <img src={noOrder} alt='noProduct' />
                                <Link className='mt-4 text-blue-600' to={pathConfig.carts}>
                                    <MyButton>Xem giỏ hàng</MyButton>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {/* Ship */}
                {/* Voucher */}
                <div className='mt-2 bg-blue-50'>
                    <div className='px-6 py-3 border border-dashed border-gray-400'>
                        <h2 className='text-[14px] capitalize flex items-center gap-2 font-medium text-text-primary'>
                            Đơn vị vận chuyển:
                        </h2>
                        <div className='flex justify-between'>
                            <div className='mt-3 px-5 py-2 ml-24'>
                                <img
                                    className='w-[90px]'
                                    src='https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png'
                                    alt='ghn'
                                />
                                <p className='text-[14px] text-green-600 mt-2 flex items-center gap-2'>
                                    <FaShippingFast />
                                    Đảm bảo nhận hàng trước {leadtimeDate}
                                </p>
                            </div>
                            <div className='flex items-center gap-2 text-green-600 text-[14px] mr-20'>
                                <div className='capitalize'>Phí vận chuyển:</div>
                                <p>{formatToVND(Number(feeMoney))}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Voucher */}
                <div className='mt-2 bg-white'>
                    <div className='text-blue-800 text-[15px] cursor-pointer hover:text-blue-700 flex items-center justify-between p-6'>
                        <div className='flex items-center gap-3'>
                            <LiaMoneyCheckAltSolid fontSize='26px' />
                            <span className='capitalize mt-[1px] text-lg'>Shop voucher</span>
                        </div>
                        <button onClick={() => setOpenVoucher(true)} className='capitalize'>
                            {selectedOrderVoucher && selectedShippingVoucher
                                ? 'Đã áp dụng 2 mã'
                                : selectedOrderVoucher || selectedShippingVoucher
                                  ? 'Đã áp dụng 1 mã'
                                  : 'Chọn mã giảm giá'}
                        </button>
                    </div>
                </div>

                <div className='mt-2 bg-white'>
                    {/* Payment method */}
                    <div className='px-6 pt-6 mb-5 flex items-center gap-4'>
                        <div className='capitalize text-[18px]'>Phương thức thanh toán</div>
                        <div className=''>
                            {paymentTitle.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedPayment(item.id.toLowerCase())}
                                    className={`items-center justify-center  border rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words capitalize text-[14px] hover:border-blue-600 hover:text-blue-600 ${selectedPayment === (item.id as string).toLowerCase() ? 'border-blue-600' : 'border-gray-300 '}`}
                                >
                                    {item.title as string}
                                    {selectedPayment === (item.id as string).toLowerCase() && (
                                        <div className='nkxh-v4'>
                                            <img alt='icon-tick-bold' className='qx2j-qy' src={tickIcon} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    {selectedPayment && (
                        <div className='p-6 bg-blue-50'>
                            {selectedPayment === 'cod' && (
                                <p className='text-[14px] text-text-primary'>Thanh toán khi nhận hàng: Phí thu hộ 0đ</p>
                            )}

                            {selectedPayment === 'online_banking' && (
                                <div className='w-[400px] flex flex-col gap-6'>
                                    {onlinePayment.map((item) => (
                                        <label
                                            htmlFor={item.id}
                                            className='text-[14px] capitalize text-text-primary cursor-pointer'
                                        >
                                            <div className='flex items-center gap-3'>
                                                <input
                                                    onChange={() => setSelectedMethodOnline(item.id)}
                                                    checked={selectedMethodOnline === item.id}
                                                    name={item.id}
                                                    id={item.id}
                                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                                                    type='radio'
                                                />
                                                <div className='w-[60px]'>
                                                    <img className=' h-[45px] object-cover' src={item.logo} alt={item.title} />
                                                </div>
                                                <span>{item?.title}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {/* Total */}
                    <div className=' bg-white'>
                        <div className='px-7 bg-white'>
                            <div className='flex justify-end h-[48px] items-center px-6 border-t'>
                                <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                    Tổng tiền hàng
                                </h2>
                                <h2 className='text-[14px] text-text-primary text-end w-[20%]'>
                                    {formatToVND(totalCheckoutProduct)}
                                </h2>
                            </div>

                            <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                    Phí vận chuyển
                                </h2>
                                <h2 className='text-[14px] text-text-primary text-end w-[20%]'>
                                    {formatToVND(Number(feeMoney))}
                                </h2>
                            </div>
                            <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                    Giảm giá phí vận chuyển
                                </h2>
                                <h2 className='text-[14px] text-text-primary text-end w-[20%]'>
                                    {selectedOrderVoucher ? formatToVND(amountVoucherShipping as number) : 'Chưa áp dụng'}
                                </h2>
                            </div>
                            <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                    Giảm giá
                                </h2>
                                <h2 className='text-[14px] text-text-primary text-end w-[20%]'>{amountVoucherOrder}</h2>
                            </div>
                            <div className='flex justify-end h-[48px] items-center px-6  border-t'>
                                <h2 className='text-[12px] text-gray-400 w-[20%] border-r justify-end px-4 h-full flex items-center'>
                                    Thành tiền
                                </h2>
                                <h2 className='text-[24px] text-blue-600 text-end w-[20%]'>{totalCheckout}</h2>
                            </div>
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
