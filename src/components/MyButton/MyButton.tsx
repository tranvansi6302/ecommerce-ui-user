import { ReactNode } from 'react'

type MyButtonProps = {
    className?: string
    children?: ReactNode
}
export default function MyButton({ className, children }: MyButtonProps) {
    return (
        <button className={`text-[14px] flex items-center justify-center  min-w-[5rem] capitalize outline-none ${className}`}>
            {children}
        </button>
    )
}
