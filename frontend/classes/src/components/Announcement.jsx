import CommentEditor from './CommentEditor'

export default function Announcement({ a }) {
	return (
		<div className='bg-white shadow rounded-xl p-4'>
			<p className='text-gray-800'>{a.content}</p>

			<p className='text-xs text-gray-400 mt-1'>{new Date(a.created_at).toLocaleString('uk-UA')}</p>

			<div className='mt-4 space-y-3'>
				{a.comments.map((c) => (
					<div key={c.id} className='p-2 bg-gray-50 border rounded-md text-sm'>
						<p>{c.content}</p>
						<p className='text-xs text-gray-400'>{new Date(c.created_at).toLocaleString('uk-UA')}</p>
					</div>
				))}

				<CommentEditor onSubmit={(text) => console.log('new comment:', text)} />
			</div>
		</div>
	)
}
