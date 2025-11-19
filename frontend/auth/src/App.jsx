// Auth/src/App.jsx
import { Navigate, Route, Routes } from 'react-router'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default function App({ onLogin }) {
	return (
		<div className='p-4'>
			<Routes>
				<Route path='/' element={<Navigate to='login' replace />} />
				<Route path='login' element={<LoginForm onLogin={onLogin} />} />
				<Route path='register' element={<RegisterForm />} />
			</Routes>
		</div>
	)
}
