/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'smip-red': '#FF0000',
				'smip-black': '#000000',
				'smip-white': '#FFFFFF',
			},
			animation: {
				kenburns: 'kenburns 20s ease infinite',
			},
			keyframes: {
				kenburns: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' },
					'100%': { transform: 'scale(1)' },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}