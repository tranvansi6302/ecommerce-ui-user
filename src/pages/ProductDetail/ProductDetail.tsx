import { Breadcrumbs, Container } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { TbCategoryMinus } from 'react-icons/tb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageViewer from 'react-simple-image-viewer'
import { toast } from 'react-toastify'
import { ProductSale } from '~/@types/productSales.type'
import { Variant } from '~/@types/variants.type'
import tickIcon from '~/assets/images/tickIcon.png'
import { AddToCartIcon, NextIcon, PrevIcon } from '~/assets/svg'
import MyButton from '~/components/MyButton'
import ProductFeatured from '~/components/ProductFeatured'
import ProductRating from '~/components/ProductRating'
import QuantityController from '~/components/QuantityController/QuantityController'
import pathConfig from '~/configs/path.config'
import useSetTitle from '~/hooks/useSetTitle'
import { BsPatchCheck } from 'react-icons/bs'
import { FaShippingFast } from 'react-icons/fa'
import { queryClient } from '~/main'
import cartsService from '~/services/carts.service'
import productSalesService from '~/services/productSales.service'
import {
    checkEqualPromotionPrice,
    checkEqualSalePrice,
    formatToVND,
    getIdFromNameId,
    getMinMaxPromotionPrice,
    getMinMaxSalePrice,
    getUniqueSizeAndColor
} from '~/utils/helpers'
import Review from './components/Review'

export default function ProductDetail() {
    const navigate = useNavigate()
    const { nameId } = useParams()
    const productId = getIdFromNameId(nameId as string)
    const [buyCount, setBuyCount] = useState<number>(1)
    const imageRef = useRef<HTMLImageElement>(null)
    const [currentImageView, setCurrentImageView] = useState<number>(0)
    const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false)
    const [activeImage, setActiveImage] = useState('')
    const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
    // Handle variant
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [selectedSize, setSelectedSize] = useState<string>('')

    const handleBuyCount = (value: number) => {
        setBuyCount(value)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [productId])

    const { data: productSale } = useQuery({
        queryKey: ['productSale', productId],
        queryFn: () => productSalesService.getProductSale(Number(productId)),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData,
        enabled: !!productId
    })

    useSetTitle((productSale?.data.result as ProductSale)?.product_name as string)

    const { colors, sizes } = getUniqueSizeAndColor(productSale?.data.result as ProductSale)

    const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const image = imageRef.current as HTMLImageElement
        const { naturalHeight, naturalWidth } = image

        const offsetX = event.pageX - (rect.x + window.scrollX)
        const offsetY = event.pageY - (rect.y + window.scrollY)

        const top = offsetY * (1 - naturalHeight / rect.height)
        const left = offsetX * (1 - naturalWidth / rect.width)
        image.style.width = naturalWidth + 'px'
        image.style.height = naturalHeight + 'px'
        image.style.maxWidth = 'unset'
        image.style.top = top + 'px'
        image.style.left = left + 'px'
    }
    const handleRemoveZoom = () => {
        imageRef.current?.removeAttribute('style')
    }
    useEffect(() => {
        if (productSale && (productSale?.data.result as ProductSale).images.length > 0) {
            setActiveImage((productSale?.data.result as ProductSale).images[0].url as string)
        }
    }, [productSale])

    // Handle image
    const currentImages = useMemo(
        () => (productSale ? (productSale?.data.result as ProductSale).images.slice(...currentIndexImages) : []),
        [productSale, currentIndexImages]
    )
    const next = () => {
        if (currentIndexImages[1] < (productSale?.data.result as ProductSale).images.length) {
            setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
        }
    }

    const prev = () => {
        if (currentIndexImages[0] > 0) {
            setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
        }
    }

    const chooseActive = (img: string) => {
        setActiveImage(img)
    }

    const listImageViews = (productSale?.data.result as ProductSale)?.images.map((img) => img.url as string)
    const openImageViewer = useCallback((index: number) => {
        setCurrentImageView(index)
        setIsViewerOpen(true)
    }, [])

    const closeImageViewer = () => {
        setIsViewerOpen(false)
        setCurrentImageView(0)
    }

    const [activeVariant, setActiveVariant] = useState<Variant | null>(null)
    useEffect(() => {
        if (selectedColor && selectedSize) {
            const variant = (productSale?.data.result as ProductSale).variants.find(
                (x) => x.color.toLowerCase() === selectedColor && x.size.toLowerCase() === selectedSize
            )

            setActiveVariant(variant as Variant)
        }
    }, [productSale?.data.result, selectedColor, selectedSize])

    // Add To Cart
    const addToCartMutation = useMutation({
        mutationFn: (body: { variant_id: number; quantity: number }) => cartsService.addProductToCart(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['productsInCart']
            })
        }
    })

    const handleAddToCart = () => {
        // Kiểm tra chỉ cho phép tối đa có 2 sản phẩm trong giỏ hàng
        // if (productsInCart && productsInCart?.data?.result?.length >= 2) {
        //     toast.warning('Chỉ được thêm tối đa 2 sản phẩm vào giỏ hàng')
        //     return
        // }

        console.log('ok')
        if (activeVariant) {
            addToCartMutation.mutate({
                variant_id: activeVariant.id,
                quantity: buyCount
            })
        } else {
            toast.warning('Vui lòng chọn màu và kích thước')
        }
    }

    const handleByNow = async () => {
        // // Kiểm tra chỉ cho phép tối đa có 2 sản phẩm trong giỏ hàng
        // if (productsInCart && productsInCart?.data?.result?.length >= 2) {
        //     toast.warning('Chỉ được thêm tối đa 2 sản phẩm vào giỏ hàng')
        //     return
        // }
        if (!activeVariant) {
            toast.warning('Vui lòng chọn màu và kích thước')
            return
        }
        const res = await addToCartMutation.mutateAsync({
            variant_id: (activeVariant as Variant).id,
            quantity: buyCount
        })

        navigate(pathConfig.carts, {
            state: {
                cart_detail_id: res.data.result?.cart_detail.id
            }
        })
    }
    return (
        <Fragment>
            <Container style={{ padding: '0' }}>
                <div className='py-4'>
                    <Breadcrumbs aria-label='breadcrumb'>
                        <Link className='flex items-center gap-1 text-blue-600 text-[14px]' to={pathConfig.home}>
                            <FaHome />
                            Trang chủ
                        </Link>
                        <Link
                            className='flex items-center gap-1 text-blue-600 text-[14px]'
                            to={`${pathConfig.productFilters}?category=${productSale?.data.result?.category.slug}`}
                        >
                            <TbCategoryMinus />
                            {productSale?.data.result?.category.name}
                        </Link>
                        <p className='text-[14px] text-gray-600'>{productSale?.data.result?.product_name}</p>
                    </Breadcrumbs>
                </div>
                <div className=''>
                    <div className='bg-white p-4'>
                        <div className='container'>
                            <div className='grid grid-cols-1 md:grid-cols-12 gap-9'>
                                <div className='w-full md:col-span-5'>
                                    <div
                                        onMouseMove={handleZoom}
                                        onMouseLeave={handleRemoveZoom}
                                        onClick={() => openImageViewer(currentIndexImages[0])}
                                        className='relative w-full  cursor-zoom-in overflow-hidden pt-[100%]'
                                    >
                                        <img
                                            className='absolute top-0 left-0 h-full w-full object-cover pointer-events-none'
                                            srcSet={activeImage}
                                            alt='product'
                                            ref={imageRef}
                                        />
                                    </div>
                                    {isViewerOpen && (
                                        <ImageViewer
                                            src={listImageViews}
                                            currentIndex={currentImageView}
                                            disableScroll={true}
                                            onClose={closeImageViewer}
                                            closeComponent={<div></div>}
                                            backgroundStyle={{
                                                backgroundColor: 'rgba(0,0,0,0.9)'
                                            }}
                                            closeOnClickOutside={true}
                                        />
                                    )}
                                    <div className='relative mt-4 grid grid-cols-5 gap-1'>
                                        <button
                                            onClick={prev}
                                            className='absolute z-1 left-0 top-1/2  h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                                        >
                                            <PrevIcon />
                                        </button>
                                        {currentImages.map((img) => {
                                            const isActive = img.url === activeImage
                                            return (
                                                <div
                                                    className='relative w-full pt-[100%]'
                                                    key={img.id}
                                                    onMouseEnter={() => chooseActive(img.url as string)}
                                                >
                                                    <img
                                                        src={img.url as string}
                                                        alt={productSale?.data.result?.product_name as string}
                                                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                                                    />
                                                    {isActive && <div className='absolute inset-0 border-2 border-blue-600' />}
                                                </div>
                                            )
                                        })}

                                        <button
                                            onClick={next}
                                            className='absolute right-0 top-1/2 z-1 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                                        >
                                            <NextIcon />
                                        </button>
                                    </div>
                                </div>

                                <div className='w-full md:col-span-7'>
                                    <h1 className='text-xl text-text-primary font-medium'>
                                        {productSale?.data.result?.product_name}
                                    </h1>
                                    <div className='mt-8 flex items-center'>
                                        <div className='flex items-center'>
                                            <span className='mr-1 border-b border-b-blue-600 text-blue-600'>
                                                {isNaN(productSale?.data.result?.average_rating as number)
                                                    ? 0
                                                    : Math.ceil((productSale?.data.result?.average_rating as number) * 10) / 10}
                                            </span>
                                            <ProductRating
                                                className='gap-1'
                                                size={16}
                                                activeClassname='w-[16px] h-[16px] fill-red-500 text-red-500'
                                                nonActiveClassname='w-[16px] h-[16px] fill-current text-gray-300'
                                                rating={productSale?.data.result?.average_rating as number}
                                            />
                                        </div>
                                        <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                                        <div>
                                            <span>{productSale?.data.result?.total_sold}</span>
                                            <span className='ml-2 text-gray-500'>Đã bán</span>
                                        </div>
                                    </div>
                                    {!activeVariant && (
                                        <div className='mt-8 flex items-center bg-blue-50 px-5 py-4'>
                                            {getMinMaxPromotionPrice(productSale?.data.result as ProductSale)
                                                .minPromotionPrice !== 0 && (
                                                <div className='text-gray-500 line-through text-xl'>
                                                    {checkEqualSalePrice(productSale?.data.result as ProductSale) ? (
                                                        <span>
                                                            {formatToVND(
                                                                getMinMaxSalePrice(productSale?.data.result as ProductSale)
                                                                    .minSalePrice
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {formatToVND(
                                                                getMinMaxSalePrice(productSale?.data.result as ProductSale)
                                                                    .minSalePrice
                                                            )}
                                                            {' - '}
                                                            {formatToVND(
                                                                getMinMaxSalePrice(productSale?.data.result as ProductSale)
                                                                    .maxSalePrice
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {getMinMaxPromotionPrice(productSale?.data.result as ProductSale)
                                                .minPromotionPrice === 0 ? (
                                                <div className='ml-3 text-3xl font-medium text-blue-600'>
                                                    {checkEqualSalePrice(productSale?.data.result as ProductSale) ? (
                                                        <span>
                                                            {formatToVND(
                                                                getMinMaxSalePrice(productSale?.data.result as ProductSale)
                                                                    .minSalePrice
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {formatToVND(
                                                                getMinMaxSalePrice(productSale?.data.result as ProductSale)
                                                                    .minSalePrice
                                                            )}
                                                            {' - '}
                                                            {formatToVND(
                                                                getMinMaxSalePrice(productSale?.data.result as ProductSale)
                                                                    .maxSalePrice
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

                                            {getMinMaxPromotionPrice(productSale?.data.result as ProductSale)
                                                .minPromotionPrice !== 0 && (
                                                <div className='ml-4 rounded-sm bg-blue-600 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                                                    20% giảm
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeVariant && (
                                        <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
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
                                    <div className='mt-8 flex items-center'>
                                        <span className='capitalize text-gray-500 w-[110px]'>Vận chuyển</span>
                                        <img
                                            className='w-[120px] object-cover'
                                            src='https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-VN.png'
                                            alt=''
                                        />
                                    </div>
                                    <div className='mt-8 flex items-baseline'>
                                        <span className='capitalize text-gray-500 w-[110px]'>Màu</span>
                                        <div className='flex items-center flex-wrap'>
                                            {colors.length > 0 &&
                                                colors.map((color) => (
                                                    <button
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
                                    <div className='mt-10 flex items-center'>
                                        <div className='capitalize text-gray-500 mr-1'>Số lượng</div>
                                        <QuantityController
                                            onDecrease={handleBuyCount}
                                            onIncrease={handleBuyCount}
                                            onType={handleBuyCount}
                                            value={buyCount}
                                            max={100}
                                        />
                                        {activeVariant?.warehouse.available_quantity && (
                                            <div className='ml-6 text-sm text-gray-500'>
                                                {activeVariant?.warehouse.available_quantity} sản phẩm có sẵn
                                            </div>
                                        )}
                                    </div>
                                    <div className='mt-12 flex items-center'>
                                        <MyButton
                                            onClick={handleAddToCart}
                                            className='h-12 rounded-sm border border-blue-600 bg-blue-50 px-5 shadow-sm hover:bg-blue-50'
                                        >
                                            <AddToCartIcon />
                                            Thêm vào giỏ hàng
                                        </MyButton>

                                        <MyButton
                                            onClick={handleByNow}
                                            className='ml-4 h-12  rounded-sm bg-blue-600 px-12 text-white shadow-sm outline-none hover:bg-blue-500 transition-all'
                                        >
                                            Mua ngay
                                        </MyButton>
                                    </div>
                                    <div className='mt-8 pb-6 border-t border-gray-100'>
                                        <div className='flex items-center gap-10 mt-6'>
                                            <div className='text-[16px] text-gray-500 capitalize flex items-center gap-2'>
                                                <BsPatchCheck className='text-blue-600' />
                                                Hàng chất lượng 100%
                                            </div>
                                            <div className='text-[16px] text-gray-500 capitalize flex items-center gap-2'>
                                                <FaShippingFast className='text-blue-600' />
                                                Miễn phí vận chuyển
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 text-text-primary mt-4'>
                        <h2 className='uppercase bg-gray-100 p-4 text-[15px]'>Chi tiết sản phẩm</h2>
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
            <Container style={{ padding: '0' }}>
                <div className='my-6 bg-white'>
                    <Review productSale={productSale?.data.result as ProductSale} />
                </div>
            </Container>
            <div className='text-text-primary'>
                <ProductFeatured title='Sản phẩm liên quan'></ProductFeatured>
            </div>
        </Fragment>
    )
}
