<template>
  <div class="border borderRadius">
    <div class="border-bottom pt-2 pb-2 pl-3 divBGFont">
      <span class="mb-3">{{ tabInfo.title }}</span>
    </div>
    <el-row>
      <el-col
        :lg="24 / tabCount"
        :md="8"
        :sm="12"
        :xs="12"
        v-for="(cardInfo, index) in CardsInfo"
        :key="index"
      >
        <el-card
          style="cursor:pointer;"
          shadow="hover"
          class="border-0"
          @click.native="openRoute(cardInfo.route, cardInfo.tabActiveNumber)"
        >
          <div
            class="elCarddiv"
            :class="
              activeNumber === cardInfo.tabActiveNumber ? 'text-highlight' : ''
            "
          >
            <i :class="cardInfo.icon" class="iconsize">
              <span class="fontsize ml-1">
                {{ cardInfo.title }}
              </span>
            </i>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed, reactive, inject } from "@vue/composition-api";
export default {
  props: ["tabInfo"],
  setup(props, { root: { $router } }) {
    //inject reload() to refresh component
    const toReload = inject("reload");

    const CardsInfo = reactive(props.tabInfo.CardsInfo);

    const openRoute = (route, number) => {
      localStorage.setItem("activeNumber", number);
      $router.push(route);
      toReload();
    };

    const activeNumber = computed(() => {
      return parseInt(localStorage.getItem("activeNumber"));
    });

    const tabCount = computed(() => {
      return props.tabInfo.CardsInfo.length;
    });

    return {
      CardsInfo,
      openRoute,
      tabCount,
      activeNumber,
    };
  },
};
</script>

<style lang="scss">
.qaz {
  color: brown;
}
.borderRadius {
  border-radius: 3px;
}
.divBGFont {
  font-size: 18px;
  background-color: #f0f3f4;
}
.elCarddiv {
  text-align: center;
  padding: 20px 0;
  color: #34495e;
}
.iconsize {
  font-size: 44px;
}
.fontsize {
  font-size: 16px;
}
.text-highlight {
  color: #f39c12;
}
</style>
