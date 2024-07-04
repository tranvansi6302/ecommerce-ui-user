import 'react-datepicker/dist/react-datepicker.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Fragment } from 'react/jsx-runtime'

import AppRouter from './routers/AppRouter'

export default function App() {
    const appRouter = AppRouter()

    return (
        <Fragment>
            {appRouter}
            <ToastContainer autoClose={1500} position='top-center' />
        </Fragment>
    )
}
