import { Container } from '@mui/material'
import { Fragment, useState } from 'react'
import { AddToCartIcon, NextIcon, PrevIcon } from '~/assets/svg'
import ProductFeatured from '~/components/ProductFeatured'
import tickIcon from '~/assets/images/tickIcon.png'
import ProductItem from '~/components/ProductItem'
import ProductRating from '~/components/ProductRating'
import QuantityController from '~/components/QuantityController/QuantityController'
import MyButton from '~/components/MyButton'

export default function ProductDetail() {
    const [buyCount, setBuyCount] = useState<number>(1)
    const handleBuyCount = (value: number) => {
        setBuyCount(value)
    }
    return (
        <Fragment>
            <Container>
                <div className='py-6'>
                    <div className='bg-white p-4 shadow'>
                        <div className='container'>
                            <div className='grid grid-cols-1 md:grid-cols-12 gap-9'>
                                {/* Thẻ đầu tiên */}
                                <div className='w-full md:col-span-5'>
                                    <div className='w-full'>
                                        <div className='relative w-full pt-[100%] shadow'>
                                            <img
                                                className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                                                src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lg0cvovcd52v4d'
                                                alt='product'
                                            />
                                        </div>
                                        <div className='relative mt-4 grid grid-cols-5 gap-1'>
                                            <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                                                <PrevIcon />
                                            </button>
                                            <div className='relative w-full pt-[100%]'>
                                                <img
                                                    className='absolute top-0 left-0 h-full w-full bg-white object-cover cursor-pointer'
                                                    src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lg0cvovbxotz39'
                                                    alt='product'
                                                />
                                                <div className='absolute inset-0 border-2 border-blue-700'></div>
                                            </div>
                                            <div className='relative w-full pt-[100%]'>
                                                <img
                                                    className='absolute top-0 left-0 h-full w-full bg-white object-cover cursor-pointer'
                                                    src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lg0cvovcd52v4d'
                                                    alt='product'
                                                />
                                            </div>
                                            <div className='relative w-full pt-[100%]'>
                                                <img
                                                    className='absolute top-0 left-0 h-full w-full bg-white object-cover cursor-pointer'
                                                    src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lg0cvovcd52v4d'
                                                    alt='product'
                                                />
                                            </div>
                                            <div className='relative w-full pt-[100%]'>
                                                <img
                                                    className='absolute top-0 left-0 h-full w-full bg-white object-cover cursor-pointer'
                                                    src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lg0cvovcd52v4d'
                                                    alt='product'
                                                />
                                            </div>
                                            <div className='relative w-full pt-[100%]'>
                                                <img
                                                    className='absolute top-0 left-0 h-full w-full bg-white object-cover cursor-pointer'
                                                    src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lg0cvovcd52v4d'
                                                    alt='product'
                                                />
                                            </div>
                                            <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                                                <NextIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full md:col-span-7'>
                                    <h1 className='text-xl text-text-primary font-medium'>
                                        [HOT] Loa Bluetooth Mini Loa bluetooth mini di động cầm tay 💥Đèn LED Đổi Màu💥- Tặng Kèm
                                        Dây Sạc,Công nghệ blutooth 5.0
                                    </h1>
                                    <div className='mt-8 flex items-center'>
                                        <div className='flex items-center'>
                                            <span className='mr-1 border-b border-b-blue-600 text-blue-600'>4.5</span>
                                            <ProductRating rating={5} />
                                        </div>
                                        <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                                        <div>
                                            <span>3739</span>
                                            <span className='ml-2 text-gray-500'>Đã bán</span>
                                        </div>
                                    </div>
                                    <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                                        <div className='text-gray-500 line-through text-xl'>₫50.000</div>
                                        <div className='ml-3 text-3xl font-medium text-blue-600'>₫22.300779</div>
                                        <div className='ml-4 rounded-sm bg-blue-600 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                                            20 giảm
                                        </div>
                                    </div>
                                    <div className='w-full h-[1px] bg-gray-200 mt-8'></div>
                                    <div className='mt-8 flex items-baseline'>
                                        <span className='capitalize text-gray-500 w-[110px]'>Màu</span>
                                        <div className='flex items-center flex-wrap'>
                                            <button className=' items-center justify-center bg-white border border-blue-600 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                Đỏ
                                                <div className='nkxh-v4'>
                                                    <img
                                                        alt='icon-tick-bold'
                                                        className='qx2j-qy'
                                                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/9057d6e718e722cde0e8.svg'
                                                    />
                                                </div>
                                            </button>
                                            <button className=' items-center justify-center bg-white border border-gray-200 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                Đen
                                            </button>
                                            <button className=' items-center justify-center bg-white border border-gray-200 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                Trắng
                                            </button>
                                            <button className=' items-center justify-center bg-white border border-gray-200 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                Xanh Lam
                                            </button>
                                            <button className=' items-center justify-center bg-white border border-gray-200 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                Xám Bạc
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-8 flex items-baseline'>
                                        <span className='capitalize text-gray-500 w-[110px]'>Kích thước</span>
                                        <div className='flex items-center flex-wrap'>
                                            <button className=' items-center justify-center bg-white border border-blue-600 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                M
                                                <div className='nkxh-v4'>
                                                    <img alt='icon' className='qx2j-qy' src={tickIcon} />
                                                </div>
                                            </button>
                                            <button className=' items-center justify-center bg-white border border-gray-200 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                M
                                            </button>
                                            <button className=' items-center justify-center bg-white border border-gray-200 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                M
                                            </button>
                                            <button className=' items-center justify-center bg-white border border-gray-200 rounded-sm box-border text-black text-opacity-80 cursor-pointer inline-flex m-1 min-h-[2.5rem] min-w-[5rem] outline-none overflow-visible p-2 relative text-left break-words'>
                                                M
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-8 flex items-center'>
                                        <div className='capitalize text-gray-500'>Số lượng</div>
                                        <QuantityController
                                            onDecrease={handleBuyCount}
                                            onIncrease={handleBuyCount}
                                            onType={handleBuyCount}
                                            value={buyCount}
                                            max={100}
                                        />
                                        <div className='ml-6 text-sm text-gray-500'>100 sản phẩm có sẵn</div>
                                    </div>
                                    <div className='mt-8 flex items-center'>
                                        <MyButton className='h-12 rounded-sm border border-blue-600 bg-blue-50 px-5 shadow-sm hover:bg-blue-50'>
                                            <AddToCartIcon />
                                            Thêm vào giỏ hàng
                                        </MyButton>

                                        <MyButton className='ml-4 h-12  rounded-sm bg-blue-600 px-12 text-white shadow-sm outline-none hover:bg-blue-500 transition-all'>
                                            Mua ngay
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white shadow p-6 text-text-primary mt-4'>
                        <h2 className='uppercase bg-gray-100 p-4 text-[18px]'>Chi tiết sản phẩm</h2>
                        <div className='leading-10 p-6'>
                            Bộ Đồ Nam Mặc Nhà Cotton Chất Tổ Ong Mềm Mịn, Bộ Thể Thao Nam Co Giãn Thoải Mái BO09 - PROMAN Thông
                            tin sản phẩm Bộ thể thao nam - Bộ thể thao nam được thiết kế theo đúng form chuẩn của nam giới Việt
                            Nam - Sản phẩm Bộ thể thao nam chính là mẫu thiết kế mới nhất cho mùa hè này - Chất liệu: Xốp tổ ong
                            mềm mịn, co dãn 4 chiểu cao cấp (thoáng mát, thấm hút mồ hôi) - Đem lại sự thoải mái tiện lợi nhất cho
                            người mặc Hướng dẫn sử dụng Bộ thể thao nam - Đối với sản phẩm quần áo mới mua về, nên giặt tay lần
                            đầu tiên để tránh phai màu sang quần áo khác - Khi giặt nên lộn mặt trái ra để đảm bảo độ bền của hình
                            in/decal - Sản phẩm phù hợp cho giặt máy/giặt tay BẢNG TƯ VẤN SIZE ĐỒ BỘ THỂ THAO NAM BO09 - SIZE M :
                            45 - 57 Kg - SIZE L: 57 - 65 Kg - SIZE XL: 65 - 73 Kg (Khách lấy inbox shop nhé) Bảng size phù hợp 90%
                            khách hàng. Nếu bạn không chắc chắn thì inbox shop tư vấn ạ Lưu ý ĐỒ BỘ NAM TỔ ONG THỂ THAO NAM BO09:
                            - Nếu chưa chắc chắn về chọn size sản phẩm - Nếu khách form người không cân đối (Béo, gầy, thấp...) -
                            Nếu khách thích mặc ôm body hoặc mặc rộng thoải mái INBOX trực tiếp cho shop để được tư vấn size nhé
                            Chế độ bảo hành - Tất cả các sản phẩm đều được shop bảo hành - Đối với sản phẩm lỗi/đơn hàng thiếu sản
                            phẩm, quý khách vui lòng nhắn tin/gọi ngay cho shop trong vòng 3 ngày (kể từ ngày nhận đơn hàng) - Nếu
                            quá thời hạn 3 ngày kể từ ngày nhận đơn hàng, chế độ bảo hành của THE 1992 sẽ hết hiệu lực Shop cam
                            kết: Shop cam kết mang đến cho khách hàng những sản phẩm với chất lượng tốt nhất trong tầm giá Shop
                            cam kết chính sách bảo hành tốt nhất (Hỗ trợ đổi size, Hỗ trợ đổi Sản phẩm lỗi) #domaconhanam
                            #do_mac_o_nha_nam #bodonammacnha #bo_do_nam_mac_nha #bodonam #dobonam #dobonamthethao #do_bo_nam
                            #bo_do_nam #do_bo_nam #bo_do_nam #do_bo_nam #do_bo_nam_bo_he #bo_do_nam_mua_he #bo_do_nam_the_thao
                            #đo_bo_nam_bo_he #bo_quan_ao_nam_mua_he #bo_the_thao_nam_mua_he #do_bo_ngan #do_bo_nam_mua_he{' '}
                        </div>
                    </div>
                </div>
            </Container>
            <div className=' text-text-primary'>
                <ProductFeatured title='Sản phẩm liên quan'>
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </ProductFeatured>
            </div>
        </Fragment>
    )
}
