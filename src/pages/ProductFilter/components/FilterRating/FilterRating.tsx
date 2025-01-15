import { Link, createSearchParams } from 'react-router-dom'
import ProductRating from '~/components/ProductRating'
import pathConfig from '~/configs/path.config'
import { QueryConfig } from '~/hooks/useQueryProductSales'

type FilterRatingProps = {
    title: string
    queryConfig: QueryConfig
}

export default function FilterRating({ title, queryConfig }: FilterRatingProps) {
    return (
        <div className='filter-wrap'>
            <h4>
                <span className='text-text-primary capitalize'>{title}</span>
            </h4>
            <div className=''>
                {Array(5)
                    .fill(0)

                    .map((_, index) => {
                        const active = queryConfig.rating === (5 - index).toString()
                        return (
                            <Link
                                key={index}
                                to={{
                                    pathname: pathConfig.productFilters,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: '1',
                                        rating: (5 - index).toString()
                                    }).toString()
                                }}
                                className={`flex items-end gap-2  cursor-pointer hover:opacity-95 ${active ? 'text-blue-600' : 'text-text-primary'}`}
                            >
                                <ProductRating
                                    className={`gap-1 ${index !== 0 ? 'mt-3' : false}`}
                                    size={16}
                                    activeClassname={`w-[16px] h-[16px] ${active ? 'fill-blue-600 text-blue-600' : 'fill-red-500 text-red-500'}`}
                                    nonActiveClassname='w-[16px] h-[16px] fill-current text-gray-300'
                                    rating={5 - index}
                                />
                                <span className='text-[14px] capitalize'>Trở lên</span>
                            </Link>
                        )
                    })}
            </div>
        </div>
    )
}
