type AuthLayoutProps = {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <div className='flex min-h-screen'>{children}</div>
}
