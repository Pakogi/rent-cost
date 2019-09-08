import Vue from "vue";
import App from "./App/App.vue";
import store from '../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  el: "#app",
  store,
  components: { App },
  render: h => h(App)
});