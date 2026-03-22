import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdAt: z.string(),
		updatedAt: z.string().optional(),
		tags: z.array(z.string()),
		slug: z.string(),
		heroImage: z.string().optional(),
		public: z.boolean().optional(),
	}),
});

export const collections = { blog };
