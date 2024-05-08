import { defineConfig, sharpImageService } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

export default defineConfig({
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true }
	}),
  site: 'https://howto.zemn.xyz/',
  integrations: [sitemap(), react(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      // NOTE: Add light mode theme
      // experimentalThemes: {
      //   light: 'dracula',
      //   dark: 'nord'
      // },
      langs: [],
      wrap: false,
      transformers: []
    }
  },
  image: {
    service: sharpImageService()
  }
})
