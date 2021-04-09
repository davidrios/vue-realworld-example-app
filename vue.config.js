module.exports = {
  chainWebpack: config => {
    config.module
      .rule()
      .test(/\.ftl$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  }
};
