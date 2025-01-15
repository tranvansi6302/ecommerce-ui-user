import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'
import { ProductSaleFilters } from '~/@types/productSales.type'
import { useMemo } from 'react'

export type QueryConfig = {
    [key in keyof ProductSaleFilters]: string
}

export default function useQueryProductSales() {
    const queryParams: QueryConfig = useQueryParams()
    const queryConfig: QueryConfig = useMemo(
        () =>
            omitBy(
                {
                    brand: queryParams.brand,
                    category: queryParams.category,
                    page: queryParams.page || '1',
                    limit: queryParams.limit || '12',
                    sort_order: queryParams.sort_order || 'desc',
                    sort_by: queryParams.sort_by,
                    rating: queryParams.rating,
                    min_price: queryParams.min_price,
                    max_price: queryParams.max_price,
                    search: queryParams.search
                },
                isUndefined
            ),
        [queryParams]
    )
    return queryConfig
}
