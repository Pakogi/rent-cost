import Vue from "vue";
import App from "./App/App.vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: "#app",
  components: { App },
  render: h => h(App)
});