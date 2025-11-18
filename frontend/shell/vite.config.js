import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		federation({
			remotes: {
				classes: 'http://localhost:5175/assets/remoteEntry.js',
				auth: 'http://localhost:5174/assets/remoteEntry.js',
				tasks: 'http://localhost:5176/assets/remoteEntry.js',
				grades: 'http://localhost:5177/assets/remoteEntry.js',
			},
			shared: ['react', 'react-dom'],
		}),
	],
	server: {
		port: 5173,
		cors: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
})
