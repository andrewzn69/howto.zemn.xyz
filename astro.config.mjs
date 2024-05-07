import { defineConfig, sharpImageService } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
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
