import { ArrowLeftOnRectangleIcon, PencilIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { updateClassName } from '../api/classesApi'
import { getColorById } from '../utils/getColors'
import EditClassModal from './modals/EditClassModal'
import LeaveClassModal from './modals/LeaveClassModal'

export default function ClassCard({ classItem }) {
	const { id, name, role, teacher, studentCount, code } = classItem
	const navigate = useNavigate()
	const [editOpen, setEditOpen] = useState(false)
	const [leaveOpen, setLeaveOpen] = useState(false)

	const qc = useQueryClient()

	const updateMutation = useMutation({
		mutationFn: (newName) => updateClassName(id, newName),
		onSuccess() {
			qc.invalidateQueries(['classes'])
			setEditOpen(false)
		},
	})

	return (
		<>
			<div
				onClick={() => navigate(`/classes/${id}`)}
				className='bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col'
			>
				<div className={`p-6 text-white bg-gradient-to-r ${getColorById(id)}`}>
					<div className='flex justify-between items-start'>
						<h2 className='text-xl font-bold'>{name}</h2>

						{role === 'teacher' && (
							<button
								onClick={(e) => {
									e.stopPropagation()
									setEditOpen(true)
								}}
								className='hover:text-gray-100 cursor-pointer'
							>
								<PencilIcon className='w-5 h-5' />
							</button>
						)}
					</div>

					<p className='opacity-90 text-sm mt-1'>Роль: {role === 'teacher' ? 'Викладач' : 'Студент'}</p>
				</div>

				<div className='p-4 flex flex-col flex-grow'>
					<p className='text-gray-700 mb-1'>
						Викладач:{' '}
						<span className='font-medium'>
							{teacher.firstName} {teacher.secondName}
						</span>
					</p>

					<p className='text-gray-500 text-sm'>Пошта: {teacher.email}</p>
					<p className='text-gray-500 text-sm'>Код: {code}</p>
				</div>

				<div className='px-4 py-3 border-t flex items-center justify-between bg-gray-50'>
					<button
						onClick={(e) => {
							e.stopPropagation()
							setLeaveOpen(true)
						}}
						className='text-red-500 hover:text-red-600 transition flex items-center gap-1 cursor-pointer'
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

			<LeaveClassModal open={leaveOpen} onClose={() => setLeaveOpen(false)} code={code} />
			<EditClassModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				initialName={name}
				onSave={(name) => updateMutation.mutate(name)}
			/>
		</>
	)
}
