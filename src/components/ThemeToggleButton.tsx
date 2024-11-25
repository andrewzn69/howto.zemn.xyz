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
		<div className='inline-flex items-center p-[1px] rounded-3xl bg-light-subAlt dark:bg-dark-subAlt'>
			{themes.map((t) => {
				const checked = t === theme;
				return (
					<button
						type='button'
						key={t}
						className={`${
							checked ? 'bg-light-bg text-dark-bg' : ''
						} cursor-pointer rounded-3xl p-2`}
						onClick={toggleTheme}
						aria-label='Toggle theme'
					>
						{t === 'light' ? <IoSunny /> : <IoMoon />}
					</button>
				);
			})}
		</div>
	) : (
		<div />
	);
}
