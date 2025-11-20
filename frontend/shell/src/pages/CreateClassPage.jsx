import { useState } from 'react'
import { useCreateClass } from '../hooks/useCreateClass'

export default function CreateClassPage() {
	const [name, setName] = useState('')
	const { mutate, isPending, isSuccess } = useCreateClass()

	const handleCreate = () => {
		if (!name.trim()) return
		mutate({ name })
	}

	return (
		<div className='bg-white p-6 rounded-xl shadow-md w-full max-w-xl'>
			<h2 className='text-xl font-semibold mb-4'>Створити клас</h2>

			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Назва класу'
				className='px-3 py-2 border rounded-lg w-full shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500'
			/>

			<button
				onClick={handleCreate}
				disabled={isPending}
				className='
					ml-3 mt-3 px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm
					hover:bg-green-700 transition disabled:opacity-60
				'
			>
				{isPending ? 'Створення...' : 'Створити'}
			</button>

			{isSuccess && <p className='text-green-600 mt-2'>Клас створено успішно!</p>}
		</div>
	)
}
