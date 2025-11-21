import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

export function formatTime(dateString) {
	if (!dateString) return ''

	const d = new Date(dateString)

	const kyivOffset = 2 * 60
	const currentOffset = d.getTimezoneOffset() * -1
	const diff = (kyivOffset - currentOffset) * 60 * 1000

	const fixed = new Date(d.getTime() + diff)

	return fixed.toLocaleString('uk-UA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
}
