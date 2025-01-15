import { Container } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import categoriesService from '~/services/categories.service'

export default function CategoryList() {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesService.getAllCategories(),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })

    return (
        <Container style={{ padding: '0' }}>
            <div className='bg-white rounded-sm'>
                <h2 className='text-text-primary uppercase text-[15px] text p-6'>Loại sản phẩm</h2>
                <div className='flex flex-wrap category-list'>
                    {categories?.data.result &&
                        categories?.data.result?.length > 0 &&
                        categories?.data.result.map((category) => (
                            <Link
                                key={category.id}
                                to={`${pathConfig.productFilters}?category=${category.slug}`}
                                className='p-4 category-item flex justify-center flex-col items-center'
                            >
                                <div className='flex items-center justify-center w-20 h-20'>
                                    <img src={category.icon || 'https://via.placeholder.com/150?text=No+Image'} alt='category' />
                                </div>
                                <p className='text-center capitalize text-text-primary mt-2'>{category.name}</p>
                            </Link>
                        ))}
                </div>
            </div>
        </Container>
    )
}
