import { api } from './axios'

export const fetchClasses = async () => {
	const res = await api.get('/classes/my')
	return res.data
}
