import fs from 'node:fs';
import path from 'node:path';

const CACHE_DIR = '.cache';
const CACHE_FILE = path.join(CACHE_DIR, 'github-repos.json');
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

type GitHubRepo = {
	name: string;
	description: string;
	topics: string[];
	stargazers_count: number;
	forks_count: number;
	html_url: string;
};

type CacheData = {
	timestamp: number;
	repos: GitHubRepo[];
};

export async function fetchGitHubRepos(repoNames: string[]): Promise<GitHubRepo[]> {
	// check cache first
	if (fs.existsSync(CACHE_FILE)) {
		const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) as CacheData;
		const age = Date.now() - cached.timestamp;

		if (age < CACHE_TTL) {
			console.log('Using cached GitHub data');
			return cached.repos;
		}
	}

	// fetch fresh data
	console.log('Fetching fresh GitHub data...');
	const repos = await Promise.all(
		repoNames.map(async (repo) => {
			try {
				const response = await fetch(`https://api.github.com/repos/${repo}`, {
					headers: {
						Accept: 'application/vnd.github.v3+json',
					},
				});
				if (!response.ok) {
					console.error(`Failed to fetch ${repo}: ${response.status} ${response.statusText}`);
					return null;
				}
				return response.json() as Promise<GitHubRepo>;
			} catch (error) {
				console.error(`Error fetching ${repo}:`, error);
				return null;
			}
		})
	).then((results) => results.filter((repo): repo is GitHubRepo => repo !== null));

	// cache the results
	if (!fs.existsSync(CACHE_DIR)) {
		fs.mkdirSync(CACHE_DIR, { recursive: true });
	}

	const cacheData: CacheData = {
		timestamp: Date.now(),
		repos,
	};

	fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
	console.log('Cached GitHub data');

	return repos;
}
