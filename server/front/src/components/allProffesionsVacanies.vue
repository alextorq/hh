<template>
  <div>

  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data() {
    return {
      options: {}
    }
  },
  name: "allProffesionsVacanies",
  props: {
    allVacansies: {

    }
  },
  mounted () {
    this.renderChart(data, this.options)
  },
}
</script>

<style scoped>

</style>
