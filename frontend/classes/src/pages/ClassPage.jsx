import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { fetchClassDetails } from '../api/classesApi'

import ClassHeader from '../components/ClassHeader'
import ClassStream from '../components/ClassStream'
import ClassTabs from '../components/ClassTabs'

export default function ClassPage() {
	const { id } = useParams()

	const { data, isLoading, isError } = useQuery({
		queryKey: ['class', id],
		queryFn: () => fetchClassDetails(id),
	})

	if (isLoading) return <p className='p-6'>Завантаження...</p>
	if (isError) return <p className='p-6 text-red-500'>Помилка завантаження</p>

	const { class: classInfo, announcements } = data

	return (
		<div className='p-6'>
			<ClassHeader classInfo={classInfo} />

			<ClassTabs onChange={(tab) => console.log('tab:', tab)} />

			<ClassStream announcements={announcements} />
		</div>
	)
}
