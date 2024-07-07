import { Container } from '@mui/material'
import { useState } from 'react' // Step 1
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

// Custom Next Arrow
const NextArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'blue',
                right: '10px',
                zIndex: 1,
                backgroundColor: 'transparent'
            }}
            onClick={onClick}
        />
    )
}

// Custom Prev Arrow
const PrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'blue',
                left: '10px',
                zIndex: 1,
                backgroundColor: 'transparent'
            }}
            onClick={onClick}
        />
    )
}

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,

        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

        beforeChange: (_: number, next: number) => setCurrentSlide(next), // Step 3
        customPaging: (i) => (
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: `${currentSlide === i ? '#2563eb' : '#cdcdcd'}`, // Step 4
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            ></div>
        )
    }

    return (
        <section className='py-5'>
            <Container style={{ padding: '0', position: 'relative', display: 'flex', height: '400px', gap: '10px' }}>
                <div className='w-[70%] h-full'>
                    <Slider {...settings}>
                        <img
                            className='w-full object-cover h-[400px]'
                            src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/a6/f0/8f/5d9b2d0e0fd529c2170cb1e11677a406.png.webp'
                            alt=''
                        />
                        <img
                            className='w-full object-cover h-[400px]'
                            src='https://img.lazcdn.com/us/domino/7f98e08b737fb0b9b14f5883084d3d91.jpg_2200x2200q80.jpg_.webp'
                            alt=''
                        />
                        <img
                            className='w-full object-cover h-[400px]'
                            src='https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01Japgaw1DWdggoK9pl_!!6000000000224-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp'
                            alt=''
                        />
                    </Slider>
                </div>
                <div className='w-[30%] flex flex-col h-full gap-[10px]'>
                    <div className='w-full h-1/2'>
                        <img
                            src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/a6/f0/8f/5d9b2d0e0fd529c2170cb1e11677a406.png.webp'
                            alt=''
                        />
                    </div>
                    <div className='w-full h-1/2'>
                        <img
                            src='https://salt.tikicdn.com/cache/w750/ts/tikimsp/10/56/40/23e7b0405a3ccc04ecc4f87cd982c0cb.jpg.webp'
                            alt=''
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}
