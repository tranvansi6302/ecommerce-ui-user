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
                                    <img
                                        src={
                                            category.name.toLowerCase() === 'áo nam'
                                                ? 'https://bizweb.dktcdn.net/thumb/1024x1024/100/416/517/products/z4838922157681-567e3c9f35e8cbf9a2fdad912405eee9.png'
                                                : category.name.toLowerCase() === 'quần nam'
                                                  ? 'https://babolat.com.vn/wp-content/uploads/2023/11/Play-Shorts-1.png'
                                                  : category.name.toLowerCase() === 'giày nam'
                                                    ? 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1652897300-AA001TM_SHOE_ANGLE_GLOBAL_MENS_TREE_FLYER_NATURAL_BLACK_BLIZZARD.png?crop=1xw:1.00xh;center,top&resize=980:*'
                                                    : 'https://lavigueur.com/products/_crop_750x750/241CT202151.PNG'
                                        }
                                        alt='category'
                                    />
                                </div>
                                <p className='text-center capitalize text-text-primary mt-2'>{category.name}</p>
                            </Link>
                        ))}
                </div>
            </div>
        </Container>
    )
}
