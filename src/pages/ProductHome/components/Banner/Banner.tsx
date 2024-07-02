import { Container } from '@mui/material'
import MyButton from '~/components/MyButton'

export default function Banner() {
    return (
        <section className='py-10'>
            <Container style={{ padding: '0' }}>
                <div className='-mx-4 flex flex-wrap'>
                    <div className='w-full px-4 lg:w-8/12'>
                        <div className='relative mb-8 h-[370px] md:h-[480px]'>
                            <img
                                src='https://demo.tailgrids.com/templates/planet/build/src/assets/ecom-images/headers/header-04/image-01.jpg'
                                alt='product'
                                className='h-full w-full object-cover object-center rounded-sm'
                            />
                            <div className='absolute left-0 top-0 flex h-full w-full items-center px-8 md:px-12'>
                                <div className='max-w-[420px]'>
                                    <h3>
                                        <a
                                            href='"'
                                            className='mb-5 block text-2xl font-bold text-dark hover:text-primary sm:text-4xl'
                                        >
                                            Giảm giả 30% cho các sản phẩm mới
                                        </a>
                                    </h3>
                                    <p className='mb-9 text-base text-body-color'>
                                        Từ ngày 23/06/2024 đến hết ngày 30/06/2024, giảm giá 30% cho các sản phẩm mới. Hãy nhanh
                                        tay mua
                                    </p>
                                    <MyButton
                                        type='button'
                                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 '
                                    >
                                        Khám phá ngay
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full px-4 lg:w-4/12'>
                        <div className='-mx-4 flex flex-wrap'>
                            <div className='w-full px-4 md:w-1/2 lg:w-full'>
                                <div className='relative mb-8 h-[223px]'>
                                    <img
                                        src='https://mir-s3-cdn-cf.behance.net/projects/404/6c1669170450969.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.jpg'
                                        alt='product'
                                        className='h-full w-full object-cover object-center rounded-sm'
                                    />
                                    <div className='absolute left-0 top-0 flex h-full w-full items-end justify-end p-6 sm:p-9'>
                                        <div className='max-w-[180px] text-right'>
                                            <h3></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full px-4 md:w-1/2 lg:w-full'>
                                <div className='relative mb-8 h-[223px]'>
                                    <img
                                        src='https://img.freepik.com/premium-vector/never-give-up-t-shirt-design_832611-3.jpg'
                                        alt='product'
                                        className='h-full w-full object-cover object-center rounded-sm'
                                    />
                                    <div className='absolute left-0 top-0 flex h-full w-full items-end justify-end p-6 sm:p-9'>
                                        <div className='max-w-[180px] text-right'>
                                            <h3></h3>
                                            <a href='"' className='text-base font-medium text-dark hover:text-primary'>
                                                Shop Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
