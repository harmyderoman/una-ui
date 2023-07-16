import pkg from '../package.json'
import nexveltUI from '../packages/ui-nuxt/src/module'

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: [
    nexveltUI,
  ],

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  typescript: {
    strict: false,
    includeWorkspace: true,
  },

  experimental: {
    payloadExtraction: true,
  },

  css: [
    '~/styles/index.css',
  ],
})