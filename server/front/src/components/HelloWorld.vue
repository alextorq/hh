<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </el-header>
      <el-main>
        <div style="width: 400px; height: 400px;">
          <allProffesionsVacanies/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import { getVacancies, getCategories, getCategoriesWithVacancies } from '../repository/index';
import parsePrices from '../utils/price';
import allProffesionsVacanies from './allProffesionsVacanies.vue';

// function groupVacancies(vacancies = []) {
//   const result = {};
//   // eslint-disable-next-line no-restricted-syntax
//   for (const item of vacancies) {
//     if (item.category) {
//       if (!result[item.category]) {
//         result[item.category] = [];
//       }
//       result[item.category].push(item);
//     }
//   }
//   return result;
// }

export default {
  name: 'HelloWorld',
  data() {
    return {
      categories: [],
      vacancies: [],
      categories_with: [],
      value: '',
    };
  },
  components: {
    allProffesionsVacanies,
  },
  async mounted() {
    this.categories = await getCategories();
    this.vacancies = await getVacancies();
    this.categories_with = await getCategoriesWithVacancies();
    console.log(this.vacancies.map((item) => parsePrices(item.price))
      .filter((item) => item.length > 0));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
