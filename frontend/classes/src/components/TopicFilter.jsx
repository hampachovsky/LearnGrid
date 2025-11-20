export default function TopicFilter({ topics, active, onChange }) {
	return (
		<div className='mb-4'>
			<select
				value={active}
				onChange={(e) => onChange(e.target.value)}
				className='border p-2 rounded-lg bg-white shadow-sm'
			>
				<option value='all'>Всі теми</option>
				{topics.map((t) => (
					<option key={t.id} value={t.id}>
						{t.title}
					</option>
				))}
			</select>
		</div>
	)
}
