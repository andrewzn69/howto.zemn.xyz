import Fuse from 'fuse.js';
import type React from 'react';
import { type ChangeEvent, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from './ui/dialog';

interface SearchProps {
	searchList: Array<{ frontmatter: { title: string; description: string; slug: string } }>;
}

const options = {
	keys: ['frontmatter.title', 'frontmatter.description', 'frontmatter.slug'],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0.2,
	matchAllTokens: true,
	isCaseSensitive: false,
};

const SearchDialog: React.FC<SearchProps> = ({ searchList }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<
		{ frontmatter: { title: string; description: string; slug: string } }[]
	>([]);

	const fuse = new Fuse(searchList, options);

	const toggleDialog = () => {
		setIsOpen(!isOpen);
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setQuery(value);
		if (value.length >= options.minMatchCharLength) {
			const searchResults = fuse.search(value);
			setResults(searchResults.map(({ item }) => item));
		} else {
			setResults([]);
		}
	};

	const limitedResults = results.slice(0, 15);

	return (
		<Dialog open={isOpen} onOpenChange={toggleDialog}>
			<DialogTrigger asChild>
				<button
					type='button'
					className='flex justify-start w-[150px] px-3 py-2 text-sm text-light-sub dark:text-dark-text hover:text-light-bg dark:hover:text-dark-bg bg-light-subAlt dark:bg-dark-subAlt hover:bg-light-text dark:hover:bg-dark-text rounded-md focus:outline-none transition-colors duration-500'
					onClick={toggleDialog}
				>
					Search...
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogDescription>
					<div className='relative'>
						<div className='absolute pb-1 inset-y-0 left-0 flex items-center text-light-sub dark:text-dark-sub pointer-events-none'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-search'
								width={15}
								height={15}
								viewBox='0 0 24 24'
								strokeWidth='2'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
								aria-label='Search Icon'
							>
								<title>Search Icon</title>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<circle cx={10} cy={10} r={7} />
								<line x1={21} y1={21} x2={15} y2={15} />
							</svg>
						</div>
						<input
							type='text'
							value={query}
							onChange={handleSearch}
							className='block w-full px-2 pl-6 text-sm tracking-wider text-light-sub dark:text-dark-text bg-light-bg dark:bg-dark-bg caret-light-caret dark:caret-dark-main border-0 dark:bg-transparent focus:outline-none focus:ring-0'
							placeholder='Search...'
							aria-label='Search Input'
						/>
					</div>

					{/* conditionally render hr tag if the query is long enough */}
					{limitedResults.length > 0 && (
						<hr className='my-4 border-light-sub dark:border-dark-sub' />
					)}

					{/* render the results if they exist */}
					{limitedResults.length > 0 && (
						<ul className='list-none'>
							{limitedResults.map((post) => (
								<li
									key={post.frontmatter.slug}
									className='py-2 border-gray-200 dark:border-gray-700'
								>
									<a
										className='text-lg text-light-sub dark:text-dark-sub hover:text-light-main dark:hover:text-dark-main hover:underline underline-offset-2'
										href={`/posts/${post.frontmatter.slug}`}
									>
										{post.frontmatter.title}
									</a>
								</li>
							))}
						</ul>
					)}
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
};

export default SearchDialog;
