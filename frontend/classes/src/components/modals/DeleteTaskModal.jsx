import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../../api/tasksApi'
import ModalWrapper from './ModalWrapper'

export default function DeleteTaskModal({ open, onClose, taskId, classId }) {
	const qc = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => deleteTask(taskId),
		onSuccess() {
			qc.invalidateQueries(['class', classId])
			onClose()
		},
	})

	if (!open) return null

	return (
		<ModalWrapper onClose={onClose}>
			<div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-sm'>
				<h2 className='text-lg font-semibold mb-3'>Видалити завдання?</h2>
				<p className='text-gray-700 mb-5 text-sm'>Цю дію не можна скасувати.</p>

				<div className='flex justify-end gap-2'>
					<button onClick={onClose} className='px-3 py-2 bg-gray-200 rounded-lg text-sm cursor-pointer'>
						Скасувати
					</button>

					<button
						onClick={() => mutation.mutate()}
						className='px-3 py-2 bg-red-600 text-white rounded-lg text-sm cursor-pointer hover:bg-red-700'
					>
						Видалити
					</button>
				</div>
			</div>
		</ModalWrapper>
	)
}
