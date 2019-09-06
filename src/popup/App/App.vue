<template>
  <div class="main-app">
    <el-container>
      <div v-if="isShowCalculator">
        <cost-calculator></cost-calculator>
      </div>

      <div v-else>
        <announcement></announcement>
      </div>
    </el-container>
  </div>
</template>

<script>

import CostCalculator from "../../components/CostCalculator"
import Announcement from "../../components/Announcement"

const rentHost = "rent.591.com.tw"

export default {
  name: 'App',
  components: { CostCalculator, Announcement },
  data: () => ({
    isShowCalculator: false
  }),
  created () {
    this.$store.dispatch('FETCH_RENTS')

    const setIsShowCalculator = (boolean) => { this.isShowCalculator = boolean }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];
      let url = new URL(tab.url)
      let domain = url.hostname

      setIsShowCalculator((domain == rentHost))
    })
  }
}
</script>

<style>
.main-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 350px;
}
</style>