import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createAnnouncement } from '../api/announcementsApi'

export default function AnnouncementEditor({ classId, isTeacher }) {
	const [open, setOpen] = useState(false)
	const [text, setText] = useState('')

	const qc = useQueryClient()

	const createMutation = useMutation({
		mutationFn: () => createAnnouncement(classId, text),
		onSuccess() {
			setText('')
			setOpen(false)
			qc.invalidateQueries(['class', classId])
		},
	})

	if (!isTeacher) return null

	return (
		<div className='bg-white shadow-md rounded-xl p-4 mb-4'>
			{!open ? (
				<div
					className='border border-transparent rounded-lg p-3 bg-gray-100 text-gray-500 cursor-pointer hover:bg-gray-200'
					onClick={() => setOpen(true)}
				>
					Напишіть оголошення…
				</div>
			) : (
				<div>
					<textarea
						className='w-full border rounded-lg p-3 focus:outline-blue-500'
						rows={3}
						placeholder='Текст оголошення...'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>

					<div className='flex justify-end mt-3 gap-2'>
						<button
							className='px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer'
							onClick={() => setOpen(false)}
						>
							Скасувати
						</button>

						<button
							className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
							onClick={() => createMutation.mutate()}
						>
							Опублікувати
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
