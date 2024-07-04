import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Authenticate from '~/components/Authenticate'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import AccountLayout from '~/layouts/AccountLayout'
import MainLayout from '~/layouts/MainLayout'
import CartList from '~/pages/Cart/CartList'
import Login from '~/pages/Login'
import Address from '~/pages/MyAccount/pages/Address'
import ChangePassword from '~/pages/MyAccount/pages/ChangePassword'
import Profile from '~/pages/MyAccount/pages/Profile'
import ProductDetail from '~/pages/ProductDetail'
import ProductFilter from '~/pages/ProductFilter'
import ProductHome from '~/pages/ProductHome'
import Register from '~/pages/Register'
const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)

    return isAuthenticated ? <Outlet /> : <Navigate to={pathConfig.login} />
}

const RejectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to={pathConfig.home} />
}
export default function AppRouter() {
    return useRoutes([
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
            path: pathConfig.productFilters,
            element: (
                <MainLayout>
                    <ProductFilter />
                </MainLayout>
            )
        },
        {
            path: '/authenticate',
            element: (
                <MainLayout>
                    <Authenticate />
                </MainLayout>
            )
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: pathConfig.register,
                    element: <Register />
                },
                {
                    path: pathConfig.login,
                    element: <Login />
                }
            ]
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: pathConfig.carts,
                    element: (
                        <MainLayout>
                            <CartList />
                        </MainLayout>
                    )
                },
                {
                    path: pathConfig.profile,
                    element: (
                        <AccountLayout>
                            <Profile />
                        </AccountLayout>
                    )
                },
                {
                    path: pathConfig.changePassword,
                    element: (
                        <AccountLayout>
                            <ChangePassword />
                        </AccountLayout>
                    )
                },
                {
                    path: pathConfig.address,
                    element: (
                        <AccountLayout>
                            <Address />
                        </AccountLayout>
                    )
                }
            ]
        }
    ])
}
