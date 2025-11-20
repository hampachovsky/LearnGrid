import { useState } from 'react'
import { useJoinClass } from '../hooks/useJoinClass'

export default function JoinClassPage() {
	const [code, setCode] = useState('')
	const { mutate, isPending, isSuccess } = useJoinClass()

	const handleJoin = () => {
		if (!code.trim()) return
		mutate({ code })
	}

	return (
		<div className='bg-white p-6 rounded-xl shadow-md w-full max-w-xl'>
			<h2 className='text-xl font-semibold mb-4'>Приєднатися до класу</h2>

			<input
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder='Код класу'
				className='px-3 py-2 border rounded-lg w-full shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
			/>

			<button
				onClick={handleJoin}
				disabled={isPending}
				className='
					ml-3 mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm
					hover:bg-blue-700 transition disabled:opacity-60
				'
			>
				{isPending ? 'Приєднання...' : 'Приєднатися'}
			</button>

			{isSuccess && <p className='text-green-600 mt-2'>Успішно приєднано!</p>}
		</div>
	)
}
