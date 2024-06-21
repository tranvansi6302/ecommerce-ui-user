import { FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function AsidebarFilter() {
    return (
        <div className='filter-wrap'>
            <h4>
                <span className='text-text-primary capitalize'>Lọc theo danh mục</span>
            </h4>
            <ul>
                <li>
                    <Link className='flex items-center gap-1 text-text-primary capitalize' to='/'>
                        <FaCaretRight fontSize='12px' />
                        <span className=''>Quần áo</span>
                    </Link>
                </li>
                <li>
                    <Link className='flex items-center gap-1 text-text-primary capitalize' to='/'>
                        <FaCaretRight fontSize='12px' />
                        <span className=''>Quần áo</span>
                    </Link>
                </li>
                <li>
                    <Link className='flex items-center gap-1 text-text-primary capitalize' to='/'>
                        <FaCaretRight fontSize='12px' />

                        <span className=''>Quần áo</span>
                    </Link>
                </li>
                <li>
                    <Link className='flex items-center gap-1 text-text-primary capitalize' to='/'>
                        <FaCaretRight fontSize='12px' />
                        <span className=''>Quần áo</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
