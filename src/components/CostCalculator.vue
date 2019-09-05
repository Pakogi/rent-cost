<template>
  <div class="cost-calculator">
    <el-header>
      <h1>租屋虧多少</h1>
    </el-header>

    <el-main>
      <p>當前網站 {{currentUrl}}</p>
      <p>坪數{{spaceSize}}</p>

      <div class="rent-price-wrapper">
        <el-input v-model="rentPrice" placeholder="請輸入每月租金"></el-input>

        <div class="price-text">元 / 月</div>
      </div>

      <div>
        <el-checkbox-group v-model="additionGroup" class="options-group">
          <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div>每坪數約 {{ calculateAverageCostBySize }} 元</div>
      <div>總計裸屋成本約：{{ calculateTotalCost }} </div>
    </el-main>
  </div>
</template>

<script>
import Config from "../config/config.env"

console.log(Config.firebase.apiKey)

const additionGroupOptions = ["沒有洗衣機", "沒有床墊", "沒有網路", "沒有飲水機", "沒有代收垃圾"]

export default {
  data: () => ({
    additionGroup: [],
    options: additionGroupOptions,
    costLists: {
      "沒有洗衣機": 1000,
      "沒有床墊": 1000,
      "沒有網路": 600,
      "沒有飲水機": 500,
      "沒有代收垃圾": 300
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

<style scoped>

.options-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
}

.rent-price-wrapper {
  display: flex;
}

.price-text {
  flex: 1 1 30%;
  align-self: center;
}
</style>
