import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { joinClass } from '../api/classesApi'

export function useJoinClass() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: joinClass,
		onSuccess: () => {
			queryClient.invalidateQueries(['classes'])
			navigate('/')
		},
	})
}
