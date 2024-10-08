import { defineConfig, sharpImageService } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import robotsTxt from "astro-robots-txt";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	site: "https://howto.zemn.xyz/",
	trailingSlash: "never",
	integrations: [
		sitemap(),
		react(),
		mdx(),
		tailwind({
			applyBaseStyles: false,
		}),
		robotsTxt({ policy: [{ userAgent: "*", disallow: ["/404"] }] }),
	],
	markdown: {
		remarkPlugins: [remarkReadingTime],
		shikiConfig: {
			theme: "one-dark-pro",
			langs: [],
			wrap: false,
			transformers: [],
		},
	},
	image: {
		service: sharpImageService(),
	},
	output: "hybrid",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
