const path = require('path');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: path.resolve(__dirname, './server/front/src/main.ts'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './server/front/src'),
        vue$: 'vue/dist/vue.runtime.esm.js',
      },
    },
  },
};
