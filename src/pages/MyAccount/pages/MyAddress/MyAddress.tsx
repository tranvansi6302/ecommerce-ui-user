import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import noAddress from '~/assets/images/noAddress.png'
import ConfirmDialog from '~/components/ConfirmDialog'
import MyButton from '~/components/MyButton'
import MyButtonMUI from '~/components/MyButtonMUI'
import { AppContext } from '~/contexts/app.context'
import addressesService from '~/services/addresses.service'

export default function MyAddress() {
    const { setGlobalOpenAddessDialog } = useContext(AppContext)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [addressId, setAddressId] = useState<number>(0)
    const { data, refetch } = useQuery({
        queryKey: ['addresses'],
        queryFn: () => addressesService.getMyAddresses()
    })
    const addresses = data?.data.result

    // Delete address
    const deleteAddressMutation = useMutation({
        mutationFn: (body: { address_id: number }) => addressesService.deleteAddress(body)
    })
    const onRemove = (id: number) => {
        setOpenConfirmDialog(true)
        setAddressId(id)
    }
    const handleConfirm = () => {
        deleteAddressMutation.mutate(
            { address_id: addressId },
            {
                onSuccess: () => {
                    refetch()
                    setOpenConfirmDialog(false)
                    setAddressId(0)
                }
            }
        )
    }

    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <ConfirmDialog
                title='Bạn có muốn xóa địa chỉ này?'
                description='Sau khi xóa sẽ không thể khôi phục lại!'
                onConfirm={handleConfirm}
                open={openConfirmDialog}
                setOpen={setOpenConfirmDialog}
            />
            <div className='border-b border-b-gray-200 py-6 flex items-center justify-between'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>Địa chỉ của tôi</h1>

                <MyButton
                    onClick={() => setGlobalOpenAddessDialog(true)}
                    className='rounded-sm bg-blue-600 text-white h-[40px] px-6 flex items-center gap-1'
                >
                    <GoPlus fontSize='22px' />
                    Thêm địa chỉ mới
                </MyButton>
            </div>
            {addresses && addresses.length === 0 && (
                <div className=' bg-white p-10 flex items-center justify-center'>
                    <div className='w-[250px] h-[250px]'>
                        <img className='w-full h-full object-cover' src={noAddress} alt='address' />
                        <p className='text-gray-500 capitalize text-[14px]'>Chưa có địa chỉ nào được thêm</p>
                    </div>
                </div>
            )}
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
                                <button
                                    onClick={() => onRemove(address.id)}
                                    className='capitalize text-red-600 hover:text-red-500'
                                >
                                    Xóa
                                </button>
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
