import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createTopic } from '../api/topicsApi'

export default function TopicCreate({ classId, isTeacher }) {
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')

	const qc = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => createTopic(classId, title),
		onSuccess() {
			setOpen(false)
			setTitle('')
			qc.invalidateQueries(['topics', classId])
		},
	})

	if (!isTeacher) return null

	return (
		<div className='bg-white shadow-md p-4 rounded-xl mb-5'>
			{!open ? (
				<button
					className='px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700'
					onClick={() => setOpen(true)}
				>
					Додати тему
				</button>
			) : (
				<div>
					<input
						className='w-full border p-2 rounded mb-2'
						placeholder='Назва теми…'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<div className='flex gap-2 justify-end'>
						<button className='px-3 py-2 bg-gray-200 rounded cursor-pointer' onClick={() => setOpen(false)}>
							Скасувати
						</button>

						<button
							className='px-3 py-2 bg-blue-600 text-white rounded cursor-pointer'
							onClick={() => mutation.mutate()}
						>
							Створити
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
