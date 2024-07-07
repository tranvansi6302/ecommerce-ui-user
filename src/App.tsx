import 'react-datepicker/dist/react-datepicker.css'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Fragment } from 'react/jsx-runtime'

import AppRouter from './routers/AppRouter'

export default function App() {
    const appRouter = AppRouter()

    return (
        <Fragment>
            {appRouter}
            <ToastContainer autoClose={1200} position='top-center' transition={Flip} hideProgressBar={true} />
        </Fragment>
    )
}
