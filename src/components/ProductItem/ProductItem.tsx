import { Box, Paper, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ProductSale } from '~/@types/productSales.type'
import ProductRating from '~/components/ProductRating'
import pathConfig from '~/configs/path.config'
import { formatToVND, getPrices } from '~/utils/helpers'

type ProductItemProps = {
    maxItem?: number
    productSales?: ProductSale[]
}

export default function ProductItem({ maxItem, productSales }: ProductItemProps) {
    return (
        <Fragment>
            {productSales &&
                productSales?.length > 0 &&
                productSales?.map((product) => (
                    <Link
                        key={product.product_id}
                        to={`${pathConfig.home}${1}`}
                        className={`${maxItem == 4 ? 'grid-item-4' : 'grid-item'}`}
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
                                        {formatToVND(getPrices(productSales).minPromotionPrice)}
                                    </span>
                                    {getPrices(productSales).minPromotionPrice && (
                                        <span className='ml-2 text-[13px] line-through text-gray-500'>
                                            {formatToVND(getPrices(productSales).minSalePrice as number)}
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
                ))}
        </Fragment>
    )
}
