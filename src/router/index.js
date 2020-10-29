import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "/",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: () => import("../views/home/AboutUs.vue"),
  },
  {
    path: "/collaborate",
    name: "Collaborate",
    component: () => import("../views/home/Collaborate.vue"),
  },
  {
    path: "/member",
    name: "Member",
    component: () => import("../views/home/Member.vue"),
  },
  {
    path: "/moreInfo",
    name: "MoreInfo",
    component: () => import("../views/home/MoreInfo.vue"),
    children: [
      {
        path: "/moreInfo",
        name: "MoreInfo/Service",
        component: () => import("../views/home/Service.vue"),
      },
      {
        path: "/moreInfo/relevantcharges",
        name: "MoreInfo/Relevant Charges",
        component: () => import("../views/home/RelevantCharges.vue"),
      },
      {
        path: "/moreInfo/taxation",
        name: "MoreInfo/Taxation",
        component: () => import("../views/home/Taxation.vue"),
      },
      {
        path: "/moreInfo/relevantgoods",
        name: "MoreInfo/Relevant Goods",
        component: () => import("../views/home/RelevantGoods.vue"),
      },
      {
        path: "/moreInfo/relevantchannel",
        name: "MoreInfo/Relevant Channel",
        component: () => import("../views/home/RelevantChannel.vue"),
      },
      {
        path: "/moreInfo/aftersaleinfo",
        name: "MoreInfo/Aftersale Info",
        component: () => import("../views/home/AftersaleInfo.vue"),
      },
    ],
  },
  {
    path: "/login/:login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/resetpassword/:email/:code/:reset",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/admin/Dashboard.vue"),
    meta: { permission: false },
    children: [
      {
        path: "/dashboard",
        name: "dashinfo",
        component: () => import("../views/admin/user/DashInfo.vue"),
      },
      {
        path: "useraccountinfo",
        name: "useraccountinfo",
        component: () => import("../views/admin/user/UserAccountInfo.vue"),
      },
      {
        path: "useradvice",
        name: "useradvice",
        component: () => import("../views/admin/user/UserAdvice.vue"),
      },
      //user interface
      {
        path: "userorderpage",
        name: "userorderpage",
        component: () => import("../views/admin/user/UserOrderPage.vue"),
        children: [
          {
            path: "stockpendinglist",
            name: "stockpendinglist",
            component: () => import("../views/admin/user/StockPendingList.vue"),
          },
          {
            path: "packpendinglist",
            name: "packpendinglist",
            component: () => import("../views/admin/user/PackPendingList.vue"),
          },
          {
            path: "paypendinglist",
            name: "paypendinglist",
            component: () => import("../views/admin/user/PayPending.vue"),
          },
          {
            path: "expresspendinglist",
            name: "expresspendinglist",
            component: () => import("../views/admin/user/ExpressPending.vue"),
          },
          {
            path: "signcomment",
            name: "signcomment",
            component: () => import("../views/admin/user/SignComment.vue"),
          },
          {
            path: "returngoodslist",
            name: "returngoodslist",
            component: () => import("../views/admin/user/ReturnedGoods.vue"),
          },
        ],
      },
      {
        path: "historyorder",
        name: "historyorder",
        component: () => import("../views/admin/user/HistoryOrder.vue"),
      },
      {
        path: "aftersaleservice",
        name: "aftersaleservice",
        component: () => import("../views/admin/user/AfterSaleService.vue"),
      },

      //administration interface
      {
        path: "admindashinfo",
        name: "AdminDashInfo",
        component: () =>
          import("../views/admin/administration/AdminDashInfo.vue"),
      },
      {
        path: "goodsstatistic",
        name: "goodsstatistic",
        component: () =>
          import("../views/admin/administration/GoodsStatistic.vue"),
        children: [
          {
            path: "stockpendinglist",
            name: "admin-stockpendinglist",
            component: () =>
              import("../views/admin/administration/StockPendingList.vue"),
          },
          {
            path: "goodstockedlist",
            name: "admin-goodstockedlist",
            component: () =>
              import("../views/admin/administration/GoodStockedList.vue"),
          },
          {
            path: "goodsreturnpendinglist",
            name: "admin-goodsreturnpendinglist",
            component: () =>
              import("../views/admin/administration/GoodsReturnPending.vue"),
          },
          {
            path: "packpendinglist",
            name: "admin-packpendinglist",
            component: () =>
              import("../views/admin/administration/PackPendingList.vue"),
          },
          {
            path: "goodsreturnedlist",
            name: "admin-goodsreturnedlist",
            component: () =>
              import("../views/admin/administration/GoodsReturned.vue"),
          },
          {
            path: "goodPackedlist",
            name: "admin-goodpackedlist",
            component: () =>
              import("../views/admin/administration/GoodPackedList.vue"),
          },
        ],
      },
      {
        path: "ordersstatistic",
        name: "ordersstatistic",
        component: () =>
          import("../views/admin/administration/OrdersStatistic.vue"),
        children: [
          {
            path: "orderpackagedlist",
            name: "admin-123",
            component: () =>
              import("../views/admin/administration/OrderPackedList.vue"),
          },
          {
            path: "expresspendinglist",
            name: "admin-expresspending",
            component: () =>
              import("../views/admin/administration/ExpressPendingList.vue"),
          },
          {
            path: "deliveryoutlist",
            name: "admin-456",
            component: () =>
              import("../views/admin/administration/DeliveryOutList.vue"),
          },
          {
            path: "ordersignedlist",
            name: "admin-789",
            component: () =>
              import("../views/admin/administration/OrderSignedList.vue"),
          },
        ],
      },
      {
        path: "emaileditor",
        name: "emailEditor",
        component: () => import("../views/admin/components/EmailEditor.vue"),
      },
      {
        path: "emaillist",
        name: "emailList",
        component: () => import("../views/admin/administration/EmailList.vue"),
      },
      {
        path: "emailDteail/:id",
        name: "emailDetail",
        component: () =>
          import("../views/admin/administration/EmailDetail.vue"),
      },
      {
        path: "memberinfocenter",
        name: "memberinfocenter",
        component: () =>
          import("../views/admin/administration/MemberInfoCenter.vue"),
      },
      {
        path: "advicescenter",
        name: "advicescenter",
        component: () =>
          import("../views/admin/administration/AdvicesCenter.vue"),
      },
      {
        path: "aftersalecenter",
        name: "aftersalecenter",
        component: () =>
          import("../views/admin/administration/AfterSaleCenter.vue"),
      },
      {
        path: "orderturnover",
        name: "orderturnover",
        component: () =>
          import("../views/admin/administration/orderTurnover.vue"),
      },
      {
        path: "returngoodsturnover",
        name: "returngoodsturnover",
        component: () =>
          import("../views/admin/administration/returnGoodsTurnover.vue"),
      },
      {
        path: "cancelorderturnover",
        name: "cancelorderturnover",
        component: () =>
          import("../views/admin/administration/cancelOrderTurnover.vue"),
      },
      {
        path: "announcement/:id",
        name: "announcementDetail",
        component: () => import("../views/admin/user/AnnouncementDispaly.vue"),
      },
    ],
  },
  { path: "*", redirect: "/", hidden: true },
];

const router = new VueRouter({
  routes,
});

export default router;
