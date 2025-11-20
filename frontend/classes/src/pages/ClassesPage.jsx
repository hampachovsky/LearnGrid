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
		<div className='px-2 xs:px-3 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto'>
			<h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left'>Мої класи</h1>

			{sortedClasses.length === 0 && (
				<div className='mt-16 text-center text-gray-500 text-lg sm:text-xl'>Ви ще не приєдналися до жодного класу</div>
			)}

			{sortedClasses.length > 0 && (
				<div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
					{sortedClasses.map((cls) => (
						<ClassCard key={cls.id} classItem={cls} />
					))}
				</div>
			)}
		</div>
	)
}
