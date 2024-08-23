/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

export default {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	// corePlugins: {
	//   preflight: false,
	// },
	theme: {
		extend: {
			keyframes: {
				bounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-3%)' },
				},
			},
			animation: {
				bounce: 'bounce 0.3s ease-in-out',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
