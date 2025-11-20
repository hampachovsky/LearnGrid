import Announcement from './Announcement'
import AnnouncementEditor from './AnnouncementEditor'

export default function ClassStream({ announcements }) {
	return (
		<div className='mt-6 space-y-6'>
			<AnnouncementEditor onSubmit={(text) => console.log('create announcement:', text)} />

			{announcements.length === 0 && <p className='text-gray-500'>Поки що немає оголошень</p>}

			{announcements.map((a) => (
				<Announcement key={a.id} a={a} />
			))}
		</div>
	)
}
