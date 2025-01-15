import classNames from 'classnames'
import { FaCaretRight } from 'react-icons/fa'
import { Link, createSearchParams } from 'react-router-dom'
import { Brand } from '~/@types/brands.type'
import { Category } from '~/@types/categories.type'
import pathConfig from '~/configs/path.config'
import { QueryConfig } from '~/hooks/useQueryProductSales'

type AsidebarFilterByDataProps = {
    title: string
    filterData: Category[] | Brand[]
    queryConfig: QueryConfig
    filterType: 'category' | 'brand'
}

export default function AsidebarFilterByData({ title, filterData, queryConfig, filterType }: AsidebarFilterByDataProps) {
    return (
        <div className='filter-wrap'>
            <h4>
                <span className='text-text-primary capitalize'>{title}</span>
            </h4>
            <ul>
                {filterData &&
                    filterData.length > 0 &&
                    filterData.map((item) => {
                        const isActive = queryConfig[filterType] === item.slug
                        return (
                            <li key={item.id}>
                                <Link
                                    className={classNames('flex items-center gap-1 capitalize', {
                                        'text-blue-600': isActive,
                                        'text-text-primary ': !isActive
                                    })}
                                    to={{
                                        pathname: pathConfig.productFilters,
                                        search: createSearchParams({
                                            ...queryConfig,
                                            page: '1',
                                            ...(filterType === 'category' && { category: item.slug }),
                                            ...(filterType === 'brand' && { brand: item.slug })
                                        }).toString()
                                    }}
                                >
                                    <FaCaretRight fontSize='12px' />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
