import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { updateTask } from '../../api/tasksApi'
import ModalWrapper from './ModalWrapper'

export default function EditTaskModal({ open, onClose, task, topics, classId }) {
	const qc = useQueryClient()

	const [title, setTitle] = useState(task.title)
	const [desc, setDesc] = useState(task.description)
	const [topicId, setTopicId] = useState(task.topic_id)
	const [dueDate, setDueDate] = useState(task.due_date ? new Date(task.due_date) : null)
	const [errors, setErrors] = useState({})

	const mutation = useMutation({
		mutationFn: () =>
			updateTask(task.id, {
				title,
				description: desc,
				due_date: dueDate ? dueDate.toISOString() : null,
				topic_id: Number(topicId),
			}),
		onSuccess() {
			qc.invalidateQueries(['class', classId])
			onClose()
		},
	})

	const validate = () => {
		const next = {}

		if (!title.trim()) next.title = 'Назва є обовʼязковою'
		if (!topicId) next.topic = 'Потрібно вибрати тему'

		setErrors(next)
		return Object.keys(next).length === 0
	}

	const handleSave = () => {
		if (!validate()) return
		mutation.mutate()
	}

	if (!open) return null

	return (
		<ModalWrapper onClose={onClose}>
			<div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
				<h2 className='text-lg font-semibold mb-4'>Редагувати завдання</h2>

				<div className='flex flex-col gap-3'>
					<div>
						<label className='text-sm text-gray-600'>Назва *</label>
						<input
							className={`w-full border rounded-lg p-2 mt-1 ${errors.title ? 'border-red-500' : ''}`}
							value={title}
							onChange={(e) => {
								setTitle(e.target.value)
								if (errors.title) setErrors((prev) => ({ ...prev, title: null }))
							}}
						/>
						{errors.title && <p className='text-xs text-red-500 mt-1'>{errors.title}</p>}
					</div>

					<div>
						<label className='text-sm text-gray-600'>Опис</label>
						<textarea
							className='w-full border rounded-lg p-2 mt-1'
							rows={3}
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</div>
					<div>
						<label className='text-sm text-gray-600 mr-2'>Дедлайн</label>
						<DatePicker
							selected={dueDate}
							onChange={(date) => setDueDate(date)}
							showTimeSelect
							timeFormat='HH:mm'
							dateFormat='dd.MM.yyyy HH:mm'
							className='w-full border rounded-lg p-2 mt-1'
							placeholderText='Необовʼязково'
						/>
					</div>

					<div>
						<label className='text-sm text-gray-600'>Тема *</label>
						<select
							className={`w-full border rounded-lg p-2 mt-1 cursor-pointer ${errors.topic ? 'border-red-500' : ''}`}
							value={topicId}
							onChange={(e) => {
								setTopicId(e.target.value)
								if (errors.topic) setErrors((prev) => ({ ...prev, topic: null }))
							}}
						>
							<option value=''>Оберіть тему</option>
							{topics.map((t) => (
								<option key={t.id} value={t.id}>
									{t.title}
								</option>
							))}
						</select>
						{errors.topic && <p className='text-xs text-red-500 mt-1'>{errors.topic}</p>}
					</div>

					<div className='flex justify-end gap-2 mt-2'>
						<button onClick={onClose} className='px-3 py-2 bg-gray-200 rounded-lg text-sm cursor-pointer'>
							Скасувати
						</button>

						<button
							onClick={handleSave}
							className='px-3 py-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700'
						>
							Зберегти
						</button>
					</div>
				</div>
			</div>
		</ModalWrapper>
	)
}
