import { Box, Paper, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ProductSale } from '~/@types/productSales.type'
import ProductRating from '~/components/ProductRating'
import pathConfig from '~/configs/path.config'

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
                            <Box sx={{ textAlign: 'center' }}>
                                <img style={{ height: '222.5px' }} srcSet={product.images[0].url} alt='product' width='100%' />
                            </Box>
                            <Box sx={{ py: 2, px: 1 }}>
                                <div className='wrap-name'>
                                    <h6 className='product-name'>{product.product_name}</h6>
                                </div>

                                <Box>
                                    <Typography fontSize='15px' color='#D70018' fontWeight='500' height='65px' component='span'>
                                        1.000.000₫
                                    </Typography>
                                    <Typography component='span'> 1.000.000₫</Typography>
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
                                        <ProductRating rating={5} />
                                        <Typography sx={{ ml: '5px', mt: 0.2 }} fontSize='13px' component='span'>
                                            112 (lượt)
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
                                            Đã bán 111
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
