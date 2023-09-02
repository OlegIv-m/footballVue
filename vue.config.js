const { defineConfig } = require("@vue/cli-service");

// process.env.VUE_APP_PROXY_URL =
//   process.env.NODE_ENV === "production" ? "https://api.football-data.org" : "";

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "https://api.football-data.org",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/football/" : "/",
});
