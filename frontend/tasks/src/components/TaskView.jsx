import SubmissionForm from './SubmissionForm'

export default function TaskView({ task, submission }) {
	return (
		<div className='max-w-3xl mx-auto p-6'>
			<h1 className='text-2xl font-semibold mb-3'>{task.title}</h1>

			<p className='text-gray-700 mb-4 whitespace-pre-line'>{task.description}</p>

			<div className='bg-white shadow rounded-xl p-4 mb-6'>
				<div className='text-sm text-gray-500 mb-1'>Клас:</div>
				<div className='font-medium'>{task.class_id}</div>
			</div>

			{submission ? (
				<div className='bg-green-50 p-4 rounded-xl border border-green-200 mb-6'>
					<div className='font-medium mb-2'>Ваша робота</div>
					<div className='text-blue-600 break-words'>{submission.content}</div>

					<div className='text-sm text-gray-500 mt-2'>
						Надіслано: {new Date(submission.submitted_at).toLocaleString('uk-UA')}
					</div>
				</div>
			) : (
				<div className='bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6'>
					<div className='text-gray-800'>Ви ще не здали роботу</div>
				</div>
			)}

			<SubmissionForm taskId={task.id} initial={submission} />
		</div>
	)
}
