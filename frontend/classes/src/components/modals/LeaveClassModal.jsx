import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { leaveClass } from '../../api/classesApi'

export default function LeaveClassModal({ open, onClose, code }) {
	const navigate = useNavigate()
	const qc = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => leaveClass(code),
		onSuccess() {
			qc.invalidateQueries(['classes'])
			onClose()
			navigate('/')
		},
	})

	if (!open) return null

	return (
		<div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
			<div className='bg-white p-6 rounded-xl shadow-lg w-80'>
				<h2 className='text-lg font-semibold mb-3'>Підтвердження</h2>
				<p className='text-gray-700 mb-5'>Ви впевнені, що хочете залишити клас?</p>

				<div className='flex justify-end gap-2'>
					<button onClick={onClose} className='px-3 py-1 bg-gray-200 rounded cursor-pointer'>
						Скасувати
					</button>

					<button onClick={() => mutation.mutate()} className='px-3 py-1 bg-red-600 text-white rounded cursor-pointer'>
						Вийти
					</button>
				</div>
			</div>
		</div>
	)
}
