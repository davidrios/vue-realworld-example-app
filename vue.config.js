module.exports = {
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.ftl$/,
      use: ["@davidrios/hot-reloader", "file-loader"]
    });
  }
};
