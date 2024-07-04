import { Fragment } from 'react/jsx-runtime'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

import AppRouter from './routers/AppRouter'
import { useEffect } from 'react'

export default function App() {
    const appRouter = AppRouter()
    useEffect(() => {
        // console.log(import.meta.env.VITE_API_URL)
        // console.log(import.meta.env.VITE_API_GHN_URL)
        // console.log(import.meta.env.VITE_API_GHN_TOKEN)
        // console.log(import.meta.env.VITE_OAUTH2_GOOGLE_CLIENT_ID)
        // console.log(import.meta.env.VITE_OAUTH2_GOOGLE_AUTH_URI)
        // console.log(import.meta.env.VITE_OAUTH2_GOOGLE_REDIRECT_URI)
    }, [])
    return (
        <Fragment>
            {appRouter}
            <ToastContainer autoClose={1500} position='top-center' />
        </Fragment>
    )
}
