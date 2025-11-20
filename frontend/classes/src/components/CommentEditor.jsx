import { useState } from 'react'

export default function CommentEditor({ onSubmit }) {
	const [text, setText] = useState('')

	const send = () => {
		if (!text.trim()) return
		onSubmit(text)
		setText('')
	}

	return (
		<div className='flex gap-2 mt-2'>
			<input
				className='flex-grow border rounded-lg p-2 focus:outline-blue-500'
				placeholder='Додати коментар…'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button onClick={send} className='px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
				Надіслати
			</button>
		</div>
	)
}
