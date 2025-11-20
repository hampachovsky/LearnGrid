import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { createClass } from '../api/classesApi'

export function useCreateClass() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createClass,
		onSuccess: () => {
			queryClient.invalidateQueries(['classes'])
			navigate('/')
		},
	})
}
