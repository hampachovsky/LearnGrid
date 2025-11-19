import { Link, useLocation } from 'react-router'

export default function Sidebar({ isTeacher, isStudent }) {
	const { pathname } = useLocation()

	const linkClass = (path) =>
		`flex items-center px-3 py-2 text-sm rounded-md transition
     ${pathname === path ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`

	return (
		<aside
			className='
        hidden sm:flex   
        w-56 
        flex-shrink-0
        bg-white 
        min-h-screen 
        p-5 
        border-r border-gray-200
        shadow-[0_1px_4px_rgba(0,0,0,0.06)]
        pt-8 
        flex-col gap-3
      '
		>
			<h2 className='font-semibold text-sm text-gray-800 mb-2 px-1'>Навігація</h2>

			<Link className={linkClass('/classes')} to='/classes'>
				Мої класи
			</Link>

			{isStudent && (
				<Link className={linkClass('/join')} to='/join'>
					Приєднатися до класу
				</Link>
			)}

			{isTeacher && (
				<Link className={linkClass('/create-class')} to='/create-class'>
					Створити клас
				</Link>
			)}
		</aside>
	)
}
