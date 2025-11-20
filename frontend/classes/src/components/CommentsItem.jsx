import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteComment, updateComment } from '../api/commentsApi'
import { formatTime } from '../utils/formatTime'

export default function CommentItem({ c, me, classId }) {
	const [editMode, setEditMode] = useState(false)
	const [content, setContent] = useState(c.content)

	const qc = useQueryClient()

	const isOwner = me?.id === c?.user?.id
	const isTeacher = me?.role === 'teacher'
	const canEdit = isOwner
	const canDelete = isOwner || isTeacher

	const updateMutation = useMutation({
		mutationFn: () => updateComment(c.id, content),
		onSuccess() {
			setEditMode(false)
			qc.invalidateQueries(['class', classId])
		},
	})

	const deleteMutation = useMutation({
		mutationFn: () => deleteComment(c.id),
		onSuccess() {
			qc.invalidateQueries(['class', classId])
		},
	})

	return (
		<div className='bg-gray-100 rounded-lg p-3 shadow-sm'>
			<p className='font-semibold text-gray-800 text-sm mb-1'>
				{c.user?.firstName} {c.user?.secondName}
			</p>

			{!editMode ? (
				<p className='text-gray-900  text-sm  leading-snug '>{c.content}</p>
			) : (
				<textarea
					className='w-full border rounded-lg p-2 bg-white text-sm'
					rows={2}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			)}

			<p className='text-[10px] text-gray-500 mt-1'> {formatTime(c.created_at)}</p>

			<div className='flex items-center border-gray-300 gap-3 mt-2  border-t pt-2'>
				{!editMode && canEdit && (
					<button
						onClick={() => setEditMode(true)}
						className='text-gray-500 hover:text-gray-700 cursor-pointer flex items-center gap-1 text-xs'
					>
						<PencilIcon className='w-4 h-4' />
						Редагувати
					</button>
				)}

				{!editMode && canDelete && (
					<button
						onClick={() => deleteMutation.mutate()}
						className='text-red-500 hover:text-red-700 cursor-pointer flex items-center gap-1 text-xs'
					>
						<TrashIcon className='w-4 h-4' />
						Видалити
					</button>
				)}

				{editMode && (
					<div className='flex gap-2'>
						<button onClick={() => setEditMode(false)} className='px-2 py-1 bg-gray-200 rounded text-xs cursor-pointer'>
							Скасувати
						</button>

						<button
							onClick={() => updateMutation.mutate()}
							className='px-2 py-1 bg-blue-600 text-white rounded text-xs cursor-pointer'
						>
							Зберегти
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
