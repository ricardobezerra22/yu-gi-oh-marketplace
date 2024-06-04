import { defineConfig } from 'cypress'

export default defineConfig({
  setupNodeEvents(on, config) {
    on('before:browser:launch', (browser = {}, launchOptions) => {
      /* ... */
    })
  },
  numTestsKeptInMemory: 0,

  chromeArgs: ['--disable-dev-shm-usage'],
  chromeWebSecurity: true,

  viewportWidth: 1360,
  viewportHeight: 760,

  video: true,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173'
  },
  component: {
    devServer: {
      framework: 'vue-cli',
      bundler: 'webpack'
    }
  }
})
