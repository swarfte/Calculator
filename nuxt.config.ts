// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vite-pwa/nuxt",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
  ],
  pwa: {
    manifest: {
      name: "Calculator",
      short_name: "Calculator",
      description: "This is my cross-platform calculator app",
      theme_color: "#42f5f5",
      icons: [
        {
          src: "icons/icon_64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon_144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon_192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon_512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      lang: "en",
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
      Inter: "200..700",
      "Crimson Pro": {
        wght: "200..900",
        ital: "200..700",
      },
    },
  },
});
