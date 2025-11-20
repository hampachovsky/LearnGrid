export default function UserCard({ user }) {
	return (
		<div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4'>
			<div className='w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold'>
				{user.firstName[0]}
			</div>

			<div>
				<p className='text-gray-900 font-semibold'>
					{user.firstName} {user.secondName}
				</p>
				<p className='text-gray-500 text-sm'>{user.email}</p>
			</div>
		</div>
	)
}
