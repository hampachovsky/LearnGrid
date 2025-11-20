import { api } from './axios'

export const createAnnouncement = async (classId, content) => {
	const res = await api.post(`/classes/${classId}/announcements`, { content })
	return res.data
}

export const updateAnnouncement = async (announcementId, content) => {
	const res = await api.patch(`/classes/announcements/${announcementId}`, {
		content,
	})
	return res.data
}

export const fetchMe = async () => {
	const res = await api.get('/auth/me')
	return res.data
}

export const deleteAnnouncement = async (announcementId) => {
	const res = await api.delete(`/classes/announcements/${announcementId}`)
	return res.data
}
