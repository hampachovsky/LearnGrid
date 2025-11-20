import { ArrowLeftOnRectangleIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { updateClassName } from '../api/classesApi'
import { getColorById } from '../utils/getColors'
import EditClassModal from './modals/EditClassModal'
import LeaveClassModal from './modals/LeaveClassModal'

export default function ClassHeader({ classInfo, me }) {
	const [leaveOpen, setLeaveOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)

	const qc = useQueryClient()

	const updateMutation = useMutation({
		mutationFn: (name) => updateClassName(classInfo.id, name),
		onSuccess() {
			qc.invalidateQueries(['class', classInfo.id])
			setEditOpen(false)
		},
	})

	return (
		<>
			<div className={`h-40 rounded-xl bg-gradient-to-r ${getColorById(classInfo.id)} text-white p-6 shadow relative`}>
				<h1 className='text-3xl font-bold'>{classInfo.name}</h1>
				<p className='opacity-90 mt-2'>Код курсу: {classInfo.code}</p>

				<div className='absolute top-4 right-4 flex gap-3'>
					{me.role === 'teacher' && (
						<button
							onClick={() => setEditOpen(true)}
							className='p-2 bg-white/20 hover:bg-white/30 rounded-xl cursor-pointer'
						>
							<PencilIcon className='w-6 h-6' />
						</button>
					)}

					<button
						onClick={() => setLeaveOpen(true)}
						className='p-2 bg-white/20 hover:bg-white/30 rounded-xl cursor-pointer'
					>
						<ArrowLeftOnRectangleIcon className='w-6 h-6 text-red-200' />
					</button>
				</div>
			</div>

			<LeaveClassModal open={leaveOpen} onClose={() => setLeaveOpen(false)} code={classInfo.code} />

			<EditClassModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				initialName={classInfo.name}
				onSave={(name) => updateMutation.mutate(name)}
			/>
		</>
	)
}
