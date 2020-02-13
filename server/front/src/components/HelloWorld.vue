<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      options: [{
        value: 'Option1',
        label: 'Option1',
      }, {
        value: 'Option2',
        label: 'Option2',
      }, {
        value: 'Option3',
        label: 'Option3',
      }, {
        value: 'Option4',
        label: 'Option4',
      }, {
        value: 'Option5',
        label: 'Option5',
      }],
      value: '',
    };
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
