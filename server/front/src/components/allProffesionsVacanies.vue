<script>
import { Doughnut } from 'vue-chartjs';
// import color from '../utils/color.js'

export default {
  extends: Doughnut,
  data() {
    return {
      options: {},
    };
  },
  name: 'allProffesionsVacanies',
  props: {
    info: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    formatData(info) {
      const labels = [];
      const data = [];
      info.forEach((currentValue) => {
        labels.push(currentValue.title);
        data.push(currentValue.vacancies.length);
      });
      return {
        labels,
        data,
      };
    },
  },
  mounted() {
    const data = this.formatData(this.info);
    console.log(adaptProf(data));
    this.renderChart({
      datasets: [{
        data: data.data,
      }],
      labels: data.labels,
    },
    this.options);
  },
};
</script>

<style scoped>

</style>
