import { api } from './axios'

export const createTopic = async (classId, title) => {
	const res = await api.post(`/classes/${classId}/topics`, { title })
	return res.data
}

export const updateTopic = async (topicId, title) => {
	const res = await api.patch(`/classes/topics/${topicId}`, { title })
	return res.data
}

export const deleteTopic = async (topicId) => {
	const res = await api.delete(`/classes/topics/${topicId}`)
	return res.data
}
