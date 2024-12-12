/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	mode: 'jit',
	plugins: [
		require('tailwindcss-animate'),
		require('tailwind-scrollbar')({ nocompatible: true }),
	],
	theme: {
		extend: {
			fontFamily: {
				mplus: ["'proxima-soft'", 'Verdana', 'sans-serif'],
				mono: [
					"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				],
			},
			boxShadow: {
				ng: '0 1px 10px rgba(0, 0, 0, 0.1)',
			},
			colors: {
				light: {
					bg: '#ECEFF4',
					caret: '#8FBCBB',
					main: '#88C0D0',
					sub: '#6A7791',
					subAlt: '#D8DEE9',
					text: '#8FBCBB',
					error: '#BF616A',
					errorExtra: '#793E44',
				},
				dark: {
					bg: '#242933',
					caret: '#eceff4',
					main: '#88c0d0',
					sub: '#929aaa',
					subAlt: '#2e3440',
					text: '#d8dee9',
					error: '#bf616a',
					errorExtra: '#793e44',
				},
				red: '#BF616A',
				orange: '#D08770',
				yellow: '#EBCB8B',
				green: '#A3BE8C',
				purple: '#B48EAD',
				blue: '#5E81AC',
			},
		},
	},
} satisfies Config;
