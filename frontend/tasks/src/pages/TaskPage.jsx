import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getMe } from '../api/authApi'
import { getTaskById } from '../api/tasksApi'
import TaskView from '../components/TaskView'

export default function TaskPage() {
	const { taskId } = useParams()

	const taskQuery = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => getTaskById(taskId),
	})

	const meQuery = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
	})

	if (taskQuery.isLoading || meQuery.isLoading) return <div className='p-6'>Завантаження…</div>

	if (taskQuery.error) return <div className='p-6 text-red-600'>Помилка завантаження</div>

	return (
		<TaskView
			task={taskQuery.data.task}
			submission={taskQuery.data.submission}
			classInfo={taskQuery.data.class}
			comments={taskQuery.data.comments}
			me={meQuery.data}
		/>
	)
}
