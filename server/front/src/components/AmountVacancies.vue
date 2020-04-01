<template>
  <div>
    <canvas ref="chart"></canvas>
    <el-table
      :data="adaptInfo"
      border
      height="450"
      @sort-change="sortChane"
      :default-sort = "{prop: 'amountVacancies', order: 'descending'}">
      <el-table-column
        prop="title"
        :sort-method="sortABC"
        sortable
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
let chart;

export default {
    name: "AmountVacancies",
    data() {
        return {
          adaptInfo: this.info.map(item => JSON.parse(JSON.stringify(item))),
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
      sortChane({ prop, order }) {
        this.adaptInfo.sort((a, b) => {
          if (order === 'descending') {
            const c = b;
            b = a;
            a = c;
          }
          if (prop === 'title') {
            return this.sortABC(a, b);
          }else {
            return a.amountVacancies - b.amountVacancies
          }
        });
        this.renderChartRef();
      },
      sortABC(a, b) {
        let collator = new Intl.Collator();
        return collator.compare(a.title, b.title);
      },
      renderChart(data) {
        if (chart) {
          chart.destroy();
        }
        chart = new Chart(this.$refs['chart'], {
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
        const data = this.formatData(this.adaptInfo);
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
