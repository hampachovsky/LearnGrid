import axios from 'axios'

export const loginRequest = async (payload) => {
	const { data } = await axios.post('http://localhost:3000/api/auth/login', payload, {
		withCredentials: true,
	})

	return data
}

export const registerRequest = async (payload) => {
	const { data } = await axios.post('http://localhost:3000/api/auth/register', payload, { withCredentials: true })
	return data
}
