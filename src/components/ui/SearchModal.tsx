import { useState, useEffect } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';

declare global {
	interface Window {
		pagefind?: any;
	}
}

interface PagefindResult {
	id: string;
	data: () => Promise<{
		url: string;
		content: string;
		excerpt: string;
		meta: {
			title: string;
			image?: string;
		};
		sub_results: Array<{
			title: string;
			url: string;
			excerpt: string;
		}>;
	}>;
}

export default function SearchModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
				setQuery('');
				setResults([]);
			}
			if (e.key === '/' && !isOpen && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
				e.preventDefault();
				setIsOpen(true);
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);


	const handleSearch = async (searchQuery: string) => {
		setQuery(searchQuery);
		if (!searchQuery.trim()) {
			setResults([]);
			return;
		}
		setLoading(true);
		try {
			// wait for pagefind to load if not ready yet
			let retries = 0;
			while (!window.pagefind && retries < 50) {
				await new Promise(resolve => setTimeout(resolve, 100));
				retries++;
			}

			if (window.pagefind) {
				const search = await window.pagefind.search(searchQuery);
				const data = await Promise.all(
					search.results.map((result: PagefindResult) => result.data())
				);
				setResults(data);
			} else {
				console.error('Pagefind not loaded');
			}
		} catch (error) {
			console.error('Search error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="group w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-bg2/50 bg-bg1 text-fg-dim hover:border-green [transition:border-color_150ms,background-color_500ms,color_500ms] cursor-text shadow-md"
			>
				<IoSearch className="w-4 h-4 shrink-0 text-fg-dim [transition:color_150ms] [&_*]:[transition:fill_150ms] group-hover:text-fg" />
				<span className="text-base flex-1 text-left text-fg-dim [transition:color_150ms] group-hover:text-fg">Search posts...</span>
				<kbd className="relative inline-flex justify-center items-center py-0.5 px-1.5 bg-bg0 border border-bg2 font-mono text-xs shadow-sm rounded">
					<span className="text-fg-dim [transition:opacity_150ms,color_500ms] group-hover:opacity-0">/</span>
					<span className="absolute inset-0 flex items-center justify-center text-fg [transition:opacity_150ms,color_500ms] opacity-0 group-hover:opacity-100">/</span>
				</kbd>
			</button>

			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-bg0/80 backdrop-blur-sm"
					onClick={() => {
						setIsOpen(false);
						setQuery('');
						setResults([]);
					}}
				>
					<div
						className="w-full max-w-2xl bg-bg1 rounded-lg border border-bg2 shadow-xl max-h-[600px] flex flex-col"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center gap-3 px-4 py-3 border-b border-bg2">
							<IoSearch className="w-4 h-4 shrink-0 text-fg-dim" />
							<input
								autoFocus
								type="text"
								value={query}
								onChange={(e) => handleSearch(e.target.value)}
								placeholder="Search posts..."
								className="flex-1 bg-transparent text-fg placeholder:text-fg-dim outline-none text-base"
							/>
							<button onClick={() => {
								setIsOpen(false);
								setQuery('');
								setResults([]);
							}}>
								<IoClose className="w-4 h-4 text-fg-dim hover:text-fg duration-150" />
							</button>
						</div>
						<div className="overflow-y-auto flex-1">
							{loading && (
								<div className="px-4 py-8 text-center text-base text-fg-dim">
									Searching...
								</div>
							)}
							{!loading && query && results.length === 0 && (
								<div className="px-4 py-8 text-center text-base text-fg-dim">
									No results found.
								</div>
							)}
							{!loading && results.length > 0 && (
								<div className="divide-y divide-bg2">
									{results.map((result, index) => (
										<a
											key={index}
											href={result.url}
											className="block px-4 py-4 hover:bg-bg2 transition-colors duration-150"
											onClick={() => {
												setIsOpen(false);
												setQuery('');
												setResults([]);
											}}
										>
											<h3 className="font-medium text-fg mb-2">{result.meta.title}</h3>
											<p
												className="text-sm text-fg-dim [&_mark]:bg-green/20 [&_mark]:text-green [&_mark]:rounded [&_mark]:px-1"
												dangerouslySetInnerHTML={{ __html: result.excerpt }}
											/>
										</a>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
