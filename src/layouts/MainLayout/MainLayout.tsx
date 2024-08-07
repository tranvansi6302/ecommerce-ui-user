import MainHeader from './components/MainHeader'

type MainLayoutProps = {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className='bg-bg-primary max-w-full'>
            <MainHeader />
            {children}
        </div>
    )
}
