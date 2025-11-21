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

			<div className='space-y-6 mt-6 md:mt-16'>
				{submission ? (
					<div className='bg-green-50 p-4 rounded-xl border border-green-200'>
						<div className='font-medium mb-1'>Ваша відповідь</div>
						<a href={submission.content} target='_blank' className='text-blue-600 underline break-words'>
							{submission.content}
						</a>
						<div className='text-sm text-gray-500 mt-2'>Надіслано: {fixOffsetIfNeeded(submission.submitted_at)}</div>
						{submission.updated_at && (
							<div className='text-sm text-gray-500'>Оновлено: {fixOffsetIfNeeded(submission.updated_at)}</div>
						)}
					</div>
				) : (
					!isTeacher && (
						<div className='bg-yellow-50 p-3 Ь rounded-xl border border-yellow-200'>Ви ще не здали роботу</div>
					)
				)}

				{!isTeacher && <SubmissionForm taskId={task.id} initial={submission} />}
			</div>
		</div>
	)
}
