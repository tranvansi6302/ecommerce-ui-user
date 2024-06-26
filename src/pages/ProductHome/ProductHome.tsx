import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment } from 'react/jsx-runtime'
import ProductItem from '~/components/ProductItem'
import productSalesService from '~/services/productSales.service'
import ProductFeatured from '../../components/ProductFeatured'
import Banner from './components/Banner'
import CategoryList from './components/CategoryList'

export default function ProductHome() {
    const { data: productSales } = useQuery({
        queryKey: ['productSales'],
        queryFn: () => productSalesService.getAllProductSales(),
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
