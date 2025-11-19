import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'

export default function Header({ user, logout, onMenuOpen }) {
	return (
		<header
			className='
        w-full bg-white px-4 sm:px-6 py-3 
        flex justify-between items-center
        border-b border-gray-300 shadow-sm
      '
		>
			<div className='flex items-center gap-3'>
				{user && (
					<button className='sm:hidden p-2 hover:bg-gray-100 rounded-lg transition' onClick={onMenuOpen}>
						<Bars3Icon className='w-6 h-6 text-gray-700' />
					</button>
				)}

				<Link to='/' className='text-xl md:text-2xl font-bold text-blue-600 tracking-tight'>
					LearnGrid
				</Link>
			</div>

			{user ? (
				<div className='flex items-center gap-4'>
					<span className='text-gray-800 font-medium hidden sm:block'>
						{user.firstName} {user.secondName}
					</span>

					<button
						onClick={logout}
						className='
              text-red-600 
              hover:text-red-700 
              text-sm font-medium 
              underline-offset-2 hover:underline
              transition
              cursor-pointer
            '
					>
						Вийти
					</button>
				</div>
			) : null}
		</header>
	)
}
