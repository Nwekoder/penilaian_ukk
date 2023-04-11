import {Link} from 'react-router-dom'

export default function LinkButton({href, children}) {
    return (
        <Link to={href} className='px-4 py-2 bg-blue-300 hover:bg-blue-600 duration-150 hover:text-white rounded-md'>{children}</Link>
    )
}