import { useState } from 'react'
import { IoChevronDownSharp, IoChevronUp } from 'react-icons/io5'

export default function MySelect() {
    const [openSelectPrice, setOpenSelectPrice] = useState<boolean>(false)
    return (
        <section>
            <div className='relative ml-4'>
                <button
                    type='button'
                    role='combobox'
                    aria-controls='radix-0'
                    aria-expanded='false'
                    aria-autocomplete='none'
                    dir='ltr'
                    data-state='closed'
                    onClick={() => setOpenSelectPrice(!openSelectPrice)}
                    data-placeholder
                    className='sort-price-select text-text-primary text-[14px]'
                >
                    <span style={{ pointerEvents: 'none' }}>Giá</span>
                    {openSelectPrice ? (
                        <IoChevronUp className='mr-3' fontSize='15px' />
                    ) : (
                        <IoChevronDownSharp className='mr-3' fontSize='15px' />
                    )}
                </button>
                {openSelectPrice && (
                    <div className='absolute top-full left-0 right-0 bg-white text-text-primary text-[14px] border border-t-gray-100'>
                        <div className='flex flex-col gap-3 p-4 sort-price-content'>
                            <p>Giá: Thấp đến cao</p>
                            <p>Giá: Cao đến thấp</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
