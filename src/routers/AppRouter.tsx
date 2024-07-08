import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Authenticate from '~/components/Authenticate'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import AccountLayout from '~/layouts/AccountLayout'
import MainLayout from '~/layouts/MainLayout'
import CartList from '~/pages/Cart/CartList'
import Checkout from '~/pages/Checkout'
import Login from '~/pages/Login'
import ChangePassword from '~/pages/MyAccount/pages/ChangePassword'
import CreateAddress from '~/pages/MyAccount/pages/MyAddress/components/CreateAddress'
import MyAddress from '~/pages/MyAccount/pages/MyAddress'
import MyOrder from '~/pages/MyAccount/pages/MyOrder'
import OrderDetail from '~/pages/MyAccount/pages/OrderDetail'
import Profile from '~/pages/MyAccount/pages/Profile'
import ProductDetail from '~/pages/ProductDetail'
import ProductFilter from '~/pages/ProductFilter'
import ProductHome from '~/pages/ProductHome'
import Register from '~/pages/Register'
import ShoppingLayout from '~/layouts/ShoppingLayout'
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
                        <ShoppingLayout cartTitle='Giỏ hàng'>
                            <CartList />
                        </ShoppingLayout>
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
                    path: pathConfig.accountChangePassword,
                    element: (
                        <AccountLayout>
                            <ChangePassword />
                        </AccountLayout>
                    )
                },
                {
                    path: pathConfig.accountAddress,
                    element: (
                        <AccountLayout>
                            <MyAddress />
                        </AccountLayout>
                    )
                },
                {
                    path: pathConfig.accountCreateAddress,
                    element: (
                        <AccountLayout>
                            <CreateAddress />
                        </AccountLayout>
                    )
                },
                {
                    path: pathConfig.accountOrders,
                    element: (
                        <AccountLayout>
                            <MyOrder />
                        </AccountLayout>
                    )
                },
                {
                    path: pathConfig.accountOrderDetails,
                    element: (
                        <AccountLayout>
                            <OrderDetail />
                        </AccountLayout>
                    )
                },
                {
                    path: pathConfig.checkout,
                    element: (
                        <ShoppingLayout checkoutTitle='Thanh toán'>
                            <Checkout />
                        </ShoppingLayout>
                    )
                }
            ]
        }
    ])
}
