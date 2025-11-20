export default function ClassHeader({ classInfo }) {
	return (
		<div className='h-40 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow'>
			<h1 className='text-3xl font-bold'>{classInfo.name}</h1>
			<p className='opacity-90 mt-2'>Код курсу: {classInfo.code}</p>
		</div>
	)
}
