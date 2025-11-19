// src/pages/ClassesPage.jsx

import { useQuery } from '@tanstack/react-query'
import { fetchClasses } from '../api/classesApi'
import ClassCard from '../components/ClassCard'

export default function ClassesPage() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['classes'],
		queryFn: fetchClasses,
	})

	if (isLoading) return <p className='text-center mt-10'>Завантаження...</p>
	if (isError) return <p className='text-center mt-10 text-red-500'>Помилка при завантаженні класів</p>

	const sortedClasses = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-6'>Мої класи</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{sortedClasses.map((cls) => (
					<ClassCard key={cls.id} classItem={cls} />
				))}
			</div>
		</div>
	)
}
