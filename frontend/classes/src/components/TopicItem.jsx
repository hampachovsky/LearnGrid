import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteTopic, updateTopic } from '../api/topicsApi'

export default function TopicItem({ topic, classId, isTeacher }) {
	const [editing, setEditing] = useState(false)
	const [title, setTitle] = useState(topic.title)

	const qc = useQueryClient()

	const updateMutation = useMutation({
		mutationFn: () => updateTopic(topic.id, title),
		onSuccess() {
			setEditing(false)
			qc.invalidateQueries(['topics', classId])
		},
	})

	const deleteMutation = useMutation({
		mutationFn: () => deleteTopic(topic.id),
		onSuccess() {
			qc.invalidateQueries(['topics', classId])
		},
	})

	return (
		<div className='bg-white shadow-sm p-4 rounded-xl'>
			{!editing ? (
				<div className='flex justify-between items-center'>
					<h3 className='text-lg font-semibold'>{topic.title}</h3>

					{isTeacher && (
						<div className='flex gap-2'>
							<button className='text-gray-600 hover:text-gray-800 cursor-pointer' onClick={() => setEditing(true)}>
								<PencilIcon className='w-5 h-5' />
							</button>
							<button
								className='text-red-500 hover:text-red-700 cursor-pointer'
								onClick={() => deleteMutation.mutate()}
							>
								<TrashIcon className='w-5 h-5' />
							</button>
						</div>
					)}
				</div>
			) : (
				<div>
					<input className='w-full border p-2 rounded mb-2' value={title} onChange={(e) => setTitle(e.target.value)} />

					<div className='flex justify-end gap-2'>
						<button className='px-2 py-1 bg-gray-200 rounded cursor-pointer' onClick={() => setEditing(false)}>
							Скасувати
						</button>
						<button
							className='px-2 py-1 bg-blue-600 text-white rounded cursor-pointer'
							onClick={() => updateMutation.mutate()}
						>
							Зберегти
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
