import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { produce } from 'immer'
import { Link } from 'react-router-dom'
import MyButton from '~/components/MyButton'
import MyButtonV2 from '~/components/MyButtonV2'
import QuantityController from '~/components/QuantityController'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { formatToVND } from '~/utils/helpers'
import useSetTitle from '~/hooks/useSetTitle'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import cartsService from '~/services/carts.service'
import { Cart } from '~/@types/cart.type'

type ExtendedCartType = Cart & {
    disabled: boolean
    checked: boolean
}

export default function CartList() {
    useSetTitle('Giỏ hàng')
    const [extendedCart, setExtendedCart] = useState<ExtendedCartType[]>([])
    const { data: productsInCart } = useQuery({
        queryKey: ['productsInCart'],
        queryFn: () => cartsService.getAllProductFromCarts(),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (productsInCart?.data.result) {
            setExtendedCart(
                productsInCart?.data.result.map((item) => ({
                    ...item,
                    disabled: false,
                    checked: false
                })) || []
            )
        }
    }, [productsInCart])

    const handleChecked = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setExtendedCart(
            produce((draft) => {
                draft[index].checked = e.target.checked
            })
        )
    }

    const isAllChecked = extendedCart.every((item) => item.checked)

    const handleCheckAll = () => {
        setExtendedCart((prev) =>
            prev.map((item) => ({
                ...item,
                checked: !isAllChecked
            }))
        )
    }
    return (
        <Container style={{ padding: '0' }}>
            <div className='bg-neutral-100 py-5'>
                <div className='container'>
                    <>
                        <div className='overflow-auto'>
                            <div className='min-w-[1000px]'>
                                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                                    <div className='col-span-6'>
                                        <div className='flex items-center'>
                                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                                <input
                                                    onChange={handleCheckAll}
                                                    checked={isAllChecked}
                                                    type='checkbox'
                                                    className='h-4 w-4 accent-blue-600'
                                                />
                                            </div>
                                            <div className='flex-grow text-text-primary mt-[2px] w-[80%]'>Sản phẩm</div>
                                            <div className='flex-grow text-text-primary mt-[2px] w-[20%]'>Phân loại</div>
                                        </div>
                                    </div>
                                    <div className='col-span-6'>
                                        <div className='grid grid-cols-5 text-center'>
                                            <div className='col-span-2'>Đơn giá</div>
                                            <div className='col-span-1'>Số lượng</div>
                                            <div className='col-span-1'>Số tiền</div>
                                            <div className='col-span-1'>Thao tác</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='my-3 rounded-sm bg-white p-5 shadow'>
                                    {extendedCart &&
                                        extendedCart.length > 0 &&
                                        extendedCart.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                                            >
                                                <div className='col-span-6 flex'>
                                                    <div className='flex w-[80%]'>
                                                        <div className='flex flex-shrink-0 items-center justify-center pr-6'>
                                                            <input
                                                                checked={item.checked}
                                                                onChange={handleChecked(index)}
                                                                type='checkbox'
                                                                className='h-4 w-4 accent-blue-600'
                                                            />
                                                        </div>
                                                        <div className='flex-grow'>
                                                            <div className='flex'>
                                                                <Link className='h-20 w-20 flex-shrink-0' to={`123`}>
                                                                    <img
                                                                        alt={item?.variant.product_name}
                                                                        src={item?.variant.product_images[0]?.url}
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
                                                    <div className='w-[20%] text-left text-[14px] text-blue-600 py-[4px]'>
                                                        <div className=''>
                                                            {item.variant.size}, {item.variant.color}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-span-6'>
                                                    <div className='grid grid-cols-5 items-center'>
                                                        <div className='col-span-2'>
                                                            <div className='flex items-center justify-center'>
                                                                <span className='ml-3'>
                                                                    {item.variant?.current_price_plan?.sale_price
                                                                        ? formatToVND(
                                                                              item.variant?.current_price_plan?.sale_price
                                                                          )
                                                                        : formatToVND(
                                                                              item.variant?.current_price_plan?.promotion_price
                                                                          )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <QuantityController
                                                                max={10}
                                                                value={item.quantity}
                                                                classNameWrapper='flex items-center'
                                                            />
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <span className='text-orange'>
                                                                {item.variant?.current_price_plan?.sale_price
                                                                    ? formatToVND(
                                                                          item.quantity *
                                                                              item.variant?.current_price_plan?.sale_price
                                                                      )
                                                                    : formatToVND(
                                                                          item.quantity *
                                                                              item.variant?.current_price_plan?.promotion_price
                                                                      )}
                                                            </span>
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <MyButtonV2 color='error' variant='text'>
                                                                Xóa
                                                            </MyButtonV2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className='sticky bottom-0 z-10 mt-5  rounded-sm border border-gray-100 bg-white px-5 pb-5 shadow sm:flex-row sm:items-center'>
                            <div className='border-b-[1px] mb-2 flex items-center justify-end'>
                                <div className='py-3'>
                                    <div className='text-blue-800 text-[15px] cursor-pointer hover:text-blue-700 flex items-center'>
                                        <div className='mr-60 flex items-center gap-3'>
                                            <LiaMoneyCheckAltSolid fontSize='26px' />
                                            <span className='capitalize mt-[1px]'>Shop voucher</span>
                                        </div>
                                        <span> Chọn mã giảm giá</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex items-center'>
                                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                        <input
                                            onChange={handleCheckAll}
                                            checked={isAllChecked}
                                            type='checkbox'
                                            className='h-4 w-4 accent-blue-600'
                                        />
                                    </div>
                                    <div className='mt-[2px] flex items-center'>
                                        <MyButton className='mx-3 border-none bg-none text-text-primary text-base'>
                                            Chọn tất cả ({extendedCart.length})
                                        </MyButton>
                                        <MyButtonV2 sx={{ width: '50px', marginTop: '3px' }} color='error' variant='text'>
                                            Xóa
                                        </MyButtonV2>
                                    </div>
                                </div>

                                <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                                    <div>
                                        <div className='flex items-center sm:justify-end'>
                                            <div className='text-text-primary'>Tổng thanh toán 10 sản phẩm</div>
                                            <div className='ml-2 text-2xl text-blue-600'>{formatToVND(600000)}</div>
                                        </div>
                                    </div>
                                    <MyButton className='flex h-10 w-52 bg-blue-600 text-white ml-6'>Mua hàng</MyButton>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </Container>
    )
}
