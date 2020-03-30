<template>
  <div style="position: relative;">
    <el-select v-model="value"
               @change="debug"
               placeholder="Select">
      <el-option
        v-for="item in categories"
        :key="item._id"
        :label="item.title"
        :value="item._id">
      </el-option>
    </el-select>
    <el-alert
      v-if="!value"
      title="Выберете категорию"
      type="success">
    </el-alert>
    <canvas ref="chart"></canvas>
    <el-table
      v-if="value"
      :data="infoAdapt"
      border
      height="450">
      <el-table-column
        prop="title"
        label="Специализация">
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
import adaptProf from '../utils/midle';
import {formatPrice} from '../utils/price'
let chart;

export default {
  name: 'averageSalary',
  props: ['vacancies', 'categories', 'categorySpecialization'],
  data() {
    return {
      value: '',
      info: [],
    }
  },
  computed: {
    options() {
      return {
        scales: {
          y: { beginAtZero: false }
        },
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
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(this.$refs['chart'], {
        type: 'bar',
        data,
        options: this.options
      });
    },
    debug(id) {
      const category = this.categorySpecialization.find((item) => {
        return item._id === id;
      });
      const { specializations } = category;
      specializations.map((specialization) => {
        specialization.vacancies = this.vacancies.filter((vacancy) => {return vacancy.specialization === specialization._id})
      });
      this.info = adaptProf(specializations);
      this.renderChartRef();
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
