import { Navigate, Route, Routes } from 'react-router'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/login' replace />} />
			<Route path='/login' element={<LoginForm />} />
			<Route path='/register' element={<RegisterForm />} />
		</Routes>
	)
}
