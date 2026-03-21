import { useState, useRef } from 'react';
import { IoLogoGithub, IoLogoLinkedin, IoMail, IoChevronDown } from 'react-icons/io5';

export default function SocialsDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout>();

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
				className="px-3 py-2 rounded-lg hover:bg-bg1 font-mplus flex items-center gap-1 duration-150"
				onClick={() => setIsOpen(!isOpen)}
			>
				Socials
				<IoChevronDown className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-bg1 rounded-lg shadow-lg">
					<a
						href="https://github.com/andrewzn69"
						target="_blank"
						className="flex items-center gap-2 px-4 py-3 hover:bg-bg2 rounded-t-lg"
					>
						<IoLogoGithub className="w-5 h-5" />
						GitHub
					</a>
					<a
						href="https://linkedin.com/in/andrewzn"
						target="_blank"
						className="flex items-center gap-2 px-4 py-3 hover:bg-bg2"
					>
						<IoLogoLinkedin className="w-5 h-5" />
						LinkedIn
					</a>
					<a
						href="mailto:contact@zemn.xyz"
						className="flex items-center gap-2 px-4 py-3 hover:bg-bg2 rounded-b-lg"
					>
						<IoMail className="w-5 h-5" />
						Email
					</a>
				</div>
			)}
		</div>
	);
}
