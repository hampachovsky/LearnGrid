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

export const leaveClass = async (code) => {
	const res = await api.post('/classes/leave', { code })
	return res.data
}

export const updateClassName = async (classId, name) => {
	const res = await api.patch(`/classes/${classId}`, { name })
	return res.data
}
