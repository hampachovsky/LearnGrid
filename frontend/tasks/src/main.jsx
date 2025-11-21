import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'

const qc = new QueryClient()

createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={qc}>
		<MemoryRouter initialEntries={[window.location.pathname]}>
			<App />
		</MemoryRouter>
	</QueryClientProvider>,
)
