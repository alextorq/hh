<template>
  <div class="hello">
    <el-container>
      <el-main>
        <el-tabs type="card">

          <el-tab-pane label="Заплаты">
            <div style="width:95vw; position: relative;">
              <averageSalary
                :info="adaptCaregoriesWithVacancies"
                v-if="adaptCaregoriesWithVacancies.length"/>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Количество вакансий">
            <div style="width: 95vw; position: relative;">
              <AmountVacancies
                :info="categories"
                v-if="categories.length"/>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Специализации">
            <div style="width: 95vw; position: relative;">
              <averageSalaryByProfession
                :categories="categories"
                :vacancies="vacancies"
                :categorySpecialization="categorySpecialization"
                v-if="adaptCaregoriesWithVacancies.length"/>
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
        categorySpecialization: [],
        activeName: 'first',
      };
    },
    components: {
      averageSalary,
      AmountVacancies,
      averageSalaryByProfession,
    },
    async mounted() {
      this.categories = await getCategories();
      const vacancies = await getVacancies();
      this.vacancies = vacancies.map((item) => Object.freeze(item));
      const categorySpecialization =  await getCategoriesWithSpecialization()
      this.categorySpecialization = categorySpecialization.map(item => Object.freeze(item));
      const caregoriesWithVacancies = await getCategoriesWithVacancies();
      this.midlle = caregoriesWithVacancies;

      this.adaptCaregoriesWithVacancies = Object.freeze(adaptProf(caregoriesWithVacancies));
      // console.log(this.adaptCaregoriesWithVacancies)
    },
  };
</script>
