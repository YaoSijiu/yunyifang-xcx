import App from "./App";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
import request from "./utils/request.js";

Vue.config.productionTip = false;
Vue.prototype.$request = request; // 挂载到 Vue 原型

App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import request from "./utils/request.js";

export function createApp() {
  const app = createSSRApp(App);

  // 挂载全局请求方法
  app.config.globalProperties.$request = request;

  return {
    app,
  };
}

// #endif
