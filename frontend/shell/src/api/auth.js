import axios from 'axios'

export const authMe = async () => {
	const res = await axios.get('http://localhost:3000/api/auth/me', {
		withCredentials: true,
	})
	return res.data
}
