const path = require('path');
const launchMiddleware = require('launch-editor-middleware');

module.exports = {
  outputDir: path.resolve(__dirname, './server/public'),
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      before(app) {
        app.use('/__open-in-editor', launchMiddleware('/home/alex/binar/webstorm'));
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
