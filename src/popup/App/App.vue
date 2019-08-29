<template>
  <div class="main_app">
    <h1>租屋虧多少</h1>

    <div>成本計算開始:</div>
    <input type="text" v-model="price" placeholder="開價多少錢">

  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    message: "HELLO"
  }),
  computed: { },
  created () { },
  mounted () { },
  methods: {

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
