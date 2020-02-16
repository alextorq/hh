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
        <div style="width: 1600px; height: 1000px; position: relative;">
          <averageSalary :info="midlle" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getVacancies, getCategories, getCategoriesWithVacancies } from '../repository/index';
import adaptProf from '../utils/midlle';
import averageSalary from './averageSalary.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      categories: [],
      vacancies: [],
      midlle: {},
      value: '',
    };
  },
  components: {
    averageSalary,
  },
  async mounted() {
    this.categories = await getCategories();
    this.vacancies = await getVacancies();
    const caregoriesWithVacancies = await getCategoriesWithVacancies();
    this.midlle = adaptProf(caregoriesWithVacancies);
  },
};
</script>
