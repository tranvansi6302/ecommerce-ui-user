import { Container } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import brandsService from '~/services/brands.service'

export default function BrandList() {
    const { data: brands } = useQuery({
        queryKey: ['brands'],
        queryFn: () => brandsService.getAllBrands(),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })

    return (
        <Container style={{ padding: '0', marginTop: '15px' }}>
            <div className='bg-white rounded-sm'>
                <h2 className='text-text-primary uppercase text-[15px] text p-6'>Thương hiệu nổi bật</h2>
                <div className='flex flex-wrap category-list'>
                    {brands?.data.result &&
                        brands?.data.result?.length > 0 &&
                        brands?.data.result.map((brand) => (
                            <Link
                                key={brand.id}
                                to={`${pathConfig.productFilters}?brand=${brand.slug}`}
                                className='p-4 category-item flex justify-center flex-col items-center'
                            >
                                <div className='flex items-center justify-center w-20 h-20'>
                                    <img src={brand.icon || 'https://via.placeholder.com/150?text=No+Image'} alt='category' />
                                </div>
                                <p className='text-center capitalize text-text-primary mt-2'>{brand.name}</p>
                            </Link>
                        ))}
                </div>
            </div>
        </Container>
    )
}
