const path = require('path');

module.exports = {
  configureWebpack: {
    entry:  path.resolve(__dirname, "./server/front/src/main.js"),
    resolve: {
      alias: {
        '@':  path.resolve(__dirname, './server/front/src') ,
        vue$: 'vue/dist/vue.runtime.esm.js'
      },
    },
  }
};


