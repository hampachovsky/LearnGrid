import { Route, Routes } from 'react-router'
import TaskPage from './pages/TaskPage'

export default function App() {
	return (
		<Routes>
			<Route path='/:taskId' element={<TaskPage />} />
		</Routes>
	)
}
