import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createComment } from '../api/commentsApi'

export default function CommentEditor({ announcementId, classId }) {
	const [text, setText] = useState('')
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
			qc.invalidateQueries(['class', classId])
		},
	})

	return (
		<div className='flex gap-2 mt-3'>
			<input
				className='flex-grow border rounded-lg p-2 bg-white shadow-sm'
				placeholder='Додати коментар…'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button
				onClick={() => mutation.mutate()}
				className='px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer'
			>
				Надіслати
			</button>
		</div>
	)
}
