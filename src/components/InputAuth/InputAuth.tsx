import { TextField } from '@mui/material'
import { UseFormRegister } from 'react-hook-form'

type InputAuthProps = {
    label?: string
    name: string
    variant?: 'standard' | 'outlined' | 'filled'
    register?: UseFormRegister<any>
    className?: string
    type?: React.HTMLInputTypeAttribute
    errors?: any
    disable?: boolean
    defaultValue?: string
    rest?: any
}

export default function InputAuth({
    label,
    name,
    type = 'text',
    register,
    className,
    errors,
    defaultValue,
    disable = false,
    variant = 'outlined',
    rest
}: InputAuthProps) {
    const registerResult = register && name ? register(name) : null
    const errorResult = errors && name ? Boolean(errors[name]) : false
    return (
        <TextField
            {...registerResult}
            error={errorResult}
            helperText={errors[name]?.message}
            className={className}
            fullWidth
            type={type}
            defaultValue={defaultValue}
            autoComplete='on'
            id={name}
            label={label}
            variant={variant}
            disabled={disable}
            {...rest}
        />
    )
}
