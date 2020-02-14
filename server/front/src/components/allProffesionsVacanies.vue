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
    allVacansies: {

    },
  },
  mounted() {
    this.renderChart({
      datasets: [{
        data: [10, 20, 30],
      }],
      labels: [
        'Red',
        'Yellow',
        'Blue',
      ],
    },
    this.options);
  },
};
</script>

<style scoped>

</style>
