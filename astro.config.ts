import { defineConfig, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import robotsTxt from 'astro-robots-txt';
import pagefind from 'astro-pagefind';
import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import remarkAside from './src/lib/remark-aside.mjs';
import remarkDirective from 'remark-directive';
import fs from 'node:fs';

const everforestDarkString = fs.readFileSync(new URL('./everforest-dark.json', import.meta.url), 'utf-8');
const everforestLightString = fs.readFileSync(new URL('./everforest-light.json', import.meta.url), 'utf-8');

const everforestDark = ExpressiveCodeTheme.fromJSONString(everforestDarkString);
const everforestLight = ExpressiveCodeTheme.fromJSONString(everforestLightString);

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
			themes: [everforestDark, everforestLight],
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
		robotsTxt({ policy: [{ userAgent: '*', disallow: ['/404'] }] }),
		pagefind(),
	],

	markdown: {
		remarkPlugins: [remarkDirective, remarkAside, remarkReadingTime],
	},

	image: {
		service: sharpImageService(),
	},

	output: 'server',

	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),

	vite: {
		plugins: [tailwindcss()],
	},
});
