export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Alfarates",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/fonts.css", "~assets/global.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/vue-fragments",
    "@/plugins/api-context.client.js",
    "@/plugins/api-context.server.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/pwa"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],

  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
    {
      path: "/api",
      handler: (req, res, next) => {
        const baseURL = "http://" + req.headers.host + "/";
        const reqUrl = new URL(req.url, baseURL);
        req.params = { query: reqUrl.searchParams, body: req.body };

        next();
      },
    },
    { path: "/api", handler: "@/middleware/api-server.js" },
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
      name: "Todayrate",
      short_name: "Todayrate",
      description:'Todayrate is the place where you can get today Belarusian banks currency rate. We get rates data via the Alfa Bank API'
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  telemetry: false,
};
