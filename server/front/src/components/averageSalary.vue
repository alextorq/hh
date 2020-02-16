<template>
  <canvas></canvas>
</template>

<script>
import Chart from 'chart.js';
import randomColor from 'randomcolor'

export default {
  name: 'averageSalary',
  props: ['info'],
  data() {
    return {
      options: {
        scales: {
          "y": { "beginAtZero": false }
        },
      },
    }
  },
  methods: {
    renderChart(data) {
      new Chart(this.$el, {
        type: 'bar',
        data,
        options: this.options
      });
    },
    formatData(info) {
      const data = [];
      const labels = [];
      const backgroundColor = [];
      /* eslint no-restricted-syntax:0 */
      for (const item in info) {
        /* eslint no-prototype-builtins:0 */
        if (info.hasOwnProperty(item)) {
          data.push(info[item]);
          labels.push(item);
          backgroundColor.push(randomColor({
            format: 'rgba'
          }));
        }
      }
      return { data, labels, backgroundColor };
    },
    renderChartRef() {
      const data = this.formatData(this.info);
      this.renderChart({
        datasets: [{
          data: data.data,
          backgroundColor: data.backgroundColor,
          borderWidth: 1,
          label: 'Average Salary',
          fill: false,
        }],
        labels: data.labels,
      });
    },
  },
  watch: {
    info() {
      this.renderChartRef();
    },
  },
  mounted() {
    this.renderChartRef();
  },
};
</script>
