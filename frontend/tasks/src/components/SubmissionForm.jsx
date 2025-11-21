import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { submitHomework } from '../api/tasksApi'

export default function SubmissionForm({ taskId, initial }) {
	const qc = useQueryClient()
	const [content, setContent] = useState(initial?.content || '')

	const mutation = useMutation({
		mutationFn: () => submitHomework({ taskId, content }),
		onSuccess: () => {
			qc.invalidateQueries(['task', taskId])
		},
	})

	return (
		<div className='bg-white shadow p-5 rounded-xl'>
			<label className='block font-medium mb-2'>Посилання на виконану роботу</label>

			<input
				type='text'
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className='w-full border rounded-lg px-3 py-2 mb-4'
				placeholder='https://посилання-на-файл.com'
			/>

			<button
				onClick={() => mutation.mutate()}
				disabled={mutation.isPending}
				className='bg-blue-600 text-white px-4 py-2 rounded-lg'
			>
				{initial ? 'Оновити роботу' : 'Здати роботу'}
			</button>

			{mutation.isSuccess && <div className='mt-3 text-green-600'>Успішно збережено 🎉</div>}

			{mutation.isError && <div className='mt-3 text-red-600'>Не вдалося надіслати</div>}
		</div>
	)
}
