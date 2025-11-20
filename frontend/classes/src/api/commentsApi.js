import { api } from './axios'

export const createComment = async ({ content, type, entityId }) => {
	const res = await api.post('/comments', { content, type, entityId })
	return res.data
}

export const updateComment = async (commentId, content) => {
	const res = await api.patch(`/comments/${commentId}`, { content })
	return res.data
}

export const deleteComment = async (commentId) => {
	const res = await api.delete(`/comments/${commentId}`)
	return res.data
}
