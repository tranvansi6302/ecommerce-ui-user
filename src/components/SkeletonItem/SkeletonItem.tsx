import { Stack, Skeleton } from '@mui/material'
export default function SkeletonItem() {
    return (
        <Stack width={'195px'} spacing={2}>
            <Skeleton variant='rectangular' width='100%' height={250} />
            <Skeleton variant='text' sx={{ fontSize: '1.2rem', width: '50%' }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem', width: '20%' }} />
        </Stack>
    )
}
