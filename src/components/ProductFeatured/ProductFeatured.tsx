import { Container } from '@mui/material'

type ProductFeaturedProps = {
    children?: React.ReactNode
    title: string
    className?: string
}

export default function ProductFeatured({ title, children, className }: ProductFeaturedProps) {
    return (
        <Container style={{ padding: '0' }} className={className}>
            <div className='bg-white px-6 py-4'>
                <h2 className='text-blue-500 inline-block uppercase py-2 border-b-[2px] border-blue-600'>{title}</h2>
            </div>
            <div className='grid-wrapper mt-4'>{children}</div>
        </Container>
    )
}
