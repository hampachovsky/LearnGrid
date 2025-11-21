import { api } from './axios'

export async function createTask(payload) {
	const res = await api.post('/tasks', payload, {
		withCredentials: true,
	})
	return res.data
}

export const updateTask = (taskId, payload) =>
	api.put(`/tasks/${taskId}`, payload, {
		withCredentials: true,
	})

export const deleteTask = (taskId) =>
	api.delete(`/tasks/${taskId}`, {
		withCredentials: true,
	})
