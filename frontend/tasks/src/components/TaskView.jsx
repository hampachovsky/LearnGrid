import { fixOffsetIfNeeded } from '../utils/fixOffsetIfNeeded'
import { formatTime } from '../utils/formatTime'
import CommentsList from './CommentsList'
import SubmissionForm from './SubmissionForm'

export default function TaskView({ task, submission, classInfo, me, comments }) {
	const isTeacher = me?.role === 'teacher'

	return (
		<div className='max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
			<div className='md:col-span-2 space-y-6'>
				<div>
					<h1 className='text-3xl font-semibold'>{task.title}</h1>

					{task.due_date && <div className='text-red-600 font-medium mt-1'>Дедлайн: {formatTime(task.due_date)}</div>}

					<div className='text-gray-500 mt-1'>Клас: {classInfo.name}</div>
				</div>

				<div className='bg-white shadow p-4 rounded-xl border border-gray-100'>
					<div className='text-sm text-gray-500'>Викладач</div>
					<div className='mt-1 font-medium'>
						{classInfo.teacher.firstName} {classInfo.teacher.secondName}
					</div>
					<div className='text-sm text-gray-500'>{classInfo.teacher.email}</div>
				</div>

				<div className='bg-white shadow p-5 rounded-xl border border-gray-100'>
					<h2 className='text-lg font-medium mb-2'>Опис</h2>
					<p className='text-gray-700 whitespace-pre-line'>{task.description}</p>
				</div>

				<div className='bg-white shadow p-5 rounded-xl border border-gray-100'>
					<h2 className='text-lg font-medium mb-3'>Коментарі</h2>
					<CommentsList comments={comments} me={me} taskId={task.id} />
				</div>
			</div>

			{!isTeacher && (
				<div className='space-y-6 mt-6 md:mt-16 font-normal'>
					<div className='bg-white shadow p-4 rounded-xl border border-gray-100 space-y-4'>
						<h2 className='text-lg font-medium'>Ваша робота</h2>

						{submission ? (
							<div className='space-y-3'>
								<div className='bg-green-50 p-4 rounded-xl'>
									<div className='font-medium'>Посилання</div>
									<a href={submission.content} target='_blank' className='text-blue-600 underline break-words'>
										{submission.content}
									</a>

									<div className='text-sm text-gray-500 mt-2'>
										Надіслано: {fixOffsetIfNeeded(submission.submitted_at)}
									</div>

									{submission.updated_at && (
										<div className='text-sm text-gray-500'>Оновлено: {formatTime(submission.updated_at)}</div>
									)}
								</div>

								<div className='bg-gray-50 p-3 rounded-xl'>
									<div className='text-gray-600 text-sm'>Оцінка</div>
									<div className='text-xl font-semibold'>{submission.grade ?? 'Без оцінки'}</div>
								</div>

								<SubmissionForm taskId={task.id} initial={submission} />
							</div>
						) : (
							<div className='space-y-4'>
								<div className='bg-yellow-50 p-3 rounded-xl'>Ви ще не здали роботу</div>

								<div className='bg-gray-50 p-3 rounded-xl'>
									<div className='text-gray-600 text-sm'>Оцінка</div>
									<div className='text-xl font-semibold'>Без оцінки</div>
								</div>

								<SubmissionForm taskId={task.id} initial={null} />
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
