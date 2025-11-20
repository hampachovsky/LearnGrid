import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createComment } from '../api/commentsApi'

export default function CommentEditor({ announcementId, classId }) {
	const [text, setText] = useState('')
	const [error, setError] = useState('')
	const qc = useQueryClient()

	const mutation = useMutation({
		mutationFn: () =>
			createComment({
				content: text,
				type: 'announcement',
				entityId: announcementId,
			}),
		onSuccess() {
			setText('')
			setError('')
			qc.invalidateQueries(['class', classId])
		},
	})

	const handleSend = () => {
		if (text.trim().length < 1) {
			setError('Коментар не може бути порожнім')
			return
		}

		setError('')
		mutation.mutate()
	}

	return (
		<div className='mt-3'>
			<div className='flex gap-2'>
				<input
					className={`flex-grow border rounded-lg p-2 bg-white shadow-sm ${error ? 'border-red-500' : ''}`}
					placeholder='Додати коментар…'
					value={text}
					onChange={(e) => {
						setText(e.target.value)
						if (error && e.target.value.trim().length >= 1) setError('')
					}}
				/>

				<button
					onClick={handleSend}
					disabled={mutation.isLoading}
					className={`px-3 py-2 rounded-lg cursor-pointer text-white ${
						text.trim().length < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
					}`}
				>
					Надіслати
				</button>
			</div>

			{error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
		</div>
	)
}
