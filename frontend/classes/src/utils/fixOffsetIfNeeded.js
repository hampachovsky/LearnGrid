import dayjs from 'dayjs'

export function fixOffsetIfNeeded(dateString) {
	if (!dateString) return ''

	return dayjs(dateString).subtract(2, 'hour').format('DD.MM.YYYY HH:mm:ss')
}
