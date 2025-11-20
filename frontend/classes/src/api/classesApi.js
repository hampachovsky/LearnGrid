import { api } from './axios'

export const fetchClasses = async () => {
	const res = await api.get('/classes/my')
	return res.data
}

export const fetchClassDetails = async (classId) => {
	const res = await api.get(`/classes/${classId}`)
	return res.data
}

export const fetchTopics = async (classId) => {
	const res = await api.get(`/classes/${classId}/topics`)
	return res.data
}

export const fetchMembers = async (classId) => {
	const res = await api.get(`/classes/${classId}/members`)
	return res.data
}
