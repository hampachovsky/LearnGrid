const colors = [
	'from-blue-500 to-blue-600',
	'from-green-500 to-green-600',
	'from-purple-500 to-purple-600',
	'from-rose-500 to-rose-600',
	'from-indigo-500 to-indigo-600',
	'from-teal-500 to-teal-600',
]

export function getColorById(id) {
	return colors[id % colors.length]
}
