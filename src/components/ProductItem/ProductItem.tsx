import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import pathConfig from '~/configs/path.config'
import ProductRating from '~/components/ProductRating'

type ProductItemProps = {
    maxItem?: number
}

export default function ProductItem({ maxItem }: ProductItemProps) {
    return (
        <Link to={`${pathConfig.home}${1}`} className={`${maxItem == 4 ? 'grid-item-4' : 'grid-item'}`}>
            <Paper elevation={0} sx={{ borderRadius: '2px' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        height='147.6px'
                        srcSet='https://down-vn.img.susercontent.com/file/38ac80b65817ae90a95f9ac237f3f4f6'
                        alt='product'
                        width='100%'
                    />
                </Box>
                <Box sx={{ py: 2, px: 1 }}>
                    <div className='wrap-name'>
                        <h6 className='product-name'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, tempore!</h6>
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
    )
}
