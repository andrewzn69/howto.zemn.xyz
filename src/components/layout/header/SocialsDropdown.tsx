import { useState, useRef } from 'react';
import { IoLogoGithub, IoLogoLinkedin, IoMail, IoChevronDown } from 'react-icons/io5';

export default function SocialsDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
	};

	return (
		<div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<button
				className="group relative flex items-center gap-1 px-3 py-2 rounded-lg font-mplus"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="absolute inset-0 rounded-lg bg-bg1 opacity-0 group-hover:opacity-100 [transition:opacity_150ms,background-color_500ms] pointer-events-none" aria-hidden="true"></span>
				<span className="relative text-fg [transition:color_500ms]">Socials</span>
				<span className={`relative inline-flex transition-transform duration-150 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
					<IoChevronDown className="w-3 h-3 text-fg [transition:color_500ms]" />
				</span>
			</button>
			<div className={`absolute right-0 -mt-1 pt-3 w-48 [transition:opacity_150ms,border-color_500ms] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
				<div className="bg-bg1 border border-bg2 rounded-md shadow-xl [transition:border-color_500ms]">
					<a
						href="https://github.com/andrewzn69"
						target="_blank"
						className="group/item relative flex items-center gap-3 px-4 py-3 border-b border-bg2 rounded-t-md [transition:background-color_150ms,border-color_500ms] hover:bg-bg2"
					>
						<IoLogoGithub className="w-5 h-5 text-fg-dim [transition:color_150ms] [&_*]:[transition:fill_150ms] group-hover/item:text-fg" />
						<span className="text-fg-dim [transition:color_150ms] group-hover/item:text-fg">GitHub</span>
					</a>
					<a
						href="https://linkedin.com/in/andrewzn"
						target="_blank"
						className="group/item relative flex items-center gap-3 px-4 py-3 border-b border-bg2 [transition:background-color_150ms,border-color_500ms] hover:bg-bg2"
					>
						<IoLogoLinkedin className="w-5 h-5 text-fg-dim [transition:color_150ms] [&_*]:[transition:fill_150ms] group-hover/item:text-fg" />
						<span className="text-fg-dim [transition:color_150ms] group-hover/item:text-fg">LinkedIn</span>
					</a>
					<a
						href="mailto:contact@zemn.xyz"
						className="group/item relative flex items-center gap-3 px-4 py-3 rounded-b-md [transition:background-color_150ms] hover:bg-bg2"
					>
						<IoMail className="w-5 h-5 text-fg-dim [transition:color_150ms] [&_*]:[transition:fill_150ms] group-hover/item:text-fg" />
						<span className="text-fg-dim [transition:color_150ms] group-hover/item:text-fg">Email</span>
					</a>
				</div>
			</div>
		</div>
	);
}
