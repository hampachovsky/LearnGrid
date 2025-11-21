import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createComment } from '../api/commentsApi'
import CommentItem from './CommentItem'

export default function CommentsList({ comments, me, taskId }) {
	const qc = useQueryClient()
	const [text, setText] = useState('')
	const [error, setError] = useState('')

	const mutation = useMutation({
		mutationFn: () => createComment({ content: text, entityId: taskId }),
		onSuccess: () => {
			setText('')
			setError('')
			qc.invalidateQueries(['task', taskId])
		},
	})

	const handleSubmit = () => {
		if (text.trim().length < 1) {
			setError('Коментар має містити хоча б 1 символ')
			return
		}
		mutation.mutate()
	}

	return (
		<div className='space-y-4'>
			<div className='space-y-4'>
				{comments.map((c) => (
					<CommentItem key={c.id} comment={c} me={me} taskId={taskId} />
				))}
			</div>

			<div className='bg-gray-50 rounded-xl p-4 shadow-sm'>
				<textarea
					value={text}
					placeholder='Написати коментар…'
					onChange={(e) => {
						setText(e.target.value)
						setError('')
					}}
					className='w-full bg-white rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500'
				/>

				{error && <div className='text-red-600 text-sm mt-1'>{error}</div>}

				<button onClick={handleSubmit} className='bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer'>
					Опублікувати
				</button>
			</div>
		</div>
	)
}
