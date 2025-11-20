import { Route, Routes } from 'react-router'
import ClassPage from './pages/ClassPage'
import ClassesPage from './pages/ClassesPage'

export default function App() {
	return (
		<div className='min-h-screen bg-gray-100'>
			<Routes>
				{/* <Route path='/' element={<Navigate to='classes' replace />} /> */}
				<Route path='' element={<ClassesPage />} />
				<Route path='/:id' element={<ClassPage />} />
			</Routes>
		</div>
	)
}
