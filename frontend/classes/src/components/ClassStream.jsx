import Announcement from './Announcement'
import AnnouncementEditor from './AnnouncementEditor'
import StreamTaskCard from './StreamTaskCard'

export default function ClassStream({ announcements, tasks, me, classId }) {
	return (
		<div className='mt-6 space-y-6'>
			<AnnouncementEditor isTeacher={me.role === 'teacher'} classId={classId} />

			{announcements.map((a) => (
				<Announcement me={me} key={a.id} a={a} isTeacher={me.role === 'teacher'} />
			))}

			{tasks.length > 0 && (
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Нові завдання</h3>
					{tasks.map((t) => (
						<StreamTaskCard key={t.id} task={t} />
					))}
				</div>
			)}
		</div>
	)
}
