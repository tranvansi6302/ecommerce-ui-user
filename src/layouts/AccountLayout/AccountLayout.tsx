import { Container } from '@mui/material'
import MainHeader from '../MainLayout/components/MainHeader'
import Asidebar from './components/Asidebar'

type AccountLayoutProps = {
    children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
    return (
        <div className='bg-bg-primary max-w-full min-h-[100vh]'>
            <MainHeader />
            <Container style={{ padding: '0', marginTop: '20px' }}>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
                    <div className='md:col-span-3 lg:col-span-2'>
                        <Asidebar />
                    </div>
                    <div className='md:col-span-9 lg:col-span-10'>{children}</div>
                </div>
            </Container>
        </div>
    )
}
