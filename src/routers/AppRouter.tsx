import { useRoutes } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import Login from '~/pages/Login'
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
        }
    ])
}
