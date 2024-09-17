import React, { useState, type ChangeEvent } from "react";
import Fuse from "fuse.js";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
} from "./ui/dialog";

interface SearchProps {
	searchList: Array<any>;
}

const options = {
	keys: ["frontmatter.title", "frontmatter.description", "frontmatter.slug"],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0.2,
	matchAllTokens: true,
	isCaseSensitive: false,
};

const SearchDialog: React.FC<SearchProps> = ({ searchList }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);

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

	const limitedResults = results.slice(0, 15); // Limit to 5 results as in Search.tsx

	return (
		<Dialog open={isOpen} onOpenChange={toggleDialog}>
			<DialogTrigger asChild>
				<button
					className="flex justify-start w-[150px] px-3 py-2 text-sm text-foreground-context dark:text-foreground border border-border rounded-lg focus:outline-none hover:bg-orange-light hover:dark:bg-transparent hover:dark:border-foreground transition-colors"
					onClick={toggleDialog}
				>
					Search...
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogDescription>
					<div className="relative">
						<div className="absolute pb-1 inset-y-0 left-0 flex items-center pointer-events-none">
							{/* Smaller Search Icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-search"
								width={15} // Smaller width
								height={15} // Smaller height
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
							type="text"
							value={query}
							onChange={handleSearch}
							className="block w-full px-2 pl-6 text-sm text-foreground-context dark:text-foreground  border-0 dark:bg-transparent focus:outline-none focus:ring-0"
							placeholder="Search for anything..."
						/>
					</div>

					{/* Conditionally render the <hr /> if the query is long enough */}
					{query.length >= options.minMatchCharLength && (
						<hr className="my-4 border-gray-300 dark:border-border" />
					)}

					{/* Conditionally render "No results found." */}
					{query.length >= options.minMatchCharLength &&
						results.length === 0 && (
							<div className="flex justify-center items-center py-4 text-foreground-context dark:text-foreground">
								No results found.
							</div>
						)}

					{/* Render the results if they exist */}
					{limitedResults.length > 0 && (
						<ul className="list-none">
							{limitedResults.map((post, index) => (
								<li
									key={index}
									className="py-2 border-gray-200 dark:border-gray-700"
								>
									<a
										className="text-lg text-foreground hover:text-blue hover:underline underline-offset-2"
										href={`/posts/${post.frontmatter.slug}`}
									>
										{post.frontmatter.title}
									</a>
									<p className="text-sm text-gray-800">
										{post.frontmatter.description}
									</p>
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
