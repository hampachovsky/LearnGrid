import React from 'react'
const AuthApp = React.lazy(() => import('auth/App'))

export default function AuthWrapper(props) {
	return (
		<React.Suspense fallback='Завантаження...'>
			<AuthApp {...props} />
		</React.Suspense>
	)
}
