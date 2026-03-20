import React, { useEffect, useState } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';

const themes = ['light', 'dark'];

export default function ThemeToggle() {
	const [isMounted, setIsMounted] = useState(false);
	const [theme, setTheme] = useState(() => {
		if (import.meta.env.SSR) {
			return undefined;
		}
		if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
			return localStorage.getItem('theme');
		}
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
		return 'light';
	});

	const toggleTheme = () => {
		const t = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', t);
		setTheme(t);
	};

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove('light', 'dark');
		if (theme) {
			root.classList.add(theme);
		}
	}, [theme]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return isMounted ? (
		<button
			type='button'
			className='p-2 rounded-lg hover:bg-bg1 transition-colors'
			onClick={toggleTheme}
			aria-label='Toggle theme'
		>
			{theme === 'light' ? <IoMoon className='w-5 h-5' /> : <IoSunny className='w-5 h-5' />}
		</button>
	) : (
		<div />
	);
}
