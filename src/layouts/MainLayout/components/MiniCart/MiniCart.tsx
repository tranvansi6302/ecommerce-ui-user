import { Link } from 'react-router-dom'
import { Cart } from '~/@types/cart.type'
import Popover from '~/components/Popover'
import { formatToVND } from '~/utils/helpers'
import { IoCartOutline } from 'react-icons/io5'
import noCart from '~/assets/images/noCart.png'
import pathConfig from '~/configs/path.config'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'

type MiniCartProps = {
    productsInCart: Cart[]
}

export default function MiniCart({ productsInCart }: MiniCartProps) {
    const { isAuthenticated } = useContext(AppContext)
    return (
        <Popover
            renderPopover={
                <div className='relative w-[400px]  rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                    {!isAuthenticated || productsInCart.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-14'>
                            <img className='w-[100px] h-[100px] object-cover' src={noCart} alt='noCart' />
                            <h5 className='capitalize text-text-primary mt-2'>Chưa có sản phẩm</h5>
                        </div>
                    ) : (
                        <div className='p-3'>
                            <div className='capitalize text-text-primary'>Sản phẩm mới thêm</div>
                            <div className='mt-5'>
                                {isAuthenticated &&
                                    productsInCart &&
                                    productsInCart.length > 0 &&
                                    productsInCart.slice(0, 5).map((item) => {
                                        const promotionPrice = item.variant?.current_price_plan?.promotion_price
                                        const salePrice = item.variant?.current_price_plan?.sale_price
                                        return (
                                            <div key={item.id} className='mt-2 flex py-2 hover:bg-gray-100'>
                                                <div className='flex-shrink-0'>
                                                    <img
                                                        src={item?.variant.product_images[0]?.url}
                                                        alt='product_image'
                                                        className='h-11 w-11 object-cover'
                                                    />
                                                </div>
                                                <div className='ml-2 flex-grow overflow-hidden'>
                                                    <div className='truncate'>{item.variant.variant_name}</div>
                                                </div>
                                                <div className='ml-2 flex-shrink-0'>
                                                    <span className='text-blue-600'>
                                                        {salePrice ? formatToVND(salePrice) : formatToVND(promotionPrice)}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                            <div className='mt-6 flex items-center justify-end'>
                                <Link
                                    to={pathConfig.carts}
                                    className='rounded-sm bg-blue-600 px-4 py-2 capitalize text-white hover:bg-opacity-90'
                                >
                                    Xem giỏ hàng
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            }
        >
            <Link to='/' className='relative'>
                <IoCartOutline fontSize='28px' />

                {isAuthenticated && (
                    <span className='absolute top-[-5px] left-[17px] rounded-full bg-blue-600 w-5 h-5 flex items-center justify-center text-[10px] text-white '>
                        {productsInCart && productsInCart.length > 0 ? productsInCart?.length : 0}
                    </span>
                )}
            </Link>
        </Popover>
    )
}
