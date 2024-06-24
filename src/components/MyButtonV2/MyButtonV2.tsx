import { Button, SxProps, Theme } from '@mui/material'
import Spinner from '../Spinner'

type MyButtonV2Props = {
    children?: React.ReactNode
    sx?: SxProps<Theme> | undefined
    type?: 'button' | 'submit' | 'reset' | undefined
    variant?: 'text' | 'outlined' | 'contained' | undefined
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined
    onClick?: () => void
    loading?: boolean
}
export default function MyButtonV2({
    children,
    sx,
    type = 'button',
    variant = 'contained',
    color = 'primary',
    onClick,
    loading
}: MyButtonV2Props) {
    return (
        <Button onClick={onClick} type={type} fullWidth sx={sx} variant={variant} color={color}>
            {loading ? <Spinner /> : children}
        </Button>
    )
}
