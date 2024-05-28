import Fuse from 'fuse.js'
import { useState, type ChangeEvent } from 'react';

interface SearchProps {
	searchList: Array<any>
}

const options = {
	keys: ['frontmatter.title', 'frontmatter.description', 'frontmatter.slug'],
	includeMatches: true,
	minMatchCharLength: 2,
	treshold: 0.5,
}

function Search({ searchList }: SearchProps) {
// input
const [query, setQuery] = useState<string>('')

const fuse = new Fuse(searchList, options)

// limit of posts to display
const posts = fuse
	.search(query)
	.map((result) => result.item )
	.slice(0, 5);

	function handleOnSearch({ target }: ChangeEvent<HTMLInputElement>) {
		const { value } = target;
		setQuery(value)
	}

	return (
	<div>
			<label
				htmlFor='search'
				className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
				>
				Search
			</label>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx={10} cy={10} r={7}></circle>
            <line x1={21} y1={21} x2={15} y2={15}></line>
          </svg>
				</div>
				<input
				type='text'
				id='search'
				value={query}
				onChange={handleOnSearch}
				className='block w-full p-4 pl-10 text-sm text-gray-900 boder border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue focus:border-blue'
				placeholder='Search for anything...'
				/>
			</div>

			{query.length > 1 && (
			<div className='my-4'>
					Found {posts.length} {posts.length === 1 ? 'result' : 'results'} for '{query}'
				</div>
			)}

			<ul className='list-none'>
				{posts && posts.map ((post) => (
				<li className="py-2">
						<a className="text-lg text-blue hover:text-blue hover:underline underline-offset-2"
							 href={`/posts/${post.frontmatter.slug}`}>{post.frontmatter.title}
						</a>
						<p className='text-sm text-gray-800'>{post.frontmatter.description}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
export default Search;
