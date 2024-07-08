import MainHeader from '../MainLayout/components/MainHeader'

type ShoppingLayoutProps = {
    children: React.ReactNode
    cartTitle?: string
    checkoutTitle?: string
}

export default function ShoppingLayout({ children, cartTitle = '', checkoutTitle = '' }: ShoppingLayoutProps) {
    return (
        <div className='bg-bg-primary max-w-full'>
            <MainHeader cartTitle={cartTitle} checkoutTitle={checkoutTitle} />
            {children}
        </div>
    )
}
