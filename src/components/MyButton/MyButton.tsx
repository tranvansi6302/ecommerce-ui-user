import { ReactNode } from 'react'
import Spinner from '../Spinner'

type MyButtonProps = {
    className?: string
    children?: ReactNode
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    isLoading?: boolean
}
export default function MyButton({ className, children, type = 'button', onClick, isLoading }: MyButtonProps) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`text-[14px] flex items-center justify-center  min-w-[5rem] capitalize outline-none ${className}`}
        >
            {isLoading ? <Spinner /> : children}
        </button>
    )
}
