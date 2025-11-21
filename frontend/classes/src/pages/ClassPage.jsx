import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { fetchClassDetails, fetchMembers, fetchTopics } from '../api/classesApi'

import { useNavigate } from 'react-router'
import { fetchMe } from '../api/announcementsApi'
import ClassHeader from '../components/ClassHeader'
import ClassStream from '../components/ClassStream'
import ClassTabs from '../components/ClassTabs'
import GradesTab from '../components/GradesTab'
import MembersTab from '../components/MembersTab'
import TopicCreate from '../components/TopicCreate'
import TopicFilter from '../components/TopicFilter'
import TopicTasks from '../components/TopicTasks'
import CreateTaskModal from '../components/modals/CreateTaskModal'

export default function ClassPage() {
	const { id } = useParams()
	const [activeTab, setActiveTab] = useState('Стрічка')
	const [activeTopic, setActiveTopic] = useState('all')
	const navigate = useNavigate()
	const [taskModal, setTaskModal] = useState(false)

	const classQuery = useQuery({
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

	const topics = topicsQuery.data ? [...topicsQuery.data].reverse() : []

	useEffect(() => {
		if (activeTopic !== 'all' && !topics.some((t) => t.id === Number(activeTopic))) {
			const timer = setTimeout(() => setActiveTopic('all'), 0)
			return () => clearTimeout(timer)
		}
	}, [topics, activeTopic])

	if (classQuery.isLoading || membersQuery.isLoading || meQuery.isLoading) {
		return <p className='p-6'>Завантаження…</p>
	}

	if (classQuery.isError) return <p className='p-6 text-red-500'>Помилка</p>
	if (membersQuery.isError) return <p className='p-6 text-red-500'>Помилка завантаження учасників</p>

	const me = meQuery.data
	const { teacher, students } = membersQuery.data

	const isStudent = students?.some((s) => s.id === me.id)
	const isTeacher = teacher?.id === me.id

	if (!isStudent && !isTeacher) {
		navigate('/')
	}

	const { class: classInfo, announcements, tasks } = classQuery.data

	return (
		<div className='p-6'>
			<ClassHeader classInfo={classInfo} me={me} />
			<ClassTabs onChange={(tab) => setActiveTab(tab)} />

			{activeTab === 'Стрічка' && <ClassStream classId={id} me={me} announcements={announcements} tasks={tasks} />}

			{activeTab === 'Завдання' && (
				<div className='mt-6'>
					<TopicCreate classId={id} isTeacher={isTeacher} />

					{me.role === 'teacher' && (
						<button
							onClick={() => setTaskModal(true)}
							className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4 cursor-pointer'
						>
							+ Нове завдання
						</button>
					)}

					<CreateTaskModal open={taskModal} onClose={() => setTaskModal(false)} classId={id} topics={topics} />

					<TopicFilter topics={topics} active={activeTopic} onChange={setActiveTopic} />

					<TopicTasks topics={topics} tasks={tasks} filter={activeTopic} classId={id} isTeacher={isTeacher} />
				</div>
			)}

			{activeTab === 'Учасники' && <MembersTab teacher={teacher} students={students} />}

			{activeTab === 'Оцінки' && <GradesTab classId={id} isTeacher={me.role === 'teacher'} me={me} />}
		</div>
	)
}
