import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
import pathConfig from '~/configs/path.config'

export default function CategoryList() {
    return (
        <Container>
            <div className='bg-white rounded-sm shadow'>
                <h2 className='text-text-secondary uppercase text p-6'>Danh mục</h2>
                <div className='flex flex-wrap category-list'>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                    <Link to={pathConfig.productFilter} className='p-4 category-item flex justify-center flex-col items-center'>
                        <img
                            width='80%'
                            src='https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
                            alt='category'
                        />
                        <p className='text-center capitalize text-text-primary'>Áo thun</p>
                    </Link>
                </div>
            </div>
        </Container>
    )
}
