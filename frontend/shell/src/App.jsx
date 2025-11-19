import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Header from './components/Header'
import NotFound from './components/NotFound'
import ProtectedFromAuth from './components/Protected/ProtectedFromAuth'
import ProtectedRoute from './components/Protected/ProtectedRoute'
import MobileSidebarDrawer from './components/Sidebar/MobileSidebar'
import Sidebar from './components/Sidebar/Sidebar'
import { UserContext } from './context/UserContext'

const Auth = React.lazy(() => import('auth/App'))
const Classes = React.lazy(() => import('classes/App'))

export default function App() {
	const { user, logout, refetch } = useContext(UserContext)
	const [isDrawerOpen, setDrawerOpen] = useState(false)

	const isTeacher = user?.role === 'teacher'
	const isStudent = user?.role === 'student'

	return (
		<div className='min-h-screen bg-gray-100'>
			<Header user={user} logout={logout} onMenuOpen={() => setDrawerOpen(true)} />

			<MobileSidebarDrawer
				isOpen={isDrawerOpen}
				onClose={() => setDrawerOpen(false)}
				isTeacher={isTeacher}
				isStudent={isStudent}
			/>

			<div className='flex'>
				{user && <Sidebar isTeacher={isTeacher} isStudent={isStudent} />}

				<main className='flex-1 p-6 sm:p-8'>
					<React.Suspense fallback='Завантаження класів...'>
						<Routes>
							<Route path='/' element={user ? <Dashboard /> : <Navigate to='/auth/login' />} />

							<Route
								path='/auth/*'
								element={
									<ProtectedFromAuth>
										<Auth onLogin={() => refetch()} />
									</ProtectedFromAuth>
								}
							/>

							<Route
								path='/classes'
								element={
									<ProtectedRoute>
										<Classes />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/join'
								element={
									<ProtectedRoute>
										<JoinClassPage />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/create-class'
								element={
									<ProtectedRoute>
										<CreateClassPage />
									</ProtectedRoute>
								}
							/>

							<Route path='*' element={<NotFound />} />
						</Routes>
					</React.Suspense>
				</main>
			</div>
		</div>
	)
}
function Dashboard() {
	return (
		<div>
			<h1 className='text-2xl font-semibold mb-2'>Вітаємо у LearnGrid 🎓</h1>
			<p className='text-gray-700'>Оберіть клас або створіть новий.</p>
		</div>
	)
}

function ClassesList() {
	return (
		<div>
			<h2 className='text-xl font-semibold mb-3'>Мої класи</h2>
			<p>Тут буде список класів з MFE 👇</p>
		</div>
	)
}

function JoinClassPage() {
	return (
		<div>
			<h2 className='text-xl font-semibold mb-3'>Приєднатися до класу</h2>
			<input placeholder='Введіть код класу' className='px-3 py-2 border rounded w-64' />
			<button className='ml-3 px-4 py-2 bg-blue-600 text-white rounded'>Приєднатися</button>
		</div>
	)
}

function CreateClassPage() {
	return (
		<div>
			<h2 className='text-xl font-semibold mb-3'>Створити клас</h2>
			<input placeholder='Назва класу' className='px-3 py-2 border rounded w-64' />
			<button className='ml-3 px-4 py-2 bg-green-600 text-white rounded'>Створити</button>
		</div>
	)
}
