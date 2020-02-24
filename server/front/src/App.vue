<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  * {
    -webkit-overflow-scrolling: touch;

    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    scrollbar-face-color: #039ea4;
    scrollbar-track-color: rgba(3,158,164,.3);
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(3,158,164,.3);
    }
    &::-webkit-scrollbar-track {
      background: rgba(3,158,164,.3);
    }

  }
  html {
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
</style>
