import { defineConfig, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import robotsTxt from 'astro-robots-txt';
import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import fs from 'node:fs';

// @expressive-code does not have nord-light theme
const jsoncString = fs.readFileSync(new URL('./nord-light.json', import.meta.url), 'utf-8');
const nordlight = ExpressiveCodeTheme.fromJSONString(jsoncString);

export default defineConfig({
	site: 'https://howto.zemn.xyz/',
	trailingSlash: 'never',
	integrations: [
		expressiveCode({
			defaultProps: {
				frame: 'none',
				showLineNumbers: false,
			},
			themeCssSelector: (theme) => `.${theme.type}`,
			plugins: [pluginLineNumbers()],
			themes: ['nord', nordlight],
			styleOverrides: {
				frames: {
					frameBoxShadowCssValue: '0 4px 20px rgba(0,0,0, 0.1)',
				},
				codeFontSize: '0.9rem',
				codeLineHeight: '1.5rem',
				codePaddingInline: '1.5rem',
			},
		}),
		sitemap(),
		react(),
		mdx(),
		tailwind(),
		robotsTxt({ policy: [{ userAgent: '*', disallow: ['/404'] }] }),
	],
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	image: {
		service: sharpImageService(),
	},
	output: 'hybrid',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
