import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import request from "./request";
// import { mainDomain } from "@/MainAPI.js";

export default new Vuex.Store({
  state: {
    sidebar: true,
    device: "desktop",
    message: "",
    role: "",
    userSelf: {},
    dialogVisible: false,
    avatar: "",
    goodlist: [],
    orderlist: [],
    selforderlist: [],
    advicelist: [],
    aftersalelist: [],
    allGoods: [],
    allEmailTemplate: [],
    emailTemplateData: {},
    allUser: [],
    allAdminAdvice: [],
    allAdminAfterSale: [],
    userNumber: {},
    orderNumber: "",
    totalIncome: "",
    totalProfit: "",
    dataAnalysis: [],
    orderAnalysis: [],
    PaiedCancelOrderForm: [],
    PayedReturnGoods: [],
    token: {},
    orderTurnoverData: [],
    returnGoodsTurnoverData: [],
    cancelOrderTurnoverData: [],
  },
  mutations: {
    reset(state) {
      Object.assign(state, {
        sidebar: true,
        device: "desktop",
        message: "",
        role: "",
        userSelf: {},
        dialogVisible: false,
        avatar: "",
        goodlist: [],
        orderlist: [],
        selforderlist: [],
        advicelist: [],
        aftersalelist: [],
        allGoods: [],
        allEmailTemplate: [],
        emailTemplateData: {},
        allUser: [],
        allAdminAdvice: [],
        allAdminAfterSale: [],
        userNumber: {},
        orderNumber: "",
        totalIncome: "",
        totalProfit: "",
        dataAnalysis: [],
        orderAnalysis: [],
        PaiedCancelOrderForm: [],
        PayedReturnGoods: [],
        token: {},
        orderTurnoverData: [],
        returnGoodsTurnoverData: [],
        cancelOrderTurnoverData: [],
      });
    },
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar = !state.sidebar;
    },
    CLOSE_SIDEBAR: (state) => {
      state.sidebar = false;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    logInResponse(state, payload) {
      state.message = payload.data;
    },
    getUserInfo(state, payload) {
      state.userSelf = payload;
      state.role = payload.level;
    },
    getUserAdvice(state, payload) {
      state.advicelist = payload;
    },
    getUserAfterSale(state, payload) {
      state.aftersalelist = payload;
    },
    openDialog(state, payload) {
      state.dialogVisible = payload;
    },
    goodGet(state, payload) {
      state.goodlist = payload;
    },
    orderGet(state, payload) {
      state.orderlist = payload;
    },
    getOrderForm(state, payload) {
      state.selforderlist = payload;
    },
    getAllGoods(state, payload) {
      state.allGoods = payload;
    },
    getEmailTemplate(state, payload) {
      state.allEmailTemplate = payload;
    },
    getAEmailTemplate(state, payload) {
      state.emailTemplateData = payload[0];
    },
    getAllUser(state, payload) {
      state.allUser = payload;
    },
    getAdminAdvice(state, payload) {
      state.allAdminAdvice = payload;
    },
    getAdminAfterSale(state, payload) {
      state.allAdminAfterSale = payload;
    },
    getUserNumber(state, payload) {
      state.userNumber = payload;
    },
    getOrderListNumber(state, payload) {
      state.orderNumber = payload.orderNumber;
      state.totalIncome = payload.totalIncome;
      state.totalProfit = payload.totalProfit;
    },
    getUpToken(state, payload) {
      state.token = payload;
    },
    getDataAnalysis(state, payload) {
      state.dataAnalysis = payload;
    },
    getOrderAnalysis(state, payload) {
      state.orderAnalysis = payload;
    },
    getPayedReturnGoods(state, payload) {
      state.PayedReturnGoods = payload;
    },
    getPaiedCancelOrderForm(state, payload) {
      state.PaiedCancelOrderForm = payload;
    },
    getOrderTurnover(state, payload) {
      state.orderTurnoverData = payload;
    },
    getReturnGoodsTurnover(state, payload) {
      state.returnGoodsTurnoverData = payload;
    },
    getCancelOrderTurnover(state, payload) {
      state.cancelOrderTurnoverData = payload;
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({ commit }) {
      commit("CLOSE_SIDEBAR");
    },
    toggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    async logInResponse({ commit }, data) {
      commit("logInResponse", data);
    },
    async login(context, data) {
      let res = await request("post", "express/login", data);
      localStorage.setItem("Authorization", res.token);
      localStorage.setItem("activeNumber", 0);
    },
    async signup(context, data) {
      return await request("post", "express/register", data);
    },
    async requestReset(context, data) {
      await request("post", "express/requestReset", data);
    },
    async resetPassword(context, data) {
      await request("post", "express/resetPassword", data);
    },
    async getUserInfo({ commit }) {
      let res = await request("get", "express/getUserInfo");
      commit("getUserInfo", res.data[0]);
    },
    async updateUserInfo({ commit }, data) {
      let res = await request("put", "express/updateUserInfo", data);
      commit("getUserInfo", res.data);
    },

    async avatarUpload(context, data) {
      await request("post", "express/avatarUpload", data);
    },
    async submitExpress(context, data) {
      await request("post", "express/goodSubmit", data);
    },

    async searchGoodsForUser(context, data) {
      let res = await request(
        "post",
        `express/searchGoodsForUser/${data.status}/${data.page}/${data.size}/${data.status1}`,
        data.keyword
      );
      return res;
    },
    async searchOrdersForUser(context, data) {
      let res = await request(
        "post",
        `express/searchOrdersForUser/${data.status}/${data.page}/${data.size}/${data.status1}/${data.status2}`,
        data.keyword
      );
      return res;
    },
    async searchGoods(context, data) {
      let res = await request(
        "post",
        `express/searchGoods/${data.status}/${data.page}/${data.size}/${data.status1}/${data.status2}`,
        data.keyword
      );
      return res;
    },
    async searchOrders(context, data) {
      let res = await request(
        "post",
        `express/searchOrders/${data.status}/${data.page}/${data.size}/${data.status1}/${data.status2}`,
        data.keyword
      );
      return res;
    },

    async createAfterSale(context, data) {
      await request("post", "express/createAfterSale", data);
    },

    async goodGet({ commit }, data) {
      let res = await request(
        "get",
        `express/goodGet/${data.status}/${data.page}/${data.size}/${data.status1}`
      );
      commit("goodGet", res.data);
    },
    async createOrderForm(context, data) {
      await request("post", "express/createOrderForm", data);
    },

    async getAllOrderForm({ commit }, data) {
      let res = await request(
        "get",
        `express/getAllOrderForm/${data.status}/${data.page}/${data.size}/${data.status1}/${data.status2}`
      );
      commit("orderGet", res.data);
    },

    async getUserAdvice({ commit }, data) {
      let res = await request(
        "get",
        `express/getUserAdvice/${data.page}/${data.size}`
      );
      commit("getUserAdvice", res.data);
    },

    async getUserAfterSale({ commit }, data) {
      let res = await request(
        "get",
        `express/getUserAfterSale/${data.page}/${data.size}`
      );
      commit("getUserAfterSale", res.data);
    },

    async createAdvice(context, data) {
      await request("post", "express/createAdvice", data);
    },

    async getAllGoods({ commit }, data) {
      let res = await request(
        "get",
        `express/getAllGoods/${data.status}/${data.page}/${data.size}/${data.status1}/${data.status2}`
      );
      commit("getAllGoods", res.data);
    },

    async submitReturnGoods(context, data) {
      await request("put", "express/submitReturnGoods", data);
    },
    async submitReturnGoodsInfo(context, data) {
      await request("put", "express/submitReturnGoodsInfo", data);
    },

    async goodUpdate(context, data) {
      await request("put", `express/goodUpdate/${data._Id}`, data);
    },
    async adminSubmitGoods(context, data) {
      await request("post", `express/adminSubmitGoods`, data);
    },
    async returnGoods(context, data) {
      await request("put", "express/returnGoods", data);
    },

    async updateOrderForm(context, data) {
      await request("put", `express/updateOrderForm/${data.orderId}`, data);
    },

    async getOrderForm({ commit }, data) {
      let res = await request(
        "get",
        `express/getOrderForm/${data.status}/${data.page}/${data.size}/${data.status1}/${data.status2}`
      );
      commit("getOrderForm", res.data);
    },

    async orderDelivery(context, data) {
      await request("put", "express/orderDelivery", data);
    },

    async orderDelivering(context, data) {
      await request("put", `express/orderDelivering/${data._id}`, data.data);
    },

    async isDeliveryAndRank(context, data) {
      await request("put", "express/isDeliveryAndRank", data);
    },

    async createEmailTemplate(context, data) {
      await request("post", "express/createAnnouncement", data);
    },
    async updateEmailTemplate(context, data) {
      await request("put", `express/updateAnnouncement/${data._id}`, data);
    },
    async getEmailTemplate({ commit }, data) {
      let res = await request(
        "get",
        `express/getAdminAnnouncement/${data.page}/${data.size}`
      );
      commit("getEmailTemplate", res.data);
    },
    async getAEmailTemplate({ commit }, data) {
      let res = await request("get", `express/getAAnnouncement/${data}`);
      commit("getAEmailTemplate", res.data);
    },
    async deleteEmailTemplate(context, data) {
      await request("delete", `express/deleteAnnouncement/${data}`);
    },
    async getAllUser({ commit }, data) {
      let res = await request(
        "get",
        `express/getAllUser/${data.page}/${data.size}`
      );
      commit("getAllUser", res.data);
    },
    async searchUser(context, data) {
      let res = await request(
        "post",
        `express/searchUser/${data.page}/${data.size}`,
        data.keyword
      );
      return res;
    },
    async getAdminAdvice({ commit }, data) {
      let res = await request(
        "get",
        `express/getAdminAdvice/${data.page}/${data.size}`
      );
      commit("getAdminAdvice", res.data);
    },
    async searchAdminAdvice(context, data) {
      let res = await request(
        "post",
        `express/searchAdminAdvice/${data.page}/${data.size}`,
        data.keyword
      );
      return res;
    },
    async getAdminAfterSale({ commit }, data) {
      let res = await request(
        "get",
        `express/getAdminAfterSale/${data.page}/${data.size}`
      );
      commit("getAdminAfterSale", res.data);
    },
    async searchAdminAfterSale(context, data) {
      let res = await request(
        "post",
        `express/searchAdminAfterSale/${data.page}/${data.size}`,
        data.keyword
      );
      return res;
    },

    async updateAdvice(context, data) {
      await request("put", `express/updateAdvice/${data.adviceId}`, data);
    },
    async solveAfterSale(context, data) {
      await request("put", `express/solveAfterSale/${data.afterSaleId}`, data);
    },

    async conformAfterSale(context, data) {
      await request("put", `express/conformAfterSale/${data}`);
    },

    async getUserNumber({ commit }) {
      let res = await request("get", "express/getUserNumber");
      commit("getUserNumber", res.data);
    },
    async getOrderListNumber({ commit }) {
      let res = await request("get", "express/getOrderListNumber");
      commit("getOrderListNumber", res.data);
    },

    async cancleOrderForm(context, data) {
      await request("put", `express/cancleOrderForm/${data.id}`, data.data);
    },

    async userUpdateGoods(context, data) {
      await request("put", `express/userUpdateGoods/${data._id}`, data);
    },

    async cancelReturnGoods(context, data) {
      await request("put", `express/cancleReturnGoods/${data.id}`, data);
    },

    async getUpToken({ commit }) {
      let time = Date.now();
      let res = await request("get", `express/getUpToken/${time}`);
      commit("getUpToken", res.data);
    },

    async rechargeAccount(context, data) {
      await request("put", "express/rechargeAccount", data);
    },
    async payFromAccount(context, data) {
      await request("put", "express/payFromAccount", data);
    },
    async getDataAnalysis({ commit }, data) {
      let res = await request("put", "express/getDataAnalysis", data);
      commit("getDataAnalysis", res.data);
    },
    async getOrderAnalysis({ commit }) {
      let res = await request("get", "express/getOrderAnalysis");
      commit("getOrderAnalysis", res.data);
    },
    async getPayedReturnGoods({ commit }, data) {
      let res = await request(
        "get",
        `express/getPayedReturnGoods/${data.page}/${data.size}`
      );
      commit("getPayedReturnGoods", res.data);
    },
    async getPaiedCancleOrderForm({ commit }, data) {
      let res = await request(
        "get",
        `express/getPaiedCancleOrderForm/${data.page}/${data.size}`
      );
      commit("getPaiedCancelOrderForm", res.data);
    },
    async createInvoice(context, data) {
      await request("post", "express/createInvoice", data);
    },
    async getOrderTurnover({ commit }, data) {
      let res = await request("post", "express/getOrderTurnover", data);
      commit("getOrderTurnover", res.data);
    },
    async getReturnGoodsTurnover({ commit }, data) {
      let res = await request("post", "express/getReturnGoodsTurnover", data);
      commit("getReturnGoodsTurnover", res.data);
    },
    async getCancelOrderTurnover({ commit }, data) {
      let res = await request("post", "express/getCancelOrderTurnover", data);
      commit("getCancelOrderTurnover", res.data);
    },
  },
  modules: {},
});
