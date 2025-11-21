import { TrashIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createSubmission, deleteSubmission, updateSubmission } from '../api/submissionsApi'

export default function SubmissionForm({ taskId, initial }) {
	const qc = useQueryClient()
	const [content, setContent] = useState(initial?.content || '')
	const [error, setError] = useState('')

	const createMutation = useMutation({
		mutationFn: () => createSubmission({ taskId, content }),
		onSuccess: () => {
			qc.invalidateQueries(['task', taskId])
			setError('')
		},
	})

	const updateMutation = useMutation({
		mutationFn: () =>
			updateSubmission({
				submissionId: initial.id,
				content,
			}),
		onSuccess: () => {
			qc.invalidateQueries(['task', taskId])
			setError('')
		},
	})

	const deleteMutation = useMutation({
		mutationFn: () => deleteSubmission(initial.id),
		onSuccess: () => {
			qc.invalidateQueries(['task', taskId])
		},
	})

	const handleSubmit = () => {
		if (content.trim().length < 1) {
			setError('Посилання не може бути порожнім')
			return
		}
		initial ? updateMutation.mutate() : createMutation.mutate()
	}

	const isGraded = initial?.grade !== null && initial?.grade !== undefined

	return (
		<div className='bg-white shadow p-4 rounded-xl space-y-3'>
			<textarea
				value={content}
				onChange={(e) => {
					setContent(e.target.value)
					setError('')
				}}
				placeholder='Вставте посилання на виконану роботу…'
				className='w-full bg-gray-50 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500'
			/>

			{error && <div className='text-red-600 text-sm'>{error}</div>}

			<div className='flex flex-wrap gap-2'>
				<button
					onClick={handleSubmit}
					disabled={isGraded}
					className={`
						text-sm font-normal h-9 px-3 rounded-lg whitespace-nowrap
						inline-flex items-center justify-center max-w-full
						${isGraded ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white cursor-pointer'}
					`}
				>
					{initial ? 'Оновити' : 'Здати'}
				</button>

				{initial && (
					<button
						onClick={() => deleteMutation.mutate()}
						className='text-sm font-normal h-9 px-3 rounded-lg whitespace-nowrap
						inline-flex items-center justify-center max-w-full
						bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer gap-1'
					>
						<TrashIcon className='w-4 h-4' />
						Скасувати
					</button>
				)}
			</div>
		</div>
	)
}
