import { TrashIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAnnouncement } from '../api/announcementsApi'
import { formatTime } from '../utils/formatTime'
import CommentEditor from './CommentsEditor'
import CommentItem from './CommentsItem'

export default function Announcement({ a, classId, isTeacher, me }) {
	const qc = useQueryClient()

	const deleteMutation = useMutation({
		mutationFn: () => deleteAnnouncement(a.id),
		onSuccess() {
			qc.invalidateQueries(['class', classId])
		},
	})

	return (
		<div className='bg-white shadow-md rounded-xl p-5 space-y-5'>
			<div className='flex justify-between items-start'>
				<p className='text-gray-800 text-lg'>{a.content}</p>

				{isTeacher && (
					<button onClick={() => deleteMutation.mutate()} className='text-red-500 hover:text-red-700 cursor-pointer'>
						<TrashIcon className='w-6 h-6' />
					</button>
				)}
			</div>

			<p className='text-xs text-gray-400'>{formatTime(a.created_at)}</p>

			{a.comments.length > 0 && (
				<div className='space-y-3'>
					{a.comments.map((c) => (
						<CommentItem key={c.id} c={c} me={me} classId={classId} />
					))}
				</div>
			)}

			<CommentEditor announcementId={a.id} classId={classId} />
		</div>
	)
}
