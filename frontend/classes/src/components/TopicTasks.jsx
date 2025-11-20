import TaskCard from './TaskCard'
import TopicItem from './TopicItem'

export default function TopicTasks({ topics, tasks, filter, classId, isTeacher }) {
	const filteredTopics = filter === 'all' ? topics : topics.filter((t) => t.id === Number(filter))

	return (
		<div className='space-y-8 mt-6'>
			{filteredTopics.map((topic) => {
				const topicTasks = tasks.filter((task) => task.topic_id === topic.id)

				return (
					<div key={topic.id} className='bg-white rounded-xl shadow-md p-5'>
						<TopicItem topic={topic} classId={classId} isTeacher={isTeacher} />
						{topicTasks.length === 0 ? (
							<p className='text-gray-500 mt-3'>Немає завдань</p>
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
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
