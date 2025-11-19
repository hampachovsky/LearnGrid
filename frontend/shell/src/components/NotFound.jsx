export default function NotFound() {
	return (
		<div className='text-center mt-20'>
			<h1 className='text-4xl font-bold mb-4'>404</h1>
			<p className='text-gray-600 mb-6'>Сторінку не знайдено</p>

			<a href='/' className='text-blue-600 underline hover:text-blue-700 transition'>
				На головну
			</a>
		</div>
	)
}
