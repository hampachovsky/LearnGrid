import Announcement from './Announcement'
import AnnouncementEditor from './AnnouncementEditor'

export default function ClassStream({ announcements, me, classId }) {
	return (
		<div className='mt-6 space-y-6'>
			<AnnouncementEditor isTeacher={me.role === 'teacher'} classId={classId} />

			{announcements.map((a) => (
				<Announcement me={me} key={a.id} a={a} isTeacher={me.role === 'teacher'} />
			))}
		</div>
	)
}
