import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'
import { createSearchParams, useNavigate } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import useQueryProductSales from '~/hooks/useQueryProductSales'

export default function HeaderSearch() {
    const navigate = useNavigate()
    const queryConfig = useQueryProductSales()
    const { register, handleSubmit, setValue } = useForm<{ search: string }>()

    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: pathConfig.productFilters,
            search: createSearchParams({ ...queryConfig, search: data.search }).toString()
        })
    })

    useEffect(() => {
        setValue('search', queryConfig.search as string)
    }, [queryConfig.search, setValue])

    return (
        <form onSubmit={onSubmit} className='mx-auto'>
            <label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                Search
            </label>
            <div className='relative'>
                <input
                    {...register('search')}
                    type='search'
                    id='search'
                    className='block w-full px-4  py-3 ps-4 text-sm text-gray-900  bg-[#eff0f5] focus:ring-blue-500 focus:border-blue-500 outline-none'
                    placeholder='Tìm kiếm sản phẩm...'
                />
                <button
                    type='submit'
                    className='text-white absolute right-0 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 h-full w-[50px] flex items-center justify-center'
                >
                    <FiSearch fontSize='18px' />
                </button>
            </div>
        </form>
    )
}
