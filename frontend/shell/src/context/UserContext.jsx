import { useQuery } from '@tanstack/react-query'
import { createContext } from 'react'
import { authMe } from '../api/auth'

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null)

export function UserProvider({ children }) {
	const {
		data: user,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['authMe'],
		queryFn: authMe,
		retry: false,
	})

	const logout = () => {
		fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			credentials: 'include',
		})
		refetch()
	}

	return <UserContext.Provider value={{ user, isLoading, refetch, logout }}>{children}</UserContext.Provider>
}
