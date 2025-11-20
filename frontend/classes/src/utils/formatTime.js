import dayjs from 'dayjs'
import utc from 'dayjs-plugin-utc'

dayjs.extend(utc)

export function formatTime(dateString) {
	return dayjs(dateString).format('DD.MM.YYYY, HH:mm:ss')
}
