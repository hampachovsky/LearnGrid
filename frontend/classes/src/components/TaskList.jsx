import TaskCard from './TaskCard'

export default function TaskList({ tasks }) {
	return (
		<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
			{tasks.length === 0 && <p className='text-gray-500'>Немає завдань</p>}

			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	)
}
