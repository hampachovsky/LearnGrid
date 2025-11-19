import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { loginRequest } from '../services/authApi'
import { mapErrorMessage } from '../utils/errorMessages'

export default function LoginForm() {
	const [serverError, setServerError] = useState(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const mutation = useMutation({
		mutationFn: loginRequest,
		onSuccess: () => {
			setServerError(null)
			console.log('Login success')
		},
		onError: (err) => {
			const status = err?.response?.status
			setServerError(mapErrorMessage(status))
		},
	})

	const onSubmit = (values) => {
		mutation.mutate(values)
	}

	return (
		<div className='w-full min-h-screen flex items-center justify-center bg-gray-100'>
			<form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-lg rounded-xl p-8 w-full max-w-sm'>
				<h2 className='text-2xl font-semibold mb-6 text-center'>Вхід</h2>

				{serverError && <div className='text-red-600 text-sm mb-4 text-center'>{serverError}</div>}

				<div className='mb-4'>
					<label className='block text-gray-700 mb-1 text-sm'>Пошта</label>
					<input
						type='email'
						{...register('email', { required: 'Введіть пошту' })}
						className='w-full border rounded-md px-3 py-2'
					/>
					{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
				</div>

				<div className='mb-6'>
					<label className='block text-gray-700 mb-1 text-sm'>Пароль</label>
					<input
						type='password'
						{...register('password', {
							required: 'Пароль обовʼязковий',
							minLength: {
								value: 1,
								message: 'Пароль повинен містити хоча б 1 символ',
							},
						})}
						className='w-full border rounded-md px-3 py-2'
					/>
					{errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
				</div>

				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition cursor-pointer'
					disabled={mutation.isPending}
				>
					{mutation.isPending ? 'Завантаження...' : 'Увійти'}
				</button>

				<p className='text-center text-sm mt-4'>
					Немає акаунта?{' '}
					<Link to='/register' className='text-blue-600 hover:underline'>
						Зареєструватися
					</Link>
				</p>
			</form>
		</div>
	)
}
