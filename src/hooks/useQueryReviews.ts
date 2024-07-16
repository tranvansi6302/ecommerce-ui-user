import { isUndefined, omitBy } from 'lodash'
import { useMemo } from 'react'
import { ReviewFilters } from '~/@types/reviews.type'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
    [key in keyof ReviewFilters]: string
}

export default function useQueryReviews() {
    const queryParams: QueryConfig = useQueryParams()
    const queryConfig: QueryConfig = useMemo(
        () =>
            omitBy(
                {
                    page: queryParams.page || '1',
                    limit: queryParams.limit || '2',
                    rating: queryParams.rating
                },
                isUndefined
            ),
        [queryParams]
    )
    return queryConfig
}
