<template>
  <div class="home">
    <goodsstatustab class="mt-2" :tabInfo="tabInfo" />
    <router-view></router-view>
  </div>
</template>

<script>
import goodsstatustab from "../components/GoodsStatusTab";
import { reactive } from "@vue/composition-api";
export default {
  components: {
    goodsstatustab,
  },
  setup() {

    const tabInfo = reactive({
      title: "订单详情",
      CardsInfo: [
        {
          icon: "fas fa-warehouse",
          title: "待入库",
          route: "/dashboard/userorderpage/stockpendinglist",
          tabActiveNumber:0,
        },
        {
          icon: "fas fa-pallet",
          title: "已入库",
          route: "/dashboard/userorderpage/packpendinglist",
          tabActiveNumber:1,
        },
        {
          icon: "fas fa-window-close",
          title: "申退货",
          route: "/dashboard/userorderpage/returngoodslist",
          tabActiveNumber:2,
        },
        {
          icon: "fas fa-file-invoice-dollar",
          title: "待付款",
          route: "/dashboard/userorderpage/paypendinglist",
          tabActiveNumber:3,
        },
        
        {
          icon: "fas fa-people-carry",
          title: "待发货",
          route: "/dashboard/userorderpage/expresspendinglist",
          tabActiveNumber:4,
        },
        {
          icon: "fas fa-file-signature",
          title: "待签收",
          route: "/dashboard/userorderpage/signcomment",
          tabActiveNumber:5, 
        }, 
        
      ],
    });

    return {
      tabInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 98%;
}
</style>
