module.exports = {
  pwa: {
    name: "Ais-chess"
  },
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    performance: {
      hints: false,
      maxEntrypointSize: 256000,
      maxAssetSize: 256000
    }
  }
};
