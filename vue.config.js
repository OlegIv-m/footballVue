const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://api.football-data.org",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/footbalVue/" : "/",
});
