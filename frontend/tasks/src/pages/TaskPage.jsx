import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getTaskById } from '../api/tasksApi'
import TaskView from '../components/TaskView'

export default function TaskPage() {
	const { taskId } = useParams()

	const { data, isLoading, error } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => getTaskById(taskId),
	})

	if (isLoading) return <div className='p-6'>Завантаження…</div>
	if (error) return <div className='p-6 text-red-600'>Помилка завантаження</div>

	return <TaskView task={data.task} submission={data.submission} />
}
