import { isUndefined, omitBy } from 'lodash'
import { useMemo } from 'react'
import { OrderFilters } from '~/@types/orders.type'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
    [key in keyof OrderFilters]: string
}

export default function useQueryOrders() {
    const queryParams: QueryConfig = useQueryParams()
    const queryConfig: QueryConfig = useMemo(
        () =>
            omitBy(
                {
                    status: queryParams.status,
                    search: queryParams.search
                },
                isUndefined
            ),
        [queryParams]
    )
    return queryConfig
}
