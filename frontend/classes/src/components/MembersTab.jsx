import UserCard from './UserCard'

export default function MembersTab({ teacher, students }) {
	return (
		<div className='mt-6 space-y-8'>
			{/* Викладач */}
			<div>
				<h2 className='text-lg font-semibold mb-3'>Викладач</h2>
				<UserCard user={teacher} />
			</div>

			<div>
				<h2 className='text-lg font-semibold mb-3'>Студенти ({students.length})</h2>

				<div className='space-y-3'>
					{students.map((s) => (
						<UserCard key={s.id} user={s} />
					))}
				</div>
			</div>
		</div>
	)
}
