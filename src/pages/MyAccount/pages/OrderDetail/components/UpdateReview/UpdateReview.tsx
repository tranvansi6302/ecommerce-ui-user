import { Alert, Rating } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { OrderDetail } from '~/@types/orders.type'
import { Review } from '~/@types/reviews.type'
import CustomDialog from '~/components/CustomDialog'
import MultiImageUpload from '~/components/MultiImageUpload'
import MyButton from '~/components/MyButton'
import reviewsService from '~/services/reviews.service'

type UpdateReviewProps = {
    openReview: boolean
    setOpenReview: React.Dispatch<React.SetStateAction<boolean>>
    orderDetail: OrderDetail
    review: Review
}

export default function UpdateReview({ openReview, setOpenReview, orderDetail, review }: UpdateReviewProps) {
    const [valueRating, setValueRating] = useState<number | null>(1)

    const [files, setFiles] = useState<File[]>([])
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors }
    } = useForm<{ comment: string }>()

    useEffect(() => {
        if (review) {
            setValue('comment', review?.comment)
            setValueRating(review?.rating)
        }
    }, [review, setValue])

    const updateReviewMutation = useMutation({
        mutationFn: (body: { rating: number; comment: string }) => reviewsService.updateReview(review.id, body),
        onSuccess: () => {
            setOpenReview(false)
        }
    })

    const uploadImagesMutation = useMutation({
        mutationFn: (body: { id: number; data: FormData }) => reviewsService.uploadImages(body.id, body.data)
    })

    const onSubmit = handleSubmit(async (data) => {
        if (data.comment === '') {
            setError('comment', {
                type: 'manual',
                message: 'Vui lòng nhập nhận xét của bạn'
            })
        }
        const promises = []
        const finalData = {
            ...data,
            rating: valueRating as number
        }

        promises.push(updateReviewMutation.mutateAsync(finalData))

        if (files && files.length > 0) {
            const formData = new FormData()
            files.forEach((file) => {
                formData.append('files', file)
            })
            promises.push(uploadImagesMutation.mutateAsync({ id: review?.id as number, data: formData }))
        }
        await Promise.all(promises)
    })

    const handleFilesChange = (files: File[] | null) => {
        setFiles(files as File[])
    }

    return (
        <CustomDialog open={openReview} setOpen={setOpenReview}>
            <div className='w-[800px] bg-white py-6'>
                <div className='flex justify-between  border-b'>
                    <h2 className='text-gray-600 capitalize  px-6 pb-4'>Cập nhật đánh giá sản phẩm</h2>
                </div>
                <form onSubmit={onSubmit} className='px-6 overflow-hidden mt-8'>
                    <div className='flex gap-2'>
                        <img
                            className='w-[56px] h-[56px] object-cover'
                            src={orderDetail?.variant?.product_images[0].url}
                            alt={orderDetail?.variant?.variant_name}
                        />
                        <div className=''>
                            <p className='text-text-primary text-[14px]'>{orderDetail?.variant?.product_name}</p>
                            <p className='text-gray-500 text-[13px] mt-1'>
                                Phân loại: {orderDetail?.variant?.size.toUpperCase()} -{' '}
                                {orderDetail?.variant?.color.toUpperCase()}
                            </p>
                        </div>
                    </div>
                    <div className='mt-8 '>
                        <div className='flex items-center gap-6'>
                            <p className='text-[14px] text-text-primary'>Chất lượng sản phẩm</p>
                            <Rating
                                name='simple-controlled'
                                value={valueRating}
                                sx={{ color: '#DC2626' }}
                                onChange={(_, newValue) => {
                                    setValueRating(newValue)
                                }}
                            />
                        </div>
                        <div className='mt-6'>
                            <label className='text-text-primary text-[14px] inline-block mb-2' htmlFor='comment'>
                                Nhận xét của bạn
                            </label>
                            <textarea
                                {...register('comment')}
                                id='comment'
                                rows={4}
                                className={`textarea-address w-full p-5 text-[14px] 
                rounded-[4px] text-text-primary bg-white border border-[#aeaeae] ${errors.comment?.message ? 'invalid' : false}`}
                            />
                            {errors.comment && (
                                <p className='text-[12px] ml-[14px] mt-[3px] text-[#d32f2f]'>{errors.comment.message}</p>
                            )}
                        </div>
                    </div>
                    <div className='mt-6'>
                        <div className=''>
                            <p className='text-text-primary text-[14px] inline-block mb-2'>Hình ảnh đính kèm</p>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                                {review &&
                                    review?.review_images?.length > 0 &&
                                    review?.review_images?.map((image) => (
                                        <div key={image.url} className='relative p-1'>
                                            <img
                                                src={image.url}
                                                alt={image.url}
                                                className='w-full h-full object-cover border border-gray-200 rounded-md'
                                            />
                                        </div>
                                    ))}
                            </div>
                            <Alert sx={{ fontSize: '14px', marginBottom: '25px', marginTop: '25px' }} severity='warning'>
                                Lưu ý khi tải hình ảnh mới sẽ ghi đè toàn bộ ảnh cũ.
                            </Alert>
                        </div>
                        <MultiImageUpload onImagesChange={handleFilesChange} />
                    </div>
                    <div className='sticky bottom-0 px-6 bg-white py-5 flex items-center justify-end gap-2'>
                        <MyButton
                            isLoading={updateReviewMutation.isPending}
                            type='submit'
                            className='w-[140px] h-[40px] bg-blue-600 text-white rounded-sm hover:opacity-90'
                        >
                            Xác nhận
                        </MyButton>
                    </div>
                </form>
            </div>
        </CustomDialog>
    )
}
