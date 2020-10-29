<template>
  <div>
    <div v-if="role">
      <goodsstatustab class="mt-2" :tabInfo="tabInfo" />
      <router-view></router-view>
    </div>
    <div v-if="!role">
      <Page401 />
    </div>
  </div>
</template>

<script>
import goodsstatustab from "../components/GoodsStatusTab";
import Page401 from "@/components/401";
import { reactive, computed } from "@vue/composition-api";
export default {
  components: {
    goodsstatustab,
    Page401,
  },
  setup(props, { root: { $store } }) {

    const tabInfo = reactive({
      title: "所有订单",
      CardsInfo: [
        {
          icon: "fas fa-tape",
          title: "待付款",
          route: "/dashboard/ordersstatistic/orderpackagedlist",
          tabActiveNumber:0,
        },
        {
          icon: "fas fa-box",
          title: "待寄出",
          route: "/dashboard/ordersstatistic/expresspendinglist",
          tabActiveNumber:1,
        },
        {
          icon: "fas fa-plane-departure",
          title: "已发货",
          route: "/dashboard/ordersstatistic/deliveryoutlist",
          tabActiveNumber:2,
        },
        {
          icon: "fas fa-file-signature",
          title: "已签收",
          route: "/dashboard/ordersstatistic/ordersignedlist",
          tabActiveNumber:3,
        },
      ],
    });

    const role = computed(() => {
      if ($store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    });

    return {
      tabInfo,
      role,
    };
  },
};
</script>
