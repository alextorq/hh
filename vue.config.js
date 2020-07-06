const path = require('path');
const launchMiddleware = require('launch-editor-middleware');

module.exports = {
  outputDir: path.resolve(__dirname, './server/public'),
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: 'http://localhost:4001',
      before(app) {
        app.use('/__open-in-editor', launchMiddleware('webstorm'));
      },
    },
    entry: path.resolve(__dirname, './server/front/src/main.ts'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './server/front/src'),
        db: path.resolve(__dirname, './db'),
        vue$: 'vue/dist/vue.runtime.esm.js',
      },
    },
  },
};
