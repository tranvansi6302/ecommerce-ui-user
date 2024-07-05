import { useQuery } from '@tanstack/react-query'
import { GoPlus } from 'react-icons/go'
import { Link } from 'react-router-dom'
import MyButton from '~/components/MyButton'
import MyButtonMUI from '~/components/MyButtonMUI'
import pathConfig from '~/configs/path.config'
import addressesService from '~/services/addresses.service'

export default function MyAddress() {
    const { data } = useQuery({
        queryKey: ['addresses'],
        queryFn: () => addressesService.getMyAddresses()
    })
    const addresses = data?.data.result
    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6 flex items-center justify-between'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Địa chỉ của tôi</h1>
                <Link to={pathConfig.accountCreateAddress}>
                    <MyButton className='rounded-sm bg-blue-600 text-white h-[40px] px-6 flex items-center gap-1'>
                        <GoPlus fontSize='22px' />
                        Thêm địa chỉ mới
                    </MyButton>
                </Link>
            </div>
            {addresses && addresses.length === 0 && <div>Chưa có địa chỉ nào</div>}
            {addresses &&
                addresses.length > 0 &&
                addresses.map((address) => (
                    <div key={address.id} className='flex justify-between py-6 border-b-[1px]'>
                        <div className='w-[60%]'>
                            <div className=' flex items-center gap-2'>
                                <div className='text-text-primary'>{address.full_name}</div>
                                <div className='w-[1px] h-4 bg-gray-200'></div>
                                <div className='text-gray-600 text-[14px] mt-0.5'>{address.phone_number}</div>
                            </div>
                            <p className='text-[14px] text-gray-500 mt-4 leading-5'>
                                {address.description}, {address.ward}, {address.district}, {address.province}
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
                ))}
        </div>
    )
}
