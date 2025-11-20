import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export default function StreamTaskCard({ task }) {
	return (
		<div className='bg-white shadow rounded-xl p-4 flex items-center gap-3 cursor-pointer'>
			<ClipboardDocumentListIcon className='w-7 h-7 text-blue-600' />

			<div>
				<p className='font-semibold text-gray-800'>{task.title}</p>

				<p className='text-sm text-gray-500'>
					{task.due_date ? `Термін: ${new Date(task.due_date).toLocaleString('uk-UA')}` : 'Без дедлайну'}
				</p>
			</div>
		</div>
	)
}
