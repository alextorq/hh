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
        <el-tabs type="card">
          <el-tab-pane label="Price">
            <div style="width:80vw; position: relative;">
              <averageSalary :info="adaptCaregoriesWithVacancies" v-if="adaptCaregoriesWithVacancies.length"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Amount">
            <div style="width: 80vw; position: relative;">
              <AmountVacancies :info="categories" v-if="categories.length"/>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Profession">
            <div style="width: 80vw; position: relative;">
              <averageSalaryByProfession :info="adaptCaregoriesWithVacancies" v-if="adaptCaregoriesWithVacancies.length"/>
            </div>
          </el-tab-pane>

        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getVacancies, getCategories, getCategoriesWithVacancies, getCategoriesWithSpecialization } from '../repository/index';
import adaptProf from '../utils/midlle';
import averageSalary from './averageSalary.vue';
import AmountVacancies from "./AmountVacancies.vue";
import averageSalaryByProfession from './averageSalaryByProfession.vue'

export default {
  name: 'HelloWorld',
  data() {
    return {
      categories: [],
      vacancies: [],
      midlle: {},
      adaptCaregoriesWithVacancies: [],
      activeName: 'first',
      value: '',
    };
  },
  components: {
    averageSalary,
    AmountVacancies,
    averageSalaryByProfession,
  },
  async mounted() {
    this.categories = await getCategories();
    this.vacancies = await getVacancies();
    // console.log(await getCategoriesWithSpecialization());
    const caregoriesWithVacancies = await getCategoriesWithVacancies();
    this.midlle = caregoriesWithVacancies;

    this.adaptCaregoriesWithVacancies = Object.freeze(adaptProf(caregoriesWithVacancies));
    console.log(this.adaptCaregoriesWithVacancies)
  },
};
</script>
