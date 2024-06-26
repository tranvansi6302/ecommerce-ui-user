import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment } from 'react/jsx-runtime'
import ProductItem from '~/components/ProductItem'
import productSalesService from '~/services/productSales.service'
import ProductFeatured from '../../components/ProductFeatured'
import Banner from './components/Banner'
import CategoryList from './components/CategoryList'
import useQueryProductSales from '~/hooks/useQueryProductSales'
import { ProductSaleFilters } from '~/@types/productSales.type'

export default function ProductHome() {
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
                <ProductFeatured title='Sản phẩm mới' className='mt-8'>
                    <ProductItem productSales={productSales?.data.result} />
                </ProductFeatured>
            </div>
        </Fragment>
    )
}
