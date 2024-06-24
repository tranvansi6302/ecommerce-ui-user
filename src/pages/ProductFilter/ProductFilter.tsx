import { Container, Grid, Typography } from '@mui/material'
import MyButton from '~/components/MyButton'
import MySelect from '~/components/MySelect/MySelect'
import ProductItem from '~/components/ProductItem'
import AsidebarFilter from './components/AsidebarFilter/AsidebarFilter'
export default function productFilters() {
    return (
        <Container>
            <Grid alignItems='flex-start' container spacing={2}>
                <Grid sx={{ mt: 4 }} item md={12} lg={2.3}>
                    <Typography mb={4} fontSize='18px' textTransform='uppercase' fontWeight='600' component='p'>
                        Bộ lọc tìm kiếm
                    </Typography>
                    <div className='filter'>
                        <div className=''>
                            <AsidebarFilter />
                        </div>
                        <div className='mt-8'>
                            <AsidebarFilter />
                        </div>
                    </div>
                </Grid>
                <Grid item md={12} lg={9.7}>
                    <div className='my-4'>
                        <div className='py-5 bg-[#00000008] flex items-center gap-6'>
                            <h5 className='text-text-primary ml-4 capitalize'>Sắp xếp theo</h5>
                            <div className='flex items-center'>
                                <MyButton className='bg-white h-8 px-10 ml-4 hover:bg-slate-100'>Mới nhất</MyButton>
                                <MyButton className='bg-white h-8 px-10 ml-4 hover:bg-slate-100'>Bán chạy nhất</MyButton>
                                <MySelect />
                            </div>
                        </div>
                    </div>
                    <div className='grid-wrapper'>
                        <ProductItem maxItem={4} />
                        <ProductItem maxItem={4} />
                        <ProductItem maxItem={4} />
                        <ProductItem maxItem={4} />
                        <ProductItem maxItem={4} />
                        <ProductItem maxItem={4} />
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
