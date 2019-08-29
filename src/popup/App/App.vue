<template>
  <div class="main_app">
    <h1>租屋虧多少</h1>

    <div>成本計算開始:</div>

    <input type="text" v-model="cost" placeholder="15000">

    <ul>
      <li>
        <input type="checkbox" v-model="additionGroup" value="washingMachine" />
        <label>沒有洗衣機</label>
      </li>

      <li>
        <input type="checkbox" v-model="additionGroup" value="bed" />
        <label>沒有床墊</label>
      </li>

      <li>
        <input type="checkbox" v-model="additionGroup" value="network" />
        <label>沒有網路</label>
      </li>

      <li>
        <input type="checkbox" v-model="additionGroup" value="dispenser" />
        <label>沒有飲水機</label>
      </li>

      <li>
        <input type="checkbox" v-model="additionGroup" value="garbageCollection" />
        <label>沒有代收垃圾</label>
      </li>
    </ul>

    <div>總計裸屋成本約：{{ calculateTotalCost }}</div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    cost: 0,
    additionGroup: [],
    costLists: {
      "washingMachine": 1000,
      "bed": 1000,
      "network": 600,
      "garbageCollection": 500,
      "dispenser": 300
    }
  }),
  computed: {
    calculateTotalCost: function() {
      let additionCost = 0
      const { additionGroup, costLists } = this

      Object.keys(costLists).forEach(function(key, index) {
        if (additionGroup.includes(key)) {
         additionCost += costLists[key]
        }
      })

      return this.cost - additionCost
    }
  }
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
