import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment } from 'react/jsx-runtime'
import ProductItem from '~/components/ProductItem'
import productSalesService from '~/services/productSales.service'
import ProductFeatured from '../../components/ProductFeatured'
import Banner from './components/Banner'
import CategoryList from './components/CategoryList'
import useQueryProductSales from '~/hooks/useQueryProductSales'
import { ProductSaleFilters } from '~/@types/productSales.type'
import { Pagination, Stack } from '@mui/material'
import useSetTitle from '~/hooks/useSetTitle'

export default function ProductHome() {
    useSetTitle('Trang chủ')
    const queryConfig = useQueryProductSales()
    const { data: productSales } = useQuery({
        queryKey: ['productSales', queryConfig],
        queryFn: () => productSalesService.getAllProductSales(queryConfig as ProductSaleFilters),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })

    return (
        <Fragment>
            <Banner />
            <CategoryList />

            <div className='pb-20'>
                <ProductFeatured title='Tất cả sản phẩm' className='mt-8'>
                    <ProductItem productSales={productSales?.data.result} />
                </ProductFeatured>
                <div className='mt-16 flex items-center justify-center'>
                    <Stack spacing={2}>
                        <Pagination count={10} color='primary' />
                    </Stack>
                </div>
            </div>
        </Fragment>
    )
}
