import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { fetchSubmissionsByClass, gradeSubmission } from '../api/submissionsApi'
import { formatTime } from '../utils/formatTime'

export default function GradesTab({ classId, isTeacher, me }) {
	const qc = useQueryClient()
	const navigate = useNavigate()

	const { data, isLoading, isError } = useQuery({
		queryKey: ['grades', classId],
		queryFn: () => fetchSubmissionsByClass(classId),
	})

	const mutation = useMutation({
		mutationFn: ({ id, grade }) => gradeSubmission(id, grade),
		onSuccess() {
			qc.invalidateQueries(['grades', classId])
		},
	})

	if (isLoading) return <p className='mt-6'>Завантаження…</p>
	if (isError) return <p className='text-red-500 mt-6'>Помилка завантаження</p>

	const visibleSubs = isTeacher ? data : data.filter((s) => s.classUser?.user_id === me.id)

	const grouped = visibleSubs.reduce((acc, s) => {
		if (!acc[s.task_id]) acc[s.task_id] = { task: s.task, subs: [] }
		acc[s.task_id].subs.push(s)
		return acc
	}, {})

	return (
		<div className='mt-6 space-y-8'>
			{Object.values(grouped).map(({ task, subs }) => (
				<div key={task.id} className='bg-white rounded-xl shadow-md p-6 border border-gray-200'>
					<h2
						onClick={() => navigate(`/tasks/${task.id}`)}
						className='text-xl font-semibold mb-1 text-blue-600 hover:underline cursor-pointer'
					>
						{task.title}
					</h2>

					<p className='text-gray-600 mb-4 text-sm'>{task.description}</p>

					<div className='space-y-4'>
						{subs.map((s) => {
							const isLate = task.due_date && new Date(s.submitted_at) > new Date(task.due_date)

							const u = s.user
							const userName = u ? `${u.firstName} ${u.secondName}` : 'Користувача видалено'

							return (
								<div key={s.id} className='rounded-lg bg-gray-50 shadow-sm p-4 transition hover:bg-gray-100'>
									<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
										<div className='space-y-1 flex-1'>
											<p className='font-medium text-gray-800'>{userName}</p>

											<a href={s.content} target='_blank' className='text-blue-600 underline text-sm cursor-pointer'>
												Переглянути роботу
											</a>

											<p className='text-xs text-gray-500'>Здано: {formatTime(s.submitted_at)}</p>

											{isLate && <p className='text-red-600 font-semibold text-xs mt-1'>⚠ Здано із запізненням</p>}
										</div>

										<div className='flex flex-col items-end'>
											{isTeacher ? (
												<div className='flex flex-col items-end'>
													<input
														type='number'
														min='0'
														max='100'
														defaultValue={s.grade ?? ''}
														className={`w-20 border rounded-lg p-2 text-sm focus:border-blue-500 ${
															s._error ? 'border-red-500' : ''
														}`}
														onBlur={(e) => {
															const value = e.target.value.trim()

															if (value === '') return

															const number = Number(value)

															if (isNaN(number)) {
																s._error = 'Оцінка має бути числом'
																e.target.classList.add('border-red-500')
																return
															}

															if (number < 0 || number > 100) {
																s._error = 'В межах 0–100'
																e.target.classList.add('border-red-500')
																return
															}

															s._error = null
															e.target.classList.remove('border-red-500')

															mutation.mutate({ id: s.id, grade: number })
														}}
													/>

													{s._error && <p className='text-red-500 text-xs mt-1'>{s._error}</p>}
												</div>
											) : (
												<p className='text-gray-800 font-semibold'>Оцінка: {s.grade ?? '—'}</p>
											)}
										</div>
									</div>
								</div>
							)
						})}

						{subs.length === 0 && <p className='text-gray-500 text-sm'>Немає робіт</p>}
					</div>
				</div>
			))}
		</div>
	)
}
