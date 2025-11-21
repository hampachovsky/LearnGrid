import { api } from './tasksApi'

export const createSubmission = async ({ taskId, content }) => {
	const res = await api.post('/submissions', {
		task_id: taskId,
		content,
	})
	return res.data
}

export const updateSubmission = async ({ submissionId, content }) => {
	const res = await api.put(`/submissions/${submissionId}`, { content })
	return res.data
}

export const deleteSubmission = async (submissionId) => {
	const res = await api.delete(`/submissions/${submissionId}`)
	return res.data
}
