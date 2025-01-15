import { Stack } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment } from 'react/jsx-runtime'
import { ProductSaleFilters } from '~/@types/productSales.type'
import Panigation from '~/components/Pagination/Panigation'
import ProductItem from '~/components/ProductItem'
import useQueryProductSales from '~/hooks/useQueryProductSales'
import useSetTitle from '~/hooks/useSetTitle'
import productSalesService from '~/services/productSales.service'
import ProductFeatured from '../../components/ProductFeatured'
import Banner from './components/Banner'
import BrandList from './components/BrandList'
import CategoryList from './components/CategoryList'

export default function ProductHome() {
    useSetTitle('Trang chủ')
    const queryConfig = useQueryProductSales()
    const { data: productSales, isLoading } = useQuery({
        queryKey: ['productSales', queryConfig],
        queryFn: () => productSalesService.getAllProductSales(queryConfig as ProductSaleFilters),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })
    const pageSize = productSales?.data.pagination.total_page
    // Lấy sản phẩm bán chạy từ lớn đến bé theo total_sold
    const productSalesTop = productSales?.data.result
        ?.filter((product) => product.total_sold) // Lọc ra sản phẩm có total_sold
        .sort((a, b) => b.total_sold - a.total_sold) // Sắp xếp từ lớn đến bé theo total_sold

    return (
        <Fragment>
            <Banner />
            <CategoryList />
            <BrandList />

            <div className='pb-20'>
                <ProductFeatured title='Top sản phẩm bán chạy' className='mt-8'>
                    <ProductItem loading={isLoading} productSales={productSalesTop} />
                </ProductFeatured>
                <ProductFeatured title='Tất cả sản phẩm' className='mt-8'>
                    <ProductItem loading={isLoading} productSales={productSales?.data.result} />
                </ProductFeatured>
                <div className='mt-16 flex items-center justify-center'>
                    <Stack spacing={2}>
                        <Panigation pageSize={pageSize as number} queryConfig={queryConfig} />
                    </Stack>
                </div>
            </div>
        </Fragment>
    )
}
