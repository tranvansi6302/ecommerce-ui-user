import { Pagination, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ProductSale } from '~/@types/productSales.type'
import { Review as ReviewType } from '~/@types/reviews.type'
import MyButton from '~/components/MyButton'
import ProductRating from '~/components/ProductRating'
import reviewsService from '~/services/reviews.service'
import { formatDate } from '~/utils/helpers'
import avatarDefault from '~/assets/images/avatarDefault.png'
type ReviewProps = {
    productSale: ProductSale
}

export default function Review({ productSale }: ReviewProps) {
    const { data } = useQuery({
        queryKey: ['reviews', productSale?.product_id],
        queryFn: () => reviewsService.getReviewsByProductId(Number(productSale?.product_id)),
        enabled: !!productSale?.product_id
    })
    const reviews = data?.data.result as ReviewType[]
    return (
        <div className='p-6'>
            <h3 className='uppercase text-[15px] text-text-primary'>Đánh giá sản phẩm</h3>
            <div className='mt-4 flex p-6 bg-blue-50'>
                <div className='w-[20%]'>
                    <div className='flex items-end gap-2 text-blue-600'>
                        <span className='font-medium text-[30px]'>{Math.ceil(productSale?.average_rating * 10) / 10}</span>
                        <span className='text-[18px] inline-block mb-1'>trên 5</span>
                    </div>
                    <div className='text-[20px] text-red-600 flex items-center gap-1 mt-2'>
                        <ProductRating
                            className='gap-1'
                            size={20}
                            activeClassname='w-[20px] h-[20px] fill-red-500 text-red-500'
                            nonActiveClassname='w-[20px] h-[20px] fill-current text-gray-300'
                            rating={productSale?.average_rating}
                        />
                    </div>
                </div>
                <div className='w-[80%] flex items-center gap-2'>
                    <MyButton className='w-[120px] h-[32px] bg-white border'>Tất cả</MyButton>
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <MyButton
                                key={index}
                                className='w-[120px] h-[32px] bg-white border border-[#00000017]  capitalize'
                            >{`${index + 1} sao`}</MyButton>
                        ))}
                </div>
            </div>
            {reviews &&
                reviews.length > 0 &&
                reviews.map((review) => (
                    <div key={review.id} className='border-b pb-6'>
                        <div className='mt-6 px-6'>
                            <div className='flex items-start gap-2'>
                                {review?.user?.avatar ? (
                                    <img
                                        className='w-[40px] h-[40px] object-cover rounded-full'
                                        src={review?.user?.avatar}
                                        alt={review?.user?.full_name}
                                    />
                                ) : (
                                    <img
                                        className='w-[40px] h-[40px] object-cover rounded-full'
                                        src={avatarDefault}
                                        alt='default'
                                    />
                                )}
                                <div className=''>
                                    <p className='text-text-primary text-[13px]'>{review?.user?.full_name}</p>
                                    <div className='mt-1'>
                                        <ProductRating
                                            className='gap-1'
                                            size={13}
                                            activeClassname='w-[13px] h-[13px] fill-red-500 text-red-500'
                                            nonActiveClassname='w-[13px] h-[13px] fill-current text-gray-300'
                                            rating={review?.rating}
                                        />
                                    </div>
                                    <div className='flex items-center text-[12px] text-gray-500 mt-2'>
                                        <div>{formatDate(review.created_at)}</div>
                                        <div className='w-[0.5px] h-[12px] bg-gray-500 mx-2'></div>
                                        <div className=''>
                                            Phân loại hàng: {review?.variant?.size.toUpperCase()} -{' '}
                                            {review?.variant?.color.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 ml-12'>
                                <p className='text-[14px] text-text-primary'>{review.comment}</p>
                                <div className='mt-4 flex items-center gap-3'>
                                    {review?.review_images &&
                                        review?.review_images.length > 0 &&
                                        review?.review_images.map((image) => (
                                            <img
                                                key={image.url}
                                                className='w-[74px] h-[74px] object-cover'
                                                src={image?.url}
                                                alt={image?.url}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            <div className='pb-10'>
                <div className='mt-16 flex items-center justify-center'>
                    <Stack spacing={2}>
                        <Pagination count={10} color='primary' />
                    </Stack>
                </div>
            </div>
        </div>
    )
}
