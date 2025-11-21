import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteComment, updateComment } from '../api/commentsApi'
import { fixOffsetIfNeeded } from '../utils/fixOffsetIfNeeded'

export default function CommentItem({ comment, me, taskId }) {
	const qc = useQueryClient()
	const canEdit = me.id === comment.user.id
	const canDelete = canEdit || me.role === 'teacher'

	const [isEditing, setIsEditing] = useState(false)
	const [text, setText] = useState(comment.content)
	const [error, setError] = useState('')

	const editMutation = useMutation({
		mutationFn: () => updateComment({ id: comment.id, content: text }),
		onSuccess: () => {
			qc.invalidateQueries(['task', taskId])
			setIsEditing(false)
			setError('')
		},
	})

	const deleteMutation = useMutation({
		mutationFn: () => deleteComment(comment.id),
		onSuccess: () => qc.invalidateQueries(['task', taskId]),
	})

	const handleSave = () => {
		if (text.trim().length < 1) {
			setError('Коментар має містити хоча б 1 символ')
			return
		}
		editMutation.mutate()
	}

	if (isEditing) {
		return (
			<div className='pb-3'>
				<textarea
					value={text}
					onChange={(e) => {
						setText(e.target.value)
						setError('')
					}}
					className='w-full bg-gray-50 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500'
				/>

				{error && <div className='text-red-600 text-sm mt-1'>{error}</div>}

				<div className='flex gap-2 mt-2'>
					<button
						onClick={handleSave}
						className='bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer'
					>
						<CheckIcon className='w-4 h-4' />
						Зберегти
					</button>

					<button
						onClick={() => setIsEditing(false)}
						className='bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer'
					>
						<XMarkIcon className='w-4 h-4' />
						Скасувати
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='pb-3'>
			<div className='flex justify-between'>
				<div>
					<div className='font-medium'>
						{comment.user.firstName} {comment.user.secondName}
					</div>
					<div>{comment.content}</div>

					<div className='text-xs text-gray-400 mt-1'>{fixOffsetIfNeeded(comment.created_at)}</div>
				</div>

				<div className='flex gap-2 h-fit'>
					{canEdit && (
						<button onClick={() => setIsEditing(true)} className='text-gray-600 hover:text-black cursor-pointer'>
							<PencilIcon className='w-5 h-5' />
						</button>
					)}

					{canDelete && (
						<button onClick={() => deleteMutation.mutate()} className='text-red-600 hover:text-red-800 cursor-pointer'>
							<TrashIcon className='w-5 h-5' />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
