<template>
  <div>
    <canvas ref="chart"></canvas>
    <el-table
      :data="info"
      border
      height="450"
      :default-sort = "{prop: 'amountVacancies', order: 'descending'}">
      <el-table-column
        prop="title"
        label="Область">
      </el-table-column>
      <el-table-column
        prop="amountVacancies"
        label="Количество вакансий"
        sortable>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import Chart from "chart.js";
import randomColor from "randomcolor";

export default {
    name: "AmountVacancies",
    data() {
        return {
          options: {
            scales: {
              "y": { "beginAtZero": false }
            },
          },
        }
    },
    computed: {
    },
    methods: {
      renderChart(data) {
        new Chart(this.$refs['chart'], {
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
        for (const item of info) {
          /* eslint no-prototype-builtins:0 */
            data.push(item.amountVacancies);
            labels.push(item.title);
            backgroundColor.push(randomColor({
              format: 'rgba'
            }));
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
            label: 'Amount Industry',
            fill: false,
          }],
          labels: data.labels,
        });
      },
    },
    components: {
    },
    watch: {
    },
    props: ['info'],
    mounted() {
      this.renderChartRef();
    }
}
</script>

<style scoped>
  ul {
    list-style: none;
    padding-left: 0;
  }
</style>
