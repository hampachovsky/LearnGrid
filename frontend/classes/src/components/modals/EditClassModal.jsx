import { useState } from 'react'

export default function EditClassModal({ open, onClose, onSave, initialName }) {
	const [name, setName] = useState(initialName || '')

	if (!open) return null

	return (
		<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-[999]'>
			<div className='bg-white p-6 rounded-xl shadow-lg w-96'>
				<h2 className='text-lg font-semibold mb-3'>Редагування класу</h2>

				<input
					className='border rounded px-3 py-2 w-full mb-4'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Назва класу'
				/>

				<div className='flex justify-end gap-2'>
					<button onClick={onClose} className='px-3 py-1 bg-gray-200 rounded cursor-pointer'>
						Скасувати
					</button>

					<button onClick={() => onSave(name)} className='px-3 py-1 bg-blue-600 text-white rounded cursor-pointer'>
						Зберегти
					</button>
				</div>
			</div>
		</div>
	)
}
