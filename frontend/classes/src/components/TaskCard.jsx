import { ClipboardDocumentCheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { formatTime } from '../utils/formatTime'
import DeleteTaskModal from './modals/DeleteTaskModal'
import EditTaskModal from './modals/EditTaskModal'

export default function TaskCard({ task, isTeacher, topics, classId }) {
	const navigate = useNavigate()

	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)

	return (
		<>
			<div
				onClick={() => navigate(`/tasks/${task.id}`)}
				className='bg-white border shadow-sm rounded-lg p-4 hover:shadow-md transition cursor-pointer relative'
			>
				{isTeacher && (
					<div className='absolute top-2 right-2 flex gap-2' onClick={(e) => e.stopPropagation()}>
						<button className='p-1 text-gray-600 hover:text-gray-800 cursor-pointer' onClick={() => setEditOpen(true)}>
							<PencilIcon className='w-5 h-5' />
						</button>

						<button className='p-1 text-red-500 hover:text-red-700 cursor-pointer' onClick={() => setDeleteOpen(true)}>
							<TrashIcon className='w-5 h-5' />
						</button>
					</div>
				)}

				<div className='flex items-center gap-2 mb-2'>
					<ClipboardDocumentCheckIcon className='w-5 h-5 text-blue-600' />
					<h3 className='font-semibold text-gray-800'>{task.title}</h3>
				</div>

				<p className='text-gray-600 text-sm'>{task.description}</p>

				<p className='text-xs text-gray-400 mt-2'>Термін: {task.due_date ? formatTime(task.due_date) : 'не вказано'}</p>
			</div>

			<EditTaskModal open={editOpen} onClose={() => setEditOpen(false)} task={task} topics={topics} classId={classId} />

			<DeleteTaskModal open={deleteOpen} onClose={() => setDeleteOpen(false)} taskId={task.id} classId={classId} />
		</>
	)
}
