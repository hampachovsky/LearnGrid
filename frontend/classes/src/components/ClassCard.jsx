import { ArrowLeftOnRectangleIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'

const colors = [
	'from-blue-500 to-blue-600',
	'from-green-500 to-green-600',
	'from-purple-500 to-purple-600',
	'from-rose-500 to-rose-600',
	'from-indigo-500 to-indigo-600',
	'from-teal-500 to-teal-600',
]

function getColorById(id) {
	return colors[id % colors.length]
}

export default function ClassCard({ classItem }) {
	const { id, name, role, teacher, studentCount } = classItem
	const navigate = useNavigate()

	const color = getColorById(id)

	const handleOpen = () => {
		navigate(`/${classItem.id}`)
	}

	return (
		<div
			onClick={handleOpen}
			className='bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col'
		>
			<div className={`p-6 text-white bg-gradient-to-r ${color}`}>
				<h2 className='text-xl font-bold'>{name}</h2>
				<p className='opacity-90 text-sm mt-1'>Роль: {role === 'teacher' ? 'Викладач' : 'Студент'}</p>
			</div>

			<div className='p-4 flex flex-col flex-grow'>
				<p className='text-gray-700 mb-1'>
					Викладач:{' '}
					<span className='font-medium'>
						{teacher.firstName} {teacher.secondName}
					</span>
				</p>

				<p className='text-gray-500 text-sm'>Email: {teacher.email}</p>
			</div>

			<div className='px-4 py-3 border-t flex items-center justify-between bg-gray-50'>
				<button
					className='text-red-500 hover:text-red-600 transition flex items-center gap-1'
					onClick={() => console.log('Вийти з класу')}
				>
					<ArrowLeftOnRectangleIcon className='w-5 h-5' />
					<span className='text-sm'>Вийти</span>
				</button>

				<div className='flex items-center gap-1 text-gray-600 text-sm'>
					<UserGroupIcon className='w-5 h-5' />
					<span>{studentCount}</span>
				</div>
			</div>
		</div>
	)
}
