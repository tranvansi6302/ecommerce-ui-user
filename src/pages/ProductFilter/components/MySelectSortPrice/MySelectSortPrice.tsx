import { useState } from 'react'
import { IoChevronDownSharp, IoChevronUp } from 'react-icons/io5'
import { Link, createSearchParams } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import { QueryConfig } from '~/hooks/useQueryProductSales'
import { FaCheck } from 'react-icons/fa6'

const dataSortPrice = [
    {
        sort: 'asc',
        text: 'Giá: Thấp đến cao'
    },
    {
        sort: 'desc',
        text: 'Giá: Cao đến thấp'
    }
]

type MySelectSortPriceProps = {
    queryConfig: QueryConfig
}
export default function MySelectSortPrice({ queryConfig }: MySelectSortPriceProps) {
    const [openSelectPrice, setOpenSelectPrice] = useState<boolean>(false)
    const sortPriceActive = dataSortPrice.find((item) => item.sort === queryConfig.sort_order && queryConfig.sort_by === 'price')

    return (
        <section>
            <div className='relative ml-4'>
                <button
                    type='button'
                    role='combobox'
                    aria-controls='radix-0'
                    aria-expanded='false'
                    aria-autocomplete='none'
                    data-state='closed'
                    onClick={() => setOpenSelectPrice(!openSelectPrice)}
                    data-placeholder
                    className='sort-price-select text-text-primary text-[14px]'
                >
                    <span className={`capitalize ${sortPriceActive && 'text-blue-600'}`} style={{ pointerEvents: 'none' }}>
                        {sortPriceActive ? sortPriceActive.text : 'Giá'}
                    </span>
                    {openSelectPrice ? (
                        <IoChevronUp className='mr-3' fontSize='15px' />
                    ) : (
                        <IoChevronDownSharp className='mr-3' fontSize='15px' />
                    )}
                </button>
                {openSelectPrice && (
                    <div className='absolute top-full left-0 right-0 bg-white text-text-primary text-[14px] border border-t-gray-100'>
                        <div className='flex flex-col gap-3 p-4 sort-price-content'>
                            {dataSortPrice.map((item, index) => (
                                <Link
                                    to={{
                                        pathname: pathConfig.productFilters,
                                        search: createSearchParams({
                                            ...queryConfig,
                                            sort_by: 'price',
                                            sort_order: item.sort
                                        }).toString()
                                    }}
                                    key={index}
                                    type='button'
                                    className='flex items-center gap-2 capitalize hover:text-blue-600'
                                    onClick={() => setOpenSelectPrice(false)}
                                >
                                    <div className='flex items-center justify-between w-full'>
                                        <span>{item.text}</span>
                                        {item.sort === queryConfig.sort_order && queryConfig.sort_by === 'price' && (
                                            <FaCheck className='text-blue-600' />
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
