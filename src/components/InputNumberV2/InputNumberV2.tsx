import { UseFormRegister } from 'react-hook-form'

type InputNumberV2Props = {
    register?: UseFormRegister<any>
    errors?: boolean | any
    name: string
    placeholder: string
}

export default function InputNumberV2({ register, name, placeholder }: InputNumberV2Props) {
    const registerResult = register && name ? register(name) : null
    return (
        <input
            {...registerResult}
            placeholder={placeholder}
            name={name}
            id={name}
            className='py-1.5 border px-2 text-text-primary text-[14px] border-gray-300 rounded-sm w-full focus:outline-none focus:border-blue-600'
            type='number'
        />
    )
}
