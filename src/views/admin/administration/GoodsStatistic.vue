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
      title: "所有商品",
      CardsInfo: [
        {
          icon: "fas fa-warehouse",
          title: "待入库",
          route: "/dashboard/goodsstatistic/stockpendinglist",
          tabActiveNumber:0,
        },
        {
          icon: "fas fa-boxes",
          title: "已入库",
          route: "/dashboard/goodsstatistic/goodstockedlist",
          tabActiveNumber:1,
        },
        {
          icon: "fas fa-box",
          title: "待打包",
          route: "/dashboard/goodsstatistic/packpendinglist",
          tabActiveNumber:2,
        },
        {
          icon: "fas fa-archive",
          title: "已打包",
          route: "/dashboard/goodsstatistic/goodpackedlist",
          tabActiveNumber:3,
        },
         {
          icon: "fas fa-shipping-fast",
          title: "退货中",
          route: "/dashboard/goodsstatistic/goodsreturnpendinglist",
          tabActiveNumber:4,
        },
        {
          icon: "fas fa-sign",
          title: "已退货",
          route: "/dashboard/goodsstatistic/goodsreturnedlist",
          tabActiveNumber:5,
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
