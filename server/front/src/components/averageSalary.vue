<template>
  <div style="position: relative;">
    <el-input
        placeholder="Please input"
        class="average-price"
        v-model="averagePrice"></el-input>
    <canvas ref="chart"></canvas>
    <el-table
      :data="infoAdapt"
      border
      height="450">
      <el-table-column
        prop="title"
        label="Область">
      </el-table-column>
      <el-table-column
        prop="averagePrice"
        label="Средняя зарплата">
      </el-table-column>
      <el-table-column
        prop="moda"
        label="Мода">
      </el-table-column>
      <el-table-column
        prop="scope"
        label="Размах ряда">
      </el-table-column>
      <el-table-column
        prop="averagePriceYear"
        label="Средняя зарплата за год">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import Chart from 'chart.js';
import randomColor from 'randomcolor'
import { formatPrice } from '../utils/price';

const horizonalLinePlugin = {
  afterDraw: function(chartInstance) {
    const yScale = chartInstance.scales["y-axis-0"];
    const canvas = chartInstance.chart.canvas;
    const ctx =  chartInstance.chart.ctx;
    let yValue;

    if (chartInstance.options.horizontalLine) {
      for (const line of  chartInstance.options.horizontalLine) {
        const style = line.style || "rgba(169,169,169, .6)";

        if (line.y) {
          yValue = yScale.getPixelForValue(line.y);
        } else {
          yValue = 0;
        }

        ctx.lineWidth = line.lineWidth || 3;

        if (yValue) {
          ctx.beginPath();
          ctx.moveTo(0, yValue);
          ctx.lineTo(canvas.width, yValue);
          ctx.strokeStyle = style;
          ctx.stroke();
        }

        if (line.text) {
          ctx.fillStyle = style;
          ctx.fillText(line.text, 0, yValue + ctx.lineWidth + 5);
        }
      }
      return;
    };
  }
};
Chart.pluginService.register(horizonalLinePlugin);

export default {
  name: 'averageSalary',
  props: ['info'],
  data() {
    return {
      averagePrice: 64000,
    }
  },
  computed: {
    options() {
      return {
        scales: {
          y: { beginAtZero: false }
        },
        horizontalLine: [{
          y: this.averagePrice,
          style: 'rgba(255, 0, 0, .4)',
          lineWidth: 1,
          text: `average in spb ${this.averagePrice}`
        }],
      };
    },
    infoAdapt() {
      const res = [];
      for (const item of this.info) {
        res.push({
          ...item,
          averagePrice: formatPrice(item.averagePrice),
          averagePriceYear: formatPrice(item.averagePrice * 12),
          moda: formatPrice(item.moda),
          scope: formatPrice(item.scope),
        })
      }
      return res;
    },
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
        data.push(item.averagePrice);
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
          label: 'Arithmetical mean Salary',
          fill: false,
        }],
        labels: data.labels,
      });
    },
  },
  watch: {
    averagePrice() {
      this.renderChartRef();
    }
  },
  mounted() {
    this.renderChartRef();
  },
};
</script>

<style>
  .average-price {
    width: 200px !important;
    margin-left: auto;
    margin-top: 20px;
  }
</style>
