import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

export default function TaskCard({ task }) {
	return (
		<div className='bg-white border shadow-sm rounded-lg p-4 hover:shadow-md transition '>
			<div className='flex items-center gap-2 mb-2'>
				<ClipboardDocumentCheckIcon className='w-5 h-5 text-blue-600' />
				<h3 className='font-semibold text-gray-800'>{task.title}</h3>
			</div>

			<p className='text-gray-600 text-sm'>{task.description}</p>

			<p className='text-xs text-gray-400 mt-2'>
				Термін: {task.due_date ? new Date(task.due_date).toLocaleString('uk-UA') : 'не вказано'}
			</p>
		</div>
	)
}
