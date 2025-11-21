import { api } from './tasksApi'

export const createComment = async ({ content, entityId }) => {
	const res = await api.post('/comments', {
		content,
		type: 'task',
		entityId,
	})
	return res.data
}

export const updateComment = async ({ id, content }) => {
	const res = await api.patch(`/comments/${id}`, { content })
	return res.data
}

export const deleteComment = async (id) => {
	const res = await api.delete(`/comments/${id}`)
	return res.data
}
