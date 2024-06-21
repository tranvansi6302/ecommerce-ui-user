import { useRoutes } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import MainLayout from '~/layouts/MainLayout'
import Login from '~/pages/Login'
import ProductDetail from '~/pages/ProductDetail'
import ProductFilter from '~/pages/ProductFilter'
import ProductHome from '~/pages/ProductHome'
import Register from '~/pages/Register'

export default function AppRouter() {
    return useRoutes([
        {
            path: pathConfig.register,
            element: <Register />
        },
        {
            path: pathConfig.login,
            element: <Login />
        },
        {
            path: pathConfig.home,
            element: (
                <MainLayout>
                    <ProductHome />
                </MainLayout>
            )
        },
        {
            path: pathConfig.productDetail,
            element: (
                <MainLayout>
                    <ProductDetail />
                </MainLayout>
            )
        },
        {
            path: pathConfig.productFilter,
            element: (
                <MainLayout>
                    <ProductFilter />
                </MainLayout>
            )
        }
    ])
}
