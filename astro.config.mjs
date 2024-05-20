import { defineConfig, sharpImageService } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import pagefind from "astro-pagefind"
import robotsTxt from '@astrojs/robots-txt'

export default defineConfig({
  site: 'https://howto.zemn.xyz/',
  integrations: [sitemap(), react(), tailwind(), pagefind(), robotsTxt()],
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
