import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext } from 'react'
import { authMe } from '../api/auth'

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null)

export function UserProvider({ children }) {
	const queryClient = useQueryClient()

	const {
		data: user,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['authMe'],
		queryFn: authMe,
		retry: false,
	})

	const logout = async () => {
		await fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			credentials: 'include',
		})

		queryClient.setQueryData(['authMe'], null)

		queryClient.invalidateQueries(['authMe'])
	}

	return <UserContext.Provider value={{ user, isLoading, refetch, logout }}>{children}</UserContext.Provider>
}
