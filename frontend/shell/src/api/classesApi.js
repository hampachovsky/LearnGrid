import axios from 'axios'

const API_URL = 'http://localhost:3000/api/classes'

export const createClass = async (data) => {
	const res = await axios.post(API_URL, data, {
		withCredentials: true,
	})
	return res.data
}

export const joinClass = async (data) => {
	const res = await axios.post(`${API_URL}/join`, data, {
		withCredentials: true,
	})
	return res.data
}

export const getClasses = async () => {
	const res = await axios.get(API_URL, {
		withCredentials: true,
	})
	return res.data
}
