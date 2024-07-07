import { Button, SxProps, Theme } from '@mui/material'
import Spinner from '../Spinner'

type MyButtonMUIProps = {
    children?: React.ReactNode
    sx?: SxProps<Theme> | undefined
    type?: 'button' | 'submit' | 'reset' | undefined
    variant?: 'text' | 'outlined' | 'contained' | undefined
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined
    onClick?: () => void
    isLoading?: boolean
    disabled?: boolean
}
export default function MyButtonMUI({
    children,
    sx,
    type = 'button',
    variant = 'contained',
    color = 'primary',
    onClick,
    isLoading,
    disabled = false
}: MyButtonMUIProps) {
    return (
        <Button disabled={disabled} onClick={onClick} type={type} fullWidth sx={sx} variant={variant} color={color}>
            {isLoading ? <Spinner /> : children}
        </Button>
    )
}
