import { api } from './axios'

export const fetchSubmissionsByClass = (classId) => {
	return api.get(`/submissions/class/${classId}`, { withCredentials: true }).then((r) => r.data)
}

export const gradeSubmission = (submissionId, grade) => {
	return api.put(`/submissions/${submissionId}/grade`, { grade }, { withCredentials: true }).then((r) => r.data)
}
