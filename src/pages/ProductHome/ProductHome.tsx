import { Fragment } from 'react/jsx-runtime'
import ProductItem from '~/components/ProductItem'
import CategoryList from './components/CategoryList'
import ProductFeatured from '../../components/ProductFeatured'
import Banner from './components/Banner'

export default function ProductHome() {
    return (
        <Fragment>
            <Banner />
            <CategoryList />
            <div className='pb-20'>
                <ProductFeatured title='Sản phẩm mới' className='mt-8'>
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </ProductFeatured>
            </div>
        </Fragment>
    )
}
