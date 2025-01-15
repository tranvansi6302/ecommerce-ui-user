import { Box, Paper, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ProductSale } from '~/@types/productSales.type'
import ProductRating from '~/components/ProductRating'
import pathConfig from '~/configs/path.config'
import { formatToVND, generateNameId, getMinMaxPromotionPrice, getMinMaxSalePrice } from '~/utils/helpers'
import SkeletonItem from '../SkeletonItem'

type ProductItemProps = {
    productSales?: ProductSale[]
    loading: boolean
}

export default function ProductItem({ productSales, loading }: ProductItemProps) {
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px'
                }}
            >
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
            </Box>
        )
    }
    return (
        <Fragment>
            {productSales && productSales.length > 0 ? (
                productSales?.map((product) => (
                    <Link
                        key={product.product_id}
                        to={`${pathConfig.home}${generateNameId({ name: product.product_name, id: product.product_id.toString() })}`}
                        className='grid-item'
                    >
                        <Paper elevation={0} sx={{ borderRadius: '2px' }}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    height: '186px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img srcSet={product.images[0].url} alt='product' width='100%' />
                            </Box>
                            <Box sx={{ py: 2, px: 1 }}>
                                <div className='wrap-name'>
                                    <h6 className='product-name'>{product.product_name}</h6>
                                </div>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span className='text-[#D70018] font-medium'>
                                        {formatToVND(
                                            getMinMaxPromotionPrice(product as ProductSale).minPromotionPrice
                                                ? getMinMaxPromotionPrice(product as ProductSale).minPromotionPrice
                                                : getMinMaxSalePrice(product as ProductSale).minSalePrice
                                        )}
                                    </span>
                                    {getMinMaxPromotionPrice(product as ProductSale).minPromotionPrice !== 0 && (
                                        <span className='ml-2 text-[13px] line-through text-gray-500'>
                                            {formatToVND(getMinMaxSalePrice(product as ProductSale).minSalePrice)}
                                        </span>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mt: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ProductRating rating={product.average_rating} />
                                        <Typography sx={{ ml: '5px', mt: 0.2 }} fontSize='13px' component='span'>
                                            {product.total_reviews} (lượt)
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mt: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography sx={{ ml: '5px' }} fontSize='13px' component='span'>
                                            Đã bán {product.total_sold}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Link>
                ))
            ) : (
                // Skeleton Loading
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center'
                        // Cho grid 2 cột
                    }}
                >
                    <img src='https://bepharco.com/no-products-found.png' alt='' />
                </div>
            )}
        </Fragment>
    )
}
