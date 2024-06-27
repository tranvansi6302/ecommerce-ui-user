import { ReactNode } from 'react'

type MyButtonProps = {
    className?: string
    children?: ReactNode
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
}
export default function MyButton({ className, children, type = 'button', onClick }: MyButtonProps) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`text-[14px] flex items-center justify-center  min-w-[5rem] capitalize outline-none ${className}`}
        >
            {children}
        </button>
    )
}
