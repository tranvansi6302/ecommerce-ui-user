import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import InputNumberV2 from '~/components/InputNumberV2'
import MyButton from '~/components/MyButton'
import pathConfig from '~/configs/path.config'
import { QueryConfig } from '~/hooks/useQueryProductSales'
import { FilterMinMaxType, minMaxPriceSchema } from '~/schemas/filters.schema'

type FilterMinMaxPriceProps = {
    title: string
    queryConfig: QueryConfig
}

type FormDataMinMaxPrice = FilterMinMaxType

export default function FilterMinMaxPrice({ title, queryConfig }: FilterMinMaxPriceProps) {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormDataMinMaxPrice>({
        defaultValues: {
            min_price: 0,
            max_price: 0
        },
        resolver: yupResolver(minMaxPriceSchema)
    })

    const onsubmit = handleSubmit((data) => {
        navigate({
            pathname: pathConfig.productFilters,
            search: createSearchParams({
                ...queryConfig,
                page: '1',
                min_price: data.min_price.toString(),
                max_price: data.max_price.toString()
            }).toString()
        })
    })

    useEffect(() => {
        setValue('min_price', Number(queryConfig.min_price) || 0)
        setValue('max_price', Number(queryConfig.max_price) || 0)
    }, [queryConfig.max_price, queryConfig.min_price, setValue])
    console.log('render...')
    return (
        <div className='filter-wrap'>
            <h4>
                <span className='text-text-primary capitalize'>{title}</span>
            </h4>
            <form onSubmit={onsubmit}>
                <div className='flex items-center gap-x-2'>
                    <InputNumberV2 register={register} name='min_price' placeholder='₫ Từ' />
                    <InputNumberV2 register={register} name='max_price' placeholder='₫ Đến' />
                </div>
                <div className='mt-2 my-4 text-center text-[12px] text-red-600 capitalize'>
                    {errors.max_price?.message || errors.min_price?.message}
                </div>
                <MyButton type='submit' className='bg-blue-600 w-full h-8 text-white hover:bg-blue-500 mt-5'>
                    Áp dụng
                </MyButton>
            </form>
        </div>
    )
}
