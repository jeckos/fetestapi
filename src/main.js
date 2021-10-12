import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { http } from "./services/http.service.js";

Vue.config.productionTip = false;

Vue.prototype.$http = http;

Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
