import { useState } from 'react'

export default function AnnouncementEditor({ onSubmit }) {
	const [text, setText] = useState('')
	const [open, setOpen] = useState(false)

	const post = () => {
		if (!text.trim()) return
		onSubmit(text)
		setText('')
		setOpen(false)
	}

	return (
		<div className='bg-white shadow rounded-xl p-4 mb-4'>
			{!open ? (
				<div
					className='border rounded-lg p-3 text-gray-500 cursor-pointer hover:bg-gray-50'
					onClick={() => setOpen(true)}
				>
					Напишіть оголошення…
				</div>
			) : (
				<div>
					<textarea
						className='w-full border rounded-lg p-3 focus:outline-blue-500'
						rows={3}
						placeholder='Текст оголошення...'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>

					<div className='flex justify-end mt-3 gap-2'>
						<button className='px-4 py-2 bg-gray-100 rounded hover:bg-gray-200' onClick={() => setOpen(false)}>
							Скасувати
						</button>

						<button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700' onClick={post}>
							Опублікувати
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
