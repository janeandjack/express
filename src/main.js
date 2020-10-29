import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Element, { size: "small", zIndex: 3000 });
import { message } from "@/components/Message.js";
Vue.prototype.$message = message;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import BackTop from "@mlqt/vue-back-top";
Vue.use(BackTop);
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import VueClipboard from "vue-clipboard2";
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);
import moment from "moment-timezone";
require("moment/locale/zh-cn");
Vue.use(require("vue-moment"), { moment });

import Lightbox from "vue-easy-lightbox";
Vue.use(Lightbox);

import "fullpage-vue/src/fullpage.css";
import VueFullpage from "fullpage-vue";
Vue.use(VueFullpage);

import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "zh-CN", // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    "zh-CN": require("./languages/ch"), // 中文语言包
    "en-US": require("./languages/en"), // 英文语言包
  },
});

import Router from "vue-router";
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start();
  const role = localStorage.getItem("Authorization");
  if (!to.matched.some((route) => route.meta.permission)) {
    if (
      !role &&
      !to.path.startsWith("/login") &&
      !to.path.startsWith("/moreInfo") &&
      ["/", "/home", "/aboutus", "/collaborate", "/member"].indexOf(to.path) ===
        -1 &&
      !to.path.startsWith("/resetpassword")
    ) {
      next("/login/login");
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else {
    next();
    NProgress.done();
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

new Vue({
  computed: {
    locale: function() {
      return this.store.state.lang;
    },
  },
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
