import { Container } from '@mui/material'

export default function Banner() {
    return (
        <section className='py-10 dark:bg-dark'>
            <Container style={{ padding: '0' }}>
                <div className='-mx-4 flex flex-wrap'>
                    <div className='w-full px-4 lg:w-8/12'>
                        <div className='relative mb-8 h-[370px] md:h-[480px]'>
                            <img
                                src='https://demo.tailgrids.com/templates/planet/build/src/assets/ecom-images/headers/header-04/image-01.jpg'
                                alt='product'
                                className='h-full w-full object-cover object-center'
                            />
                            <div className='absolute left-0 top-0 flex h-full w-full items-center px-8 md:px-12'>
                                <div className='max-w-[420px]'>
                                    <h3>
                                        <a
                                            href='"'
                                            className='mb-5 block text-2xl font-bold text-dark hover:text-primary sm:text-4xl'
                                        >
                                            Mega Sale Up To 50% Off For All
                                        </a>
                                    </h3>
                                    <p className='mb-9 text-base text-body-color'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare vestibulum
                                        mollis. Nam vitae augue purus. Integer ac accumsan nunc.
                                    </p>
                                    <button
                                        type='button'
                                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full px-4 lg:w-4/12'>
                        <div className='-mx-4 flex flex-wrap'>
                            <div className='w-full px-4 md:w-1/2 lg:w-full'>
                                <div className='relative mb-8 h-[223px]'>
                                    <img
                                        src='https://demo.tailgrids.com/templates/planet/build/src/assets/ecom-images/headers/header-04/image-02.jpg'
                                        alt='product'
                                        className='h-full w-full object-cover object-center'
                                    />
                                    <div className='absolute left-0 top-0 flex h-full w-full items-end justify-end p-6 sm:p-9'>
                                        <div className='max-w-[180px] text-right'>
                                            <h3>
                                                <a
                                                    href='"'
                                                    className='mb-3 block text-xl font-bold text-dark hover:text-primary xl:text-2xl'
                                                >
                                                    Summer Travel Collection
                                                </a>
                                            </h3>
                                            <a href='"' className='text-base font-medium text-dark hover:text-primary'>
                                                Discover Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full px-4 md:w-1/2 lg:w-full'>
                                <div className='relative mb-8 h-[223px]'>
                                    <img
                                        src='https://demo.tailgrids.com/templates/planet/build/src/assets/ecom-images/headers/header-04/image-03.jpg'
                                        alt='product'
                                        className='h-full w-full object-cover object-center'
                                    />
                                    <div className='absolute left-0 top-0 flex h-full w-full items-end justify-end p-6 sm:p-9'>
                                        <div className='max-w-[180px] text-right'>
                                            <h3>
                                                <a
                                                    href='"'
                                                    className='mb-3 block text-xl font-bold text-dark hover:text-primary xl:text-2xl'
                                                >
                                                    Get 30% Off On iPhone
                                                </a>
                                            </h3>
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
