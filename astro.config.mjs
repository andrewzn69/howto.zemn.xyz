import { defineConfig, sharpImageService } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import pagefind from "astro-pagefind"

export default defineConfig({
	build: {
		format: "file",
	},
  site: 'https://howto.zemn.xyz/',
  integrations: [sitemap(), react(), tailwind(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      langs: [],
      wrap: false,
      transformers: []
    }
  },
  image: {
    service: sharpImageService()
  },
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
})
