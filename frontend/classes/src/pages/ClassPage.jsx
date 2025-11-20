import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router'

import { fetchClassDetails, fetchMembers, fetchTopics } from '../api/classesApi'

import { fetchMe } from '../api/announcementsApi'
import ClassHeader from '../components/ClassHeader'
import ClassStream from '../components/ClassStream'
import ClassTabs from '../components/ClassTabs'
import MembersTab from '../components/MembersTab'
import TopicFilter from '../components/TopicFilter'
import TopicTasks from '../components/TopicTasks'
import TopicCreate from '../components/TopicCreate'
import TopicItem from '../components/TopicItem'

export default function ClassPage() {
	const { id } = useParams()
	const [activeTab, setActiveTab] = useState('Стрічка')
	const [activeTopic, setActiveTopic] = useState('all')

	const { data, isLoading, isError } = useQuery({
		queryKey: ['class', id],
		queryFn: () => fetchClassDetails(id),
	})

	const topicsQuery = useQuery({
		queryKey: ['topics', id],
		queryFn: () => fetchTopics(id),
	})

	const membersQuery = useQuery({
		queryKey: ['members', id],
		queryFn: () => fetchMembers(id),
	})

	const meQuery = useQuery({
		queryKey: ['me'],
		queryFn: fetchMe,
	})

	if (isLoading) return <p className='p-6'>Завантаження…</p>
	if (isError) return <p className='p-6 text-red-500'>Помилка</p>

	if (meQuery.isLoading) return <p className='p-6'>Завантаження…</p>
	if (membersQuery.isLoading) return <p className='p-6'>Завантаження…</p>
	if (!membersQuery.data) return <p className='p-6 text-red-500'>Помилка завантаження учасників</p>

	const me = meQuery.data

	const { class: classInfo, announcements, tasks } = data

	const topics = topicsQuery.data
	const { teacher, students } = membersQuery.data

	return (
		<div className='p-6'>
			<ClassHeader classInfo={classInfo} />

			<ClassTabs onChange={(tab) => setActiveTab(tab)} />

			{activeTab === 'Стрічка' && <ClassStream classId={id} me={me} announcements={announcements} tasks={tasks} />}

			{activeTab === 'Завдання' && (
				<div className='mt-6'>
					<TopicCreate classId={id} isTeacher={me.role === 'teacher'} />

					<TopicFilter topics={topics} active={activeTopic} onChange={setActiveTopic} />

					<div className='space-y-5 mt-4'>
						{topics.map((t) => (
							<TopicItem key={t.id} topic={t} classId={id} isTeacher={me.role === 'teacher'} />
						))}
					</div>

					<TopicTasks topics={topics} tasks={tasks} filter={activeTopic} />
				</div>
			)}

			{activeTab === 'Учасники' && <MembersTab teacher={teacher} students={students} />}

			{activeTab === 'Оцінки' && <p className='mt-6 text-gray-600'>Тут будуть оцінки…</p>}
		</div>
	)
}
