import { Container, Grid, Pagination, Stack, Typography } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { MdOutlineFilterAltOff } from 'react-icons/md'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Brand } from '~/@types/brands.type'
import { Category } from '~/@types/categories.type'
import { ProductSaleFilters } from '~/@types/productSales.type'
import MyButton from '~/components/MyButton'
import ProductItem from '~/components/ProductItem'
import pathConfig from '~/configs/path.config'
import useQueryProductSales from '~/hooks/useQueryProductSales'
import MySelectSortPrice from '~/pages/ProductFilter/components/MySelectSortPrice'
import brandsService from '~/services/brands.service'
import categoriesService from '~/services/categories.service'
import productSalesService from '~/services/productSales.service'
import AsidebarFilterByData from './components/AsidebarFilterByData'
import FilterMinMaxPrice from './components/SortMinMaxPrice/FilterMinMaxPrice'
import FilterRating from './components/FilterRating'

export default function ProductFilters() {
    const queryConfig = useQueryProductSales()
    const navigate = useNavigate()
    const { sort_order, sort_by } = queryConfig
    const { data: productSales } = useQuery({
        queryKey: ['productSales', queryConfig],
        queryFn: () => productSalesService.getAllProductSales(queryConfig as ProductSaleFilters),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesService.getAllCategories(),
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    })
    const { data: brands } = useQuery({
        queryKey: ['brands'],
        queryFn: () => brandsService.getAllBrands(),
        staleTime: 3 * 60 * 1000, // 3 minutes
        placeholderData: keepPreviousData
    })

    const handleRemoveAllFilter = () => {
        navigate({
            pathname: pathConfig.productFilters,
            search: createSearchParams(omit(queryConfig, ['min_price', 'max_price', 'rating', 'category', 'brand'])).toString()
        })
    }

    return (
        <Container style={{ padding: '0' }}>
            <Grid alignItems='flex-start' container spacing={2}>
                <Grid sx={{ mt: 4, pb: 6 }} item md={12} lg={2.3}>
                    <Typography mb={4} fontSize='18px' textTransform='uppercase' fontWeight='600' component='p'>
                        Bộ lọc tìm kiếm
                    </Typography>
                    <div className='filter'>
                        <div className=''>
                            <AsidebarFilterByData
                                title='Lọc theo danh mục'
                                filterType='category'
                                queryConfig={queryConfig}
                                filterData={categories?.data.result as Category[]}
                            />
                        </div>
                        <div className='mt-8'>
                            <AsidebarFilterByData
                                title='Lọc theo thương hiệu'
                                filterType='brand'
                                queryConfig={queryConfig}
                                filterData={brands?.data.result as Brand[]}
                            />
                        </div>
                        <div className='mt-8'>
                            <FilterMinMaxPrice queryConfig={queryConfig} title='Lọc theo khoảng giá' />
                        </div>
                        <div className='mt-8'>
                            <FilterRating queryConfig={queryConfig} title='Đánh giá' />
                        </div>
                        <div className='mt-8'>
                            <MyButton
                                onClick={handleRemoveAllFilter}
                                className='bg-blue-600 w-full h-8 text-white hover:bg-blue-500 gap-2'
                            >
                                Xóa bộ lọc
                                <MdOutlineFilterAltOff fontSize='16px' />
                            </MyButton>
                        </div>
                    </div>
                </Grid>
                <Grid item md={12} lg={9.7}>
                    <div className='my-4'>
                        <div className='py-5 bg-[#00000008] flex items-center gap-6'>
                            <h5 className='text-text-primary ml-4 capitalize'>Sắp xếp theo</h5>
                            <div className='flex items-center'>
                                <Link
                                    to={{
                                        pathname: pathConfig.productFilters,
                                        search: createSearchParams(
                                            omit(
                                                {
                                                    ...queryConfig,
                                                    sort_order: 'desc'
                                                },
                                                ['sort_by']
                                            )
                                        ).toString()
                                    }}
                                >
                                    <MyButton
                                        className={`h-8 px-10 ml-4  ${sort_order === 'desc' && !sort_by ? 'bg-blue-600 text-white' : 'bg-white'}`}
                                    >
                                        Mới nhất
                                    </MyButton>
                                </Link>
                                <Link
                                    to={{
                                        pathname: pathConfig.productFilters,
                                        search: createSearchParams({
                                            ...queryConfig,
                                            sort_by: 'sold'
                                        }).toString()
                                    }}
                                >
                                    <MyButton
                                        className={classNames(' h-8 px-10 ml-4', {
                                            'bg-blue-600 text-white': sort_by === 'sold',
                                            'bg-white hover:bg-slate-100': sort_by !== 'sold'
                                        })}
                                    >
                                        Bán chạy nhất
                                    </MyButton>
                                </Link>
                                <MySelectSortPrice queryConfig={queryConfig} />
                            </div>
                        </div>
                    </div>
                    <div className='grid-wrapper max-5'>
                        <ProductItem productSales={productSales?.data.result} />
                    </div>

                    {/* Pagination */}
                    <div className='mt-16 flex items-center justify-center'>
                        <Stack spacing={2}>
                            <Pagination count={10} color='primary' />
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
