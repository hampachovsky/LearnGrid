import { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../../context/UserContext'

export default function ProtectedFromAuth({ children }) {
	const { user, isLoading } = useContext(UserContext)

	if (isLoading) return <div className='p-4'>Завантаження...</div>

	if (user) return <Navigate to='/' />

	return children
}
