const path = require('path');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
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
