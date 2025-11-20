import { useState } from 'react'

export default function ClassTabs({ onChange }) {
	const tabs = ['Стрічка', 'Завдання', 'Учасники', 'Оцінки']
	const [active, setActive] = useState('Стрічка')

	const select = (tab) => {
		setActive(tab)
		onChange(tab)
	}

	return (
		<div className='flex gap-6 mt-4 border-b'>
			{tabs.map((tab) => (
				<button
					key={tab}
					onClick={() => select(tab)}
					className={`pb-3 text-lg font-medium cursor-pointer ${
						active === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'
					}`}
				>
					{tab}
				</button>
			))}
		</div>
	)
}
