import ProductRating from '~/components/ProductRating'
import { FaStar } from 'react-icons/fa'
import MyButton from '~/components/MyButton'
import { Pagination, Stack } from '@mui/material'
export default function Review() {
    return (
        <div className='p-6'>
            <h3 className='uppercase text-[15px] text-text-primary'>Đánh giá sản phẩm</h3>
            <div className='mt-4 flex p-6 bg-blue-50'>
                <div className='w-[20%]'>
                    <div className='flex items-end gap-2 text-blue-600'>
                        <span className='font-medium text-[30px]'>4.5</span>
                        <span className='text-[18px] inline-block mb-1'>trên 5</span>
                    </div>
                    <div className='text-[20px] text-red-600 flex items-center gap-1 mt-2'>
                        {Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <FaStar key={index} />
                            ))}
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
            <div className='border-b pb-10'>
                <div className='mt-6 px-6'>
                    <div className='flex items-start gap-2'>
                        <img
                            className='w-[40px] h-[40px] object-cover rounded-full'
                            src='https://down-vn.img.susercontent.com/file/baa22179e7d4f71c7673cffd2b7eba3b'
                            alt=''
                        />
                        <div className=''>
                            <p className='text-text-primary text-[13px]'>Trần Văn Sĩ</p>
                            <div className='mt-1'>
                                <ProductRating
                                    className='gap-1'
                                    size={13}
                                    activeClassname='w-[13px] h-[13px] fill-red-500 text-red-500'
                                    nonActiveClassname='w-[13px] h-[13px] fill-current text-gray-300'
                                    rating={5}
                                />
                            </div>
                            <div className='flex items-center text-[12px] text-gray-500 mt-2'>
                                <div>12/12/2022</div>
                                <div className='w-[0.5px] h-[12px] bg-gray-500 mx-2'></div>
                                <div className=''>Phân loại hàng: XXL - Trắng</div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 ml-12'>
                        <p className='text-[14px] text-text-primary'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur esse inventore suscipit deleniti,
                            incidunt unde harum nesciunt praesentium expedita doloremque ducimus vel? Obb doloremque ducimus vel?
                            Obb
                        </p>
                        <div className='mt-4 flex items-center gap-3'>
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-b pb-10'>
                <div className='mt-6 px-6'>
                    <div className='flex items-start gap-2'>
                        <img
                            className='w-[40px] h-[40px] object-cover rounded-full'
                            src='https://down-vn.img.susercontent.com/file/baa22179e7d4f71c7673cffd2b7eba3b'
                            alt=''
                        />
                        <div className=''>
                            <p className='text-text-primary text-[13px]'>Trần Văn Sĩ</p>
                            <div className='mt-1'>
                                <ProductRating
                                    className='gap-1'
                                    size={13}
                                    activeClassname='w-[13px] h-[13px] fill-red-500 text-red-500'
                                    nonActiveClassname='w-[13px] h-[13px] fill-current text-gray-300'
                                    rating={5}
                                />
                            </div>
                            <div className='flex items-center text-[12px] text-gray-500 mt-2'>
                                <div>12/12/2022</div>
                                <div className='w-[0.5px] h-[12px] bg-gray-500 mx-2'></div>
                                <div className=''>Phân loại hàng: XXL - Trắng</div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 ml-12'>
                        <p className='text-[14px] text-text-primary'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur esse inventore suscipit deleniti,
                            incidunt unde harum nesciunt praesentium expedita doloremque ducimus vel? Obb doloremque ducimus vel?
                            Obb
                        </p>
                        <div className='mt-4 flex items-center gap-3'>
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                            <img
                                className='w-[74px] h-[74px] object-cover'
                                src='https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lqra7aohzwvr8a.webp'
                                alt='product'
                            />
                        </div>
                    </div>
                </div>
            </div>
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
