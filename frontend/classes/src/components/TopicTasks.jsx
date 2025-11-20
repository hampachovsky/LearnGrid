import TaskCard from './TaskCard'

export default function TopicTasks({ topics, tasks, filter }) {
	const filteredTopics = filter === 'all' ? topics : topics.filter((t) => t.id === Number(filter))

	return (
		<div className='space-y-8'>
			{filteredTopics.map((topic) => {
				const topicTasks = tasks.filter((task) => task.topic_id === topic.id)

				return (
					<div key={topic.id} className='bg-white rounded-xl shadow-md p-5'>
						<h2 className='text-xl font-semibold mb-4'>{topic.title}</h2>

						{topicTasks.length === 0 ? (
							<p className='text-gray-500'>Немає завдань</p>
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
								{topicTasks.map((task) => (
									<TaskCard key={task.id} task={task} />
								))}
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
