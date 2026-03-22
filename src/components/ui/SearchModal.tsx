import { useState, useEffect } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';

export default function SearchModal() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false);
			if (e.key === '/' && !isOpen && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
				e.preventDefault();
				setIsOpen(true);
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="group w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-bg5/50 bg-bg1 text-fg-dim hover:border-green [transition:border-color_150ms,background-color_500ms,color_500ms] cursor-text shadow-md"
			>
				<IoSearch className="w-4 h-4 shrink-0 text-fg-dim [transition:color_150ms] [&_*]:[transition:fill_150ms] group-hover:text-fg" />
				<span className="text-base flex-1 text-left text-fg-dim [transition:color_150ms] group-hover:text-fg">Search posts...</span>
				<kbd className="relative inline-flex justify-center items-center py-0.5 px-1.5 bg-bg0 border border-bg5 font-mono text-xs shadow-sm rounded">
					<span className="text-fg-dim [transition:opacity_150ms,color_500ms] group-hover:opacity-0">/</span>
					<span className="absolute inset-0 flex items-center justify-center text-fg [transition:opacity_150ms,color_500ms] opacity-0 group-hover:opacity-100">/</span>
				</kbd>
			</button>

			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-bg0/80 backdrop-blur-sm"
					onClick={() => setIsOpen(false)}
				>
					<div
						className="w-full max-w-xl bg-bg1 rounded-lg border border-bg5 shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center gap-3 px-4 py-3 border-b border-bg5">
							<IoSearch className="w-4 h-4 shrink-0 text-fg-dim" />
							<input
								autoFocus
								type="text"
								placeholder="Search posts..."
								className="flex-1 bg-transparent text-fg placeholder:text-fg-dim outline-none text-base"
							/>
							<button onClick={() => setIsOpen(false)}>
								<IoClose className="w-4 h-4 text-fg-dim hover:text-fg duration-150" />
							</button>
						</div>
						<div className="px-4 py-8 text-center text-base text-fg-dim">
							Search coming soon.
						</div>
					</div>
				</div>
			)}
		</>
	);
}
