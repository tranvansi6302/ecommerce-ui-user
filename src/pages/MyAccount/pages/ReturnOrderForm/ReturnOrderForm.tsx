import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { OrderDetail } from '~/@types/orders.type'
import { ProductSale } from '~/@types/productSales.type'
import { Variant } from '~/@types/variants.type'
import tickIcon from '~/assets/images/tickIcon.png'
import CustomDialog from '~/components/CustomDialog'
import MyButton from '~/components/MyButton'
import { queryClient } from '~/main'
import productSalesService from '~/services/productSales.service'
import returnOrderService, { ReturnOrderBody } from '~/services/returnOrder.service'
import {
    checkEqualPromotionPrice,
    checkEqualSalePrice,
    formatToVND,
    getMinMaxPromotionPrice,
    getMinMaxSalePrice,
    getUniqueSizeAndColor
} from '~/utils/helpers'
type ReturnOrderFormProps = {
    openReturnOrder: boolean
    setOpenReturnOrder: React.Dispatch<React.SetStateAction<boolean>>
    orderDetail: OrderDetail
}

export default function ReturnOrderForm({ openReturnOrder, setOpenReturnOrder, orderDetail }: ReturnOrderFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{ return_reason: string }>()

    const createReturnOrderMutation = useMutation({
        mutationFn: (body: ReturnOrderBody) => returnOrderService.createReturnOrder(body)
    })

    const onSubmit = handleSubmit((data) => {
        // Check if the variant is the same as the order detail
        if (orderDetail?.variant?.id === activeVariant?.id) {
            toast.warn('Sản phẩm này đã được đổi trả')
            return
        }
        const finalData = {
            order_detail_id: orderDetail?.id,
            old_variant_id: orderDetail?.variant?.id,
            variant_id: activeVariant?.id ?? 0,
            return_reason: data.return_reason,
            old_price: orderDetail?.price,
            price: activeVariant?.current_price_plan?.promotion_price || activeVariant?.current_price_plan?.sale_price
        }
        createReturnOrderMutation.mutate(finalData as ReturnOrderBody, {
            onSuccess: () => {
                setOpenReturnOrder(false)
                queryClient.invalidateQueries({ queryKey: ['orders'] })
            }
        })
    })

    const { data: productSale } = useQuery({
        queryKey: ['productSale', orderDetail?.variant?.product_id],
        queryFn: () => productSalesService.getProductSale(Number(orderDetail?.variant?.product_id)),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData,
        enabled: !!orderDetail?.variant?.product_id
    })

    const variants = productSale?.data.result?.variants
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [selectedSize, setSelectedSize] = useState<string>('')
    const { colors, sizes } = getUniqueSizeAndColor(productSale?.data.result as ProductSale)
    const [activeVariant, setActiveVariant] = useState<Variant | null>(null)
    useEffect(() => {
        if (selectedColor && selectedSize) {
            const variant = variants?.find(
                (x) => x.color.toLowerCase() === selectedColor && x.size.toLowerCase() === selectedSize
            )

            setActiveVariant(variant as unknown as Variant)
        }
    }, [productSale?.data.result, selectedColor, selectedSize])

    return (
        <CustomDialog open={openReturnOrder} setOpen={setOpenReturnOrder}>
            <div className='w-[800px] bg-white pb-6 pt-2'>
                <h2 className='text-gray-600 capitalize px-6 pt-4'>Yêu cầu đổi trả sản phẩm</h2>
                <div className='flex justify-between border-b items-center'>
                    <form onSubmit={onSubmit} className='px-6 overflow-hidden mt-8'>
                        <div className='flex gap-2 py-3 border border-dashed border-gray-300  px-2 rounded-lg'>
                            <img
                                className='w-[56px] h-[56px] object-cover'
                                src={orderDetail?.variant?.product_images[0].url}
                                alt={orderDetail?.variant?.variant_name}
                            />
                            <div className=''>
                                <p className='text-text-primary text-[14px]'>{orderDetail?.variant?.product_name}</p>
                                <p className='text-gray-500 text-[13px] mt-2'>
                                    Phân loại: {orderDetail?.variant?.size.toUpperCase()} -{' '}
                                    {orderDetail?.variant?.color.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <h3 className='text-gray-600 capitalize mt-6 text-[14px]'>Chọn màu và kích thước</h3>
                        <div className='mt-8 flex items-baseline'>
                            <span className='capitalize text-gray-500 w-[110px]'>Màu</span>
                            <div className='flex items-center flex-wrap'>
                                {colors.length > 0 &&
                                    colors.map((color) => (
                                        <button
                                            type='button'
                                            onClick={() => setSelectedColor((color as string).toLowerCase())}
                                            key={color as string}
                                            className={`items-center justify-center bg-white border  rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words capitalize ${selectedColor === (color as string).toLowerCase() ? 'border-blue-600' : ''}`}
                                        >
                                            {color as string}
                                            {selectedColor === (color as string).toLowerCase() && (
                                                <div className='nkxh-v4'>
                                                    <img alt='icon-tick-bold' className='qx2j-qy' src={tickIcon} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </div>
                        <div className='mt-8 flex items-baseline'>
                            <span className='capitalize text-gray-500 w-[110px]'>Kích thước</span>
                            <div className='flex items-center flex-wrap'>
                                {sizes.length > 0 &&
                                    sizes.map((size) => (
                                        <button
                                            type='button'
                                            onClick={() => setSelectedSize((size as string).toLowerCase())}
                                            key={size as string}
                                            className={`items-center justify-center bg-white border rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words capitalize ${selectedSize === (size as string).toLowerCase() ? 'border-blue-600' : ''}`}
                                        >
                                            {size as string}
                                            {selectedSize === (size as string).toLowerCase() && (
                                                <div className='nkxh-v4'>
                                                    <img alt='icon-tick-bold' className='qx2j-qy' src={tickIcon} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <div className='flex items-center gap-5 '>
                            <h3 className='text-gray-500 capitalize mt-6 text-[16px]'>Giá sản phẩm</h3>
                            {!activeVariant && (
                                <div className='mt-8 flex items-center bg-blue-50 px-5 py-4 flex-1'>
                                    {getMinMaxPromotionPrice(productSale?.data.result as ProductSale).minPromotionPrice !== 0 && (
                                        <div className='text-gray-500 line-through text-xl'>
                                            {checkEqualSalePrice(productSale?.data.result as ProductSale) ? (
                                                <span>
                                                    {formatToVND(
                                                        getMinMaxSalePrice(productSale?.data.result as ProductSale).minSalePrice
                                                    )}
                                                </span>
                                            ) : (
                                                <span>
                                                    {formatToVND(
                                                        getMinMaxSalePrice(productSale?.data.result as ProductSale).minSalePrice
                                                    )}
                                                    {' - '}
                                                    {formatToVND(
                                                        getMinMaxSalePrice(productSale?.data.result as ProductSale).maxSalePrice
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {getMinMaxPromotionPrice(productSale?.data.result as ProductSale).minPromotionPrice === 0 ? (
                                        <div className='ml-3 text-3xl font-medium text-blue-600'>
                                            {checkEqualSalePrice(productSale?.data.result as ProductSale) ? (
                                                <span>
                                                    {formatToVND(
                                                        getMinMaxSalePrice(productSale?.data.result as ProductSale).minSalePrice
                                                    )}
                                                </span>
                                            ) : (
                                                <span>
                                                    {formatToVND(
                                                        getMinMaxSalePrice(productSale?.data.result as ProductSale).minSalePrice
                                                    )}
                                                    {' - '}
                                                    {formatToVND(
                                                        getMinMaxSalePrice(productSale?.data.result as ProductSale).maxSalePrice
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='ml-3 text-3xl font-medium text-blue-600'>
                                            {checkEqualPromotionPrice(productSale?.data.result as ProductSale) ? (
                                                <span>
                                                    {formatToVND(
                                                        getMinMaxPromotionPrice(productSale?.data.result as ProductSale)
                                                            .minPromotionPrice
                                                    )}
                                                </span>
                                            ) : (
                                                <span>
                                                    {formatToVND(
                                                        getMinMaxPromotionPrice(productSale?.data.result as ProductSale)
                                                            .minPromotionPrice
                                                    )}
                                                    {' - '}
                                                    {formatToVND(
                                                        getMinMaxPromotionPrice(productSale?.data.result as ProductSale)
                                                            .maxPromotionPrice
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {getMinMaxPromotionPrice(productSale?.data.result as ProductSale).minPromotionPrice !== 0 && (
                                        <div className='ml-4 rounded-sm bg-blue-600 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                                            20% giảm
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeVariant && (
                                <div className='mt-8 flex items-center bg-gray-50 px-5 py-4 flex-1'>
                                    {activeVariant?.current_price_plan?.promotion_price && (
                                        <div className='text-gray-500 line-through text-xl'>
                                            <span>{formatToVND(activeVariant?.current_price_plan?.sale_price)}</span>
                                        </div>
                                    )}

                                    <div className='ml-3 text-3xl font-medium text-blue-600'>
                                        {!activeVariant?.current_price_plan?.promotion_price ? (
                                            <span>{formatToVND(activeVariant?.current_price_plan?.sale_price)}</span>
                                        ) : (
                                            <span>{formatToVND(activeVariant?.current_price_plan?.promotion_price)}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='mt-8 '>
                            <div className='mt-6'>
                                <label className='text-text-primary text-[14px] inline-block mb-2' htmlFor='comment'>
                                    Lý do đổi trả
                                </label>
                                <textarea
                                    {...register('return_reason')}
                                    id='return_reason'
                                    rows={4}
                                    className={`textarea-address w-full p-5 text-[14px] 
                rounded-[4px] text-text-primary bg-white border border-[#aeaeae] ${errors.return_reason?.message ? 'invalid' : false}`}
                                />
                                {errors.return_reason && (
                                    <p className='text-[12px] ml-[14px] mt-[3px] text-[#d32f2f]'>
                                        {errors.return_reason.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='sticky bottom-0 px-6 bg-white py-5 flex items-center justify-end gap-2'>
                            <MyButton
                                isLoading={false}
                                type='submit'
                                className='w-[140px] h-[40px] bg-blue-600 text-white rounded-sm hover:opacity-90'
                            >
                                Xác nhận
                            </MyButton>
                        </div>
                    </form>
                </div>
            </div>
        </CustomDialog>
    )
}
