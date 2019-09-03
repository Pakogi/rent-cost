<template>
  <div class="main_app">
    <h1>租屋虧多少</h1>
    <p>當前網站 {{currentUrl}}</p>
    <p>當前租金 {{rentPrice}}</p>

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


    <div>總計裸屋成本約：{{ calculateTotalCost }} </div>

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
    },
    currentUrl: null,
    rentPrice: 0
  }),
  mounted() {
    const setCurrentUrl = (url) => { this.currentUrl = url }
    const setRentPrice = (price) => { this.rentPrice = price }

    chrome.tabs.executeScript({
        code: '(' + function(params) {
          return { price: document.getElementsByClassName("price")[0].innerText };
        } + ')(' + JSON.stringify() + ');'
    }, function(results) {
      setRentPrice(results[0].price)
    });

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      setCurrentUrl(tabs[0].url)
    });
  },
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
  },
  methods: {
    setCurrentUrl(url) {
      this.currentUrl = url
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
