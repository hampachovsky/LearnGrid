import { api } from './tasksApi'

export const getMe = async () => {
	const res = await api.get('/auth/me')
	return res.data
}
