export default function ModalWrapper({ children, onClose }) {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
			<div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={onClose} />

			<div className='relative z-10 w-full max-w-lg'>{children}</div>
		</div>
	)
}
