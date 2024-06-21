import { Fragment } from 'react/jsx-runtime'
import AppRouter from './routers/AppRouter'

export default function App() {
    const appRouter = AppRouter()
    return <Fragment>{appRouter}</Fragment>
}
