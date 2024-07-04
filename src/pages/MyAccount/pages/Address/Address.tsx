import { GoPlus } from 'react-icons/go'
import MyButton from '~/components/MyButton'
import MyButtonMUI from '~/components/MyButtonMUI'

export default function Address() {
    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6 flex items-center justify-between'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Địa chỉ của tôi</h1>
                <MyButton className='rounded-sm bg-blue-600 text-white h-[40px] px-6 flex items-center gap-1'>
                    <GoPlus fontSize='22px' />
                    Thêm địa chỉ mới
                </MyButton>
            </div>
            <div className='flex justify-between py-6 border-b-[1px]'>
                <div className='w-[60%]'>
                    <div className=' flex items-center gap-2'>
                        <div className='text-text-primary'>Trần Văn Sĩ</div>
                        <div className='w-[1px] h-4 bg-gray-200'></div>
                        <div className='text-gray-600 text-[14px] mt-0.5'>0369060306</div>
                    </div>
                    <p className='text-[14px] text-gray-500 mt-4 leading-5'>
                        Ngay Chung Cư - Nhà Trọ Bình Điền Lam, Đoàn Nguyễn Tuấn, Ấp 2 Xã Hưng Long, Huyện Bình Chánh, TP. Hồ Chí
                        Minh
                    </p>
                </div>
                <div className='flex flex-col items-end gap-4 w-[60%] text-[14px]'>
                    <div className='flex items-center gap-4'>
                        <button className='capitalize text-blue-600 hover:text-blue-500'>Cập nhật</button>
                        <div className='w-[1px] h-4 bg-gray-200'></div>
                        <button className='capitalize text-red-600 hover:text-red-500'>Xóa</button>
                    </div>
                    <MyButtonMUI
                        variant='outlined'
                        sx={{
                            width: '180px',
                            fontSize: '14px',
                            textTransform: 'capitalize',
                            height: '32px',
                            borderRadius: '2px'
                        }}
                    >
                        Thiết lập mặc định
                    </MyButtonMUI>
                </div>
            </div>
            <div className='flex justify-between py-6 border-b-[1px]'>
                <div className='w-[60%]'>
                    <div className=' flex items-center gap-2'>
                        <div className='text-text-primary'>Trần Văn Sĩ</div>
                        <div className='w-[1px] h-4 bg-gray-200'></div>
                        <div className='text-gray-600 text-[14px] mt-0.5'>0369060306</div>
                    </div>
                    <p className='text-[14px] text-gray-500 mt-4 leading-5'>
                        Ngay Chung Cư - Nhà Trọ Bình Điền Lam, Đoàn Nguyễn Tuấn, Ấp 2 Xã Hưng Long, Huyện Bình Chánh, TP. Hồ Chí
                        Minh
                    </p>
                </div>
                <div className='flex flex-col items-end gap-4 w-[60%] text-[14px]'>
                    <div className='flex items-center gap-4'>
                        <button className='capitalize text-blue-600 hover:text-blue-500'>Cập nhật</button>
                        <div className='w-[1px] h-4 bg-gray-200'></div>
                        <button className='capitalize text-red-600 hover:text-red-500'>Xóa</button>
                    </div>

                    <MyButtonMUI
                        variant='outlined'
                        sx={{
                            width: '180px',
                            fontSize: '14px',
                            textTransform: 'capitalize',
                            height: '32px',
                            borderRadius: '2px'
                        }}
                    >
                        Thiết lập mặc định
                    </MyButtonMUI>
                </div>
            </div>
        </div>
    )
}
