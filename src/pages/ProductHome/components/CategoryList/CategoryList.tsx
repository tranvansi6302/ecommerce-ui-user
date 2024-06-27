import { Container } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import categoriesService from '~/services/categories.service'
import accessory from '~/assets/images/accessory.png'
import shorts from '~/assets/images/shorts.png'
import shoes from '~/assets/images/shoe.png'
import tShirt from '~/assets/images/t-shirt.png'

export default function CategoryList() {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesService.getAllCategories(),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })

    return (
        <Container style={{ padding: '0' }}>
            <div className='bg-white rounded-sm shadow'>
                <h2 className='text-text-secondary uppercase text p-6'>Loại sản phẩm</h2>
                <div className='flex flex-wrap category-list'>
                    {categories?.data.result &&
                        categories?.data.result?.length > 0 &&
                        categories?.data.result.map((category) => (
                            <Link
                                key={category.id}
                                to={`${pathConfig.productFilters}?category=${category.slug}`}
                                className='p-4 category-item flex justify-center flex-col items-center'
                            >
                                <div className='flex items-center justify-center w-16 h-16'>
                                    <img
                                        width='80%'
                                        src={
                                            category.name.toLowerCase() === 'áo nam'
                                                ? tShirt
                                                : category.name.toLowerCase() === 'quần nam'
                                                  ? shorts
                                                  : category.name.toLowerCase() === 'giày nam'
                                                    ? shoes
                                                    : accessory
                                        }
                                        alt='category'
                                    />
                                </div>
                                <p className='text-center capitalize text-text-primary'>{category.name}</p>
                            </Link>
                        ))}
                </div>
            </div>
        </Container>
    )
}
