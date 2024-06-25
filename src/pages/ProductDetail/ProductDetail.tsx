import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductSale } from '~/@types/productSales.type'
import tickIcon from '~/assets/images/tickIcon.png'
import { AddToCartIcon, NextIcon, PrevIcon } from '~/assets/svg'
import MyButton from '~/components/MyButton'
import ProductFeatured from '~/components/ProductFeatured'
import ProductRating from '~/components/ProductRating'
import QuantityController from '~/components/QuantityController/QuantityController'
import productSalesService from '~/services/productSales.service'
import {
    checkEqualPromotionPrice,
    checkEqualSalePrice,
    formatToVND,
    getMinMaxPromotionPrice,
    getMinMaxSalePrice,
    getUniqueSizeAndColor
} from '~/utils/helpers'

export default function ProductDetail() {
    const { id: productId } = useParams<{ id: string }>()
    const [buyCount, setBuyCount] = useState<number>(1)
    const handleBuyCount = (value: number) => {
        setBuyCount(value)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [productId])

    const { data: productSale } = useQuery({
        queryKey: ['productSale', productId],
        queryFn: () => productSalesService.getProductSale(Number(productId)),
        enabled: !!productId
    })
    const { colors, sizes } = getUniqueSizeAndColor(productSale?.data.result as ProductSale)

    return (
        <Fragment>
            <Container style={{ padding: '0' }}>
                <div className='py-6'>
                    <div className='bg-white p-4 shadow'>
                        <div className='container'>
                            <div className='grid grid-cols-1 md:grid-cols-12 gap-9'>
                                <div className='w-full md:col-span-5'>
                                    <div className='w-full'>
                                        <div className='relative w-full pt-[100%] shadow'>
                                            <img
                                                className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                                                srcSet={productSale?.data.result?.images[0].url as string}
                                                alt='product'
                                            />
                                        </div>
                                        <div className='relative mt-4 grid grid-cols-5 gap-1'>
                                            <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                                                <PrevIcon />
                                            </button>
                                            {productSale?.data.result?.images.map((image) => (
                                                <div key={image.id} className='relative w-full pt-[100%]'>
                                                    <img
                                                        className='absolute top-0 left-0 h-full w-full bg-white object-cover cursor-pointer'
                                                        src={image.url}
                                                        alt='product'
                                                    />
                                                    <div className='absolute inset-0 border-2 border-blue-700'></div>
                                                </div>
                                            ))}

                                            <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                                                <NextIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full md:col-span-7'>
                                    <h1 className='text-xl text-text-primary font-medium'>
                                        {productSale?.data.result?.product_name}
                                    </h1>
                                    <div className='mt-8 flex items-center'>
                                        <div className='flex items-center'>
                                            <span className='mr-1 border-b border-b-blue-600 text-blue-600'>
                                                {productSale?.data.result?.average_rating}
                                            </span>
                                            <ProductRating rating={productSale?.data.result?.average_rating as number} />
                                        </div>
                                        <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                                        <div>
                                            <span>{productSale?.data.result?.total_sold}</span>
                                            <span className='ml-2 text-gray-500'>Đã bán</span>
                                        </div>
                                    </div>
                                    <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
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
                                        <div className='ml-4 rounded-sm bg-blue-600 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                                            20 giảm
                                        </div>
                                    </div>
                                    <div className='w-full h-[1px] bg-gray-200 mt-8'></div>
                                    <div className='mt-8 flex items-baseline'>
                                        <span className='capitalize text-gray-500 w-[110px]'>Màu</span>
                                        <div className='flex items-center flex-wrap'>
                                            {colors.length > 0 &&
                                                colors.map((color) => (
                                                    <button
                                                        key={color as string}
                                                        className=' items-center justify-center bg-white border border-blue-600 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words capitalize'
                                                    >
                                                        {color as string}
                                                        <div className='nkxh-v4'>
                                                            <img alt='icon-tick-bold' className='qx2j-qy' src={tickIcon} />
                                                        </div>
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
                                                        key={size as string}
                                                        className=' items-center justify-center bg-white border border-blue-600 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words capitalize'
                                                    >
                                                        {size as string}
                                                        <div className='nkxh-v4'>
                                                            <img alt='icon-tick-bold' className='qx2j-qy' src={tickIcon} />
                                                        </div>
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                    <div className='mt-8 flex items-center'>
                                        <div className='capitalize text-gray-500'>Số lượng</div>
                                        <QuantityController
                                            onDecrease={handleBuyCount}
                                            onIncrease={handleBuyCount}
                                            onType={handleBuyCount}
                                            value={buyCount}
                                            max={100}
                                        />
                                        <div className='ml-6 text-sm text-gray-500'>100 sản phẩm có sẵn</div>
                                    </div>
                                    <div className='mt-8 flex items-center'>
                                        <MyButton className='h-12 rounded-sm border border-blue-600 bg-blue-50 px-5 shadow-sm hover:bg-blue-50'>
                                            <AddToCartIcon />
                                            Thêm vào giỏ hàng
                                        </MyButton>

                                        <MyButton className='ml-4 h-12  rounded-sm bg-blue-600 px-12 text-white shadow-sm outline-none hover:bg-blue-500 transition-all'>
                                            Mua ngay
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white shadow p-6 text-text-primary mt-4'>
                        <h2 className='uppercase bg-gray-100 p-4 text-[18px]'>Chi tiết sản phẩm</h2>
                        <div className='leading-10 p-6'>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(productSale?.data.result?.description as string)
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className=' text-text-primary'>
                <ProductFeatured title='Sản phẩm liên quan'></ProductFeatured>
            </div>
        </Fragment>
    )
}
