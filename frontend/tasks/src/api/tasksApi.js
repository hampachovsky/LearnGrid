import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
})

export const getTaskById = async (id) => {
	const res = await api.get(`/tasks/${id}`)
	return res.data
}

export const submitHomework = async ({ taskId, content }) => {
	const res = await api.post(`/tasks/${taskId}/submit`, { content })
	return res.data
}
