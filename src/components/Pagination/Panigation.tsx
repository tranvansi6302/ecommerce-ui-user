import { Pagination, PaginationItem } from '@mui/material'
import { useState } from 'react'
import { Link, createSearchParams } from 'react-router-dom'

interface PanigationProps {
    pageSize: number
    queryConfig: Record<string, any>
}

export default function Panigation({ pageSize, queryConfig }: PanigationProps) {
    const [page, setPage] = useState(1)
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }
    return (
        <Pagination
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 6
            }}
            count={pageSize}
            page={page}
            onChange={handleChange}
            color='secondary'
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={{
                        pathname: '/',
                        search: createSearchParams({
                            ...queryConfig,

                            page: item.page?.toString() || '1'
                        }).toString()
                    }}
                />
            )}
        />
    )
}
