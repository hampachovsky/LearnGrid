import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: 'classes',
			filename: 'remoteEntry.js',
			exposes: {
				'./App': './src/App.jsx',
			},
			shared: ['react', 'react-dom'],
		}),
	],

	server: {
		port: 5175,
		cors: true,
	},

	preview: {
		port: 5175,
		cors: true,
		host: true,
	},

	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
})
