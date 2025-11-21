import Tasks from 'tasks/App'
import { useLocation } from 'react-router'

function TasksWrapper() {
	const location = useLocation()
	return <Tasks initialPath={location.pathname} />
}

;<Route path='tasks/*' element={<TasksWrapper />} />
