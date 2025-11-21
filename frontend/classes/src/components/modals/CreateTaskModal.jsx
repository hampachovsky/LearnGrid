import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createTask } from '../../api/tasksApi'
import Modal from './ModalWrapper'

export default function CreateTaskModal({ open, onClose, classId, topics }) {
	const qc = useQueryClient()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [dueDate, setDueDate] = useState(null)
	const [topicId, setTopicId] = useState('')
	const [errors, setErrors] = useState({})

	const mutation = useMutation({
		mutationFn: () =>
			createTask({
				title,
				description,
				due_date: dueDate ? dueDate.toISOString() : null,
				topic_id: Number(topicId),
			}),
		onSuccess() {
			setTitle('')
			setDescription('')
			setDueDate(null)
			setTopicId('')
			setErrors({})
			qc.invalidateQueries(['class', classId])
			onClose()
		},
	})

	const validate = () => {
		const newErrors = {}

		if (title.trim().length < 1) {
			newErrors.title = 'Назва є обовʼязковою'
		}

		if (!topicId) {
			newErrors.topic = 'Потрібно вибрати тему'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleCreate = () => {
		if (!validate()) return
		mutation.mutate()
	}

	if (!open) return null

	return (
		<Modal onClose={onClose}>
			<div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
				<h2 className='text-xl font-semibold mb-4'>Нове завдання</h2>

				<div className='flex flex-col gap-4'>
					<div>
						<label className='text-sm text-gray-600'>Назва *</label>
						<input
							type='text'
							className={`w-full border rounded-lg p-2 mt-1 ${errors.title ? 'border-red-500' : ''}`}
							value={title}
							onChange={(e) => {
								setTitle(e.target.value)
								if (errors.title) {
									setErrors((prev) => ({ ...prev, title: null }))
								}
							}}
						/>
						{errors.title && <p className='text-xs text-red-500 mt-1'>{errors.title}</p>}
					</div>

					<div>
						<label className='text-sm text-gray-600'>Опис</label>
						<textarea
							className='w-full border rounded-lg p-2 mt-1'
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div>
						<label className='text-sm text-gray-600 mr-2'>Дедлайн</label>
						<DatePicker
							selected={dueDate}
							onChange={(date) => setDueDate(date)}
							showTimeSelect
							dateFormat='dd.MM.yyyy HH:mm'
							className='w-full border rounded-lg p-2 mt-1'
							placeholderText='Оберіть дату'
						/>
					</div>

					<div>
						<label className='text-sm text-gray-600'>Тема *</label>
						<select
							className={`w-full border rounded-lg p-2 mt-1 cursor-pointer ${errors.topic ? 'border-red-500' : ''}`}
							value={topicId}
							onChange={(e) => {
								setTopicId(e.target.value)
								if (errors.topic) {
									setErrors((prev) => ({ ...prev, topic: null }))
								}
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
						<button onClick={onClose} className='px-4 py-2 bg-gray-200 rounded-lg cursor-pointer'>
							Скасувати
						</button>

						<button
							onClick={handleCreate}
							className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer'
						>
							Створити
						</button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
