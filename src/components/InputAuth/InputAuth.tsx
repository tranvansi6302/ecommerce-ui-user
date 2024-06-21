import { TextField } from '@mui/material'
import { UseFormRegister } from 'react-hook-form'

type InputAuthProps = {
    label: string
    name: string
    variant?: 'standard' | 'outlined' | 'filled'
    register?: UseFormRegister<any>
    className?: string
    errors?: any
    rest?: any
}

export default function InputAuth({ label, name, register, className, errors, variant = 'outlined', rest }: InputAuthProps) {
    const registerResult = register && name ? register(name) : null
    const errorResult = errors && name ? Boolean(errors[name]) : false
    return (
        <TextField
            {...registerResult}
            error={errorResult}
            helperText={errors?.name?.message}
            className={className}
            fullWidth
            id={name}
            label={label}
            variant={variant}
            {...rest}
        />
    )
}
