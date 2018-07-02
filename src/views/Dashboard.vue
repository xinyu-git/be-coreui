<template>
  <div class="animated fadeIn">
    <b-row>
      <!-- <router-view></router-view> -->
    </b-row>
  </div>
</template>

<script>
import Bus from '../bus.js'
export default {
  name: 'dashboard',
  components: { },
  data: function () {
    return {
    }
  },
  mounted(){
    this.getdataTest()
  },
  methods: {
    async getdataTest(){
      //let self = this;
      //let result = await this.$http.get('api/shop/index/index')
      //console.log(result)
    }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
  .app{background:#f5f7f9;}
</style>
