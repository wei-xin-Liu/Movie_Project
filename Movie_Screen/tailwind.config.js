/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

export default {
  content: [    
    "./src/**/*.{js,ts,jsx,tsx}",
	'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-1%)' },
          '50%': { transform: 'translateX(1%)' },
          '75%': { transform: 'translateX(-1%)' },
        },
      },
      animation: {
        shake: 'shake 0.1s ease-in-out',
      },
    },
  },
  plugins: [],
}

