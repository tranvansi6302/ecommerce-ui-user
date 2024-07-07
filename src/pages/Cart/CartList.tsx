import { Container } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import React, { useContext, useEffect, useMemo } from 'react'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Cart } from '~/@types/carts.type'
import MyButton from '~/components/MyButton'
import MyButtonMUI from '~/components/MyButtonMUI'
import QuantityController from '~/components/QuantityController'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import useSetTitle from '~/hooks/useSetTitle'
import cartsService from '~/services/carts.service'
import { saveCartToLS } from '~/utils/auth'
import { formatToVND } from '~/utils/helpers'

export default function CartList() {
    useSetTitle('Giỏ hàng')
    const navigate = useNavigate()
    const location = useLocation()
    const { extendedCart, setExtendedCart } = useContext(AppContext)

    // Handle by now get id
    const chooseCartDetailIdFromLocation = (location.state as { cart_detail_id: number })?.cart_detail_id

    const { data: productsInCart, refetch } = useQuery({
        queryKey: ['productsInCart'],
        queryFn: () => cartsService.getAllProductFromCarts()
    })

    useEffect(() => {
        if (productsInCart?.data.result) {
            setExtendedCart((prev) => {
                const extendedCartObj = keyBy(prev, 'id')
                return (
                    (productsInCart?.data.result &&
                        productsInCart?.data.result.map((item) => {
                            const isChooseCartFromLocation = chooseCartDetailIdFromLocation === item.id
                            return {
                                ...item,
                                disabled: false,
                                // Xu ly truong hop da check khi update lai khong check
                                checked: isChooseCartFromLocation || Boolean(extendedCartObj[item.id]?.checked)
                            }
                        })) ||
                    []
                )
            })
        }
    }, [chooseCartDetailIdFromLocation, productsInCart, setExtendedCart])

    // Clean history
    useEffect(() => {
        return () => {
            history.replaceState(null, '')
        }
    }, [])

    const handleChecked = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setExtendedCart(
            produce((draft) => {
                draft[index].checked = e.target.checked
            })
        )
    }

    const isAllChecked = useMemo(() => extendedCart.every((item) => item.checked), [extendedCart])

    const handleCheckAll = () => {
        setExtendedCart((prev) =>
            prev.map((item) => ({
                ...item,
                checked: !isAllChecked
            }))
        )
    }

    // Update
    const updateProductFromCartMutation = useMutation({
        mutationFn: (body: { cartDetailId: number; quantity: number }) => cartsService.updateProductFromCart(body),
        onSuccess: () => {
            refetch()
        }
    })

    const handleQuantity = (index: number, value: number, enable: boolean) => {
        if (enable) {
            const cartDetail = extendedCart[index]
            setExtendedCart(
                produce((draft) => {
                    draft[index].disabled = true
                })
            )
            updateProductFromCartMutation.mutate({
                cartDetailId: cartDetail.id,
                quantity: value
            })
        }
    }

    // <=> (value) => handleTypeQuantity(index,value)
    const handleTypeQuantity = (index: number) => (value: number) => {
        setExtendedCart(
            produce((draft) => {
                draft[index].quantity = value
            })
        )
    }

    const checkedCarts = useMemo(() => extendedCart.filter((item) => item.checked), [extendedCart])
    const checkedCartCount = checkedCarts.length
    const totalCheckedCart = useMemo(() => {
        return checkedCarts.reduce((acc, item) => {
            // Ensure we have a valid price, defaulting to 0 if not available
            const price = item.variant?.current_price_plan?.sale_price
                ? item.variant.current_price_plan.sale_price
                : item.variant?.current_price_plan?.promotion_price ?? 0
            const quantity = typeof item.quantity === 'number' ? item.quantity : 0
            return acc + price * quantity
        }, 0)
    }, [checkedCarts])

    // Handle delete
    const deleteProductFromCartMutation = useMutation({
        mutationFn: (body: { cart_detail_ids: number[] }) => cartsService.deleteProductFromCart(body),
        onSuccess: () => {
            refetch()
        }
    })

    const handleDeleteProductFromCart = (index: number) => {
        const cartDetail = extendedCart[index]
        deleteProductFromCartMutation.mutate({
            cart_detail_ids: [cartDetail.id]
        })
    }

    const handleDeleteManyProductFromCart = () => {
        const cartDetailIds = checkedCarts.map((item) => item.id)
        deleteProductFromCartMutation.mutate({
            cart_detail_ids: cartDetailIds
        })
    }

    const handlePurchase = () => {
        navigate(pathConfig.checkout)
        saveCartToLS(checkedCarts)
    }

    return (
        <Container style={{ padding: '0' }}>
            <div className='bg-neutral-100 py-5'>
                <div className='container'>
                    <>
                        <div className='overflow-auto'>
                            <div className='min-w-[1000px]'>
                                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500'>
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
                                            <div className='flex-grow text-text-primary mt-[2px] w-[20%] text-center'>
                                                Phân loại
                                            </div>
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

                                <div className='my-3 rounded-sm bg-white p-5'>
                                    {extendedCart &&
                                        extendedCart.length > 0 &&
                                        extendedCart.map((item, index) => {
                                            const promotionPrice = item.variant?.current_price_plan?.promotion_price
                                            const salePrice = item.variant?.current_price_plan?.sale_price
                                            return (
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
                                                        <div className='w-[20%] flex items-center justify-center text-[14px] text-blue-600 py-[4px]'>
                                                            <div className=''>
                                                                {item.variant.size}, {item.variant.color}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-span-6'>
                                                        <div className='grid grid-cols-5 items-center'>
                                                            <div className='col-span-2'>
                                                                <div className='flex items-center justify-center'>
                                                                    {promotionPrice && (
                                                                        <span className='line-through text-gray-400 font-normal'>
                                                                            {formatToVND(promotionPrice)}
                                                                        </span>
                                                                    )}
                                                                    <span className='ml-3 text-text-primary'>
                                                                        {formatToVND(salePrice)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='col-span-1'>
                                                                <QuantityController
                                                                    max={item.variant.warehouse.available_quantity}
                                                                    min={1}
                                                                    value={item.quantity}
                                                                    classNameWrapper='flex items-center'
                                                                    onIncrease={(value) =>
                                                                        handleQuantity(
                                                                            index,
                                                                            value,
                                                                            value <= item.variant.warehouse.available_quantity
                                                                        )
                                                                    }
                                                                    onDecrease={(value) =>
                                                                        handleQuantity(index, value, value >= 1)
                                                                    }
                                                                    disabled={item.disabled}
                                                                    onType={handleTypeQuantity(index)}
                                                                    onFocusOut={(value) =>
                                                                        handleQuantity(
                                                                            index,
                                                                            value,
                                                                            value >= 1 &&
                                                                                value <=
                                                                                    item.variant.warehouse.available_quantity &&
                                                                                value !==
                                                                                    (productsInCart?.data.result as Cart[])[index]
                                                                                        .quantity
                                                                        )
                                                                    }
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
                                                                                  item.variant?.current_price_plan
                                                                                      ?.promotion_price
                                                                          )}
                                                                </span>
                                                            </div>
                                                            <div className='col-span-1'>
                                                                <MyButtonMUI
                                                                    onClick={() => handleDeleteProductFromCart(index)}
                                                                    color='error'
                                                                    variant='text'
                                                                >
                                                                    Xóa
                                                                </MyButtonMUI>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className='sticky bottom-0 z-10 mt-5  rounded-sm border border-gray-100 bg-white px-5 pb-5  sm:flex-row sm:items-center'>
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
                                        <MyButtonMUI
                                            onClick={handleDeleteManyProductFromCart}
                                            sx={{ width: '50px', marginTop: '3px' }}
                                            color='error'
                                            variant='text'
                                        >
                                            Xóa
                                        </MyButtonMUI>
                                    </div>
                                </div>

                                <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                                    <div>
                                        <div className='flex items-center sm:justify-end'>
                                            <div className='text-text-primary'>Tổng thanh toán {checkedCartCount} sản phẩm</div>
                                            <div className='ml-2 text-2xl text-blue-600'>{formatToVND(totalCheckedCart)}</div>
                                        </div>
                                    </div>
                                    <MyButton onClick={handlePurchase} className='flex h-10 w-52 bg-blue-600 text-white ml-6'>
                                        Mua hàng
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </Container>
    )
}
