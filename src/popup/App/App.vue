<template>
  <div class="main_app">
    <h1>租屋虧多少</h1>
    <p>當前網站 {{currentUrl}}</p>
    <p>坪數{{spaceSize}}</p>

    <div>每月房租:</div>

    <input type="text" v-model="rentPrice" placeholder="15000">

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


    <div>每坪數約 {{ calculateAverageCostBySize }} 元</div>
    <div>總計裸屋成本約：{{ calculateTotalCost }} </div>

  </div>
</template>



<script>
export default {
  name: 'app',
  data: () => ({
    additionGroup: [],
    costLists: {
      "washingMachine": 1000,
      "bed": 1000,
      "network": 600,
      "garbageCollection": 500,
      "dispenser": 300
    },
    currentUrl: null,
    rentPrice: 0,
    spaceSize: 0
  }),
  mounted() {
    this.fetchRentPrice()
    this.fetchCurrentUrl()
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

      return this.rentPrice - additionCost
    },
    calculateAverageCostBySize: function() {
      return Math.round(this.calculateTotalCost / this.spaceSize)
    }
  },
  methods: {
    fetchRentPrice() {
      const setRentPrice = (price) => { this.rentPrice = price }
      const setSpaceSize = (size) => { this.spaceSize = size }

      chrome.tabs.executeScript({
          code: '(' + function() {
            return { price: document.getElementsByClassName("price")[0].innerText, spaceSize: document.getElementsByClassName("attr")[0].querySelector("li").innerText };
          } + ')(' + JSON.stringify() + ');'
      }, function(results) {
        let priceText = results[0].price
        let spaceSizeText = results[0].spaceSize

        let integerPrice = parseInt(priceText.replace(",", ""))
        let integerSpaceSize = spaceSizeText.match(/\d+/)[0]


        setRentPrice(integerPrice)
        setSpaceSize(integerSpaceSize)
      });
    },
    fetchCurrentUrl() {
      const setCurrentUrl = (url) => { this.currentUrl = url }
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

        setCurrentUrl(tabs[0].url)
      });
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
