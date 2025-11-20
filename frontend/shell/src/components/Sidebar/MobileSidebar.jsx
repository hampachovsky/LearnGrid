import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router'

export default function MobileSidebarDrawer({ isOpen, onClose, isTeacher, isStudent }) {
	const { pathname } = useLocation()

	const linkClass = (path) =>
		`block px-4 py-2 text-base rounded-md transition
    ${pathname === path ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`

	return (
		<>
			{isOpen && <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-30' onClick={onClose} />}

			<aside
				className={`
		fixed top-0 left-0 h-full
		w-64 max-w-[90%] bg-white shadow-xl z-40
		p-6 pt-10 flex flex-col gap-4
		border-r border-gray-200
		transform transition-transform duration-300 will-change-transform
		${isOpen ? 'translate-x-0' : '-translate-x-full'}
	`}
			>
				<button className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg' onClick={onClose}>
					<XMarkIcon className='w-6 h-6 text-gray-700' />
				</button>

				<h2 className='font-semibold text-lg text-gray-800 mb-3'>Навігація</h2>

				<Link className={linkClass('/classes')} to='/classes' onClick={onClose}>
					Мої класи
				</Link>

				{isStudent && (
					<Link className={linkClass('/join')} to='/join' onClick={onClose}>
						Приєднатися до класу
					</Link>
				)}

				{isTeacher && (
					<Link className={linkClass('/create-class')} to='/create-class' onClick={onClose}>
						Створити клас
					</Link>
				)}
			</aside>
		</>
	)
}
