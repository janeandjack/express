<template>
  <div>
    <div v-if="!isCollapse" class="logoContainer">
      <img src="/images/logo.png" alt="logo" class="logo" />
    </div>
    <el-scrollbar
      :class="{ 'el-meqqq': isCollapse }"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="$route.path"
        mode="vertical"
      >
        <el-menu-item index="/"
          ><i class="el-icon-s-home"></i
          ><span slot="title">{{ $t("lang.home") }}</span></el-menu-item
        >
        <el-menu-item index="/dashboard" @click="openadminDash">
          <i class="el-icon-s-platform"></i>
          <span slot="title">{{ $t("lang.dashboard") }}</span>
        </el-menu-item>
        <el-menu-item
          index="/dashboard/admindashinfo"
          v-if="role"
          @click="openadminDash"
        >
          <i class="el-icon-finished"></i>
          <span slot="title">统计中心</span>
        </el-menu-item>
        <el-menu-item
          index="/dashboard/goodsstatistic/stockpendinglist"
          v-if="role"
          @click="openadminDash"
        >
          <i class="el-icon-ice-tea"></i>
          <span slot="title">所有商品</span>
        </el-menu-item>
        <el-menu-item
          index="/dashboard/ordersstatistic/orderpackagedlist"
          v-if="role"
          @click="openadminDash"
        >
          <i class="el-icon-notebook-2"></i>
          <span slot="title">所有订单</span>
        </el-menu-item>
        <el-submenu index="3" v-if="role" @click="openadminDash">
          <template slot="title">
            <i
              class="el-icon-chat-dot-square"
              :class="{ 'pl-4': isCollapse }"
            ></i>
            <span slot="title">邮件&公告</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/dashboard/emaileditor">发表</el-menu-item>
            <el-menu-item index="/dashboard/emaillist">列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          index="/dashboard/memberinfocenter"
          v-if="role"
          @click="openadminDash"
        >
          <i class="el-icon-user-solid"></i>
          <span slot="title">会员信息</span>
        </el-menu-item>
        <el-submenu
          index="/dashboard/financecenter"
          v-if="role"
          @click="openadminDash"
        >
          <template slot="title">
            <i class="el-icon-wallet" :class="{ 'pl-4': isCollapse }"></i>
            <span slot="title">财务统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/dashboard/orderturnover"
              >订单流水</el-menu-item
            >
            <el-menu-item index="/dashboard/returngoodsturnover"
              >退货流水</el-menu-item
            >
            <el-menu-item index="/dashboard/cancelorderturnover"
              >取消订单</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          index="/dashboard/advicescenter"
          v-if="role"
          @click="openadminDash"
        >
          <i class="el-icon-phone"></i>
          <span slot="title">投诉与建议</span>
        </el-menu-item>
        <el-menu-item
          index="/dashboard/aftersalecenter"
          v-if="role"
          @click="openadminDash"
        >
          <i class="el-icon-headset"></i>
          <span slot="title">售后统计</span>
        </el-menu-item>
        <el-menu-item
          index="/dashboard/useraccountinfo"
          @click="openadminDash"
          v-if="!role"
        >
          <i class="el-icon-user-solid"></i>
          <span slot="title">{{ $t("lang.memberInfo") }}</span>
        </el-menu-item>
        <el-menu-item
          index="/dashboard/userorderpage/stockpendinglist"
          @click="openadminDash"
          v-if="!role"
          ><i class="el-icon-notebook-2"></i>
          <span slot="title">{{ $t("lang.myOrder") }}</span></el-menu-item
        >
        <el-menu-item
          index="/dashboard/historyorder"
          @click="openadminDash"
          v-if="!role"
        >
          <i class="el-icon-s-order"></i>
          <span slot="title">{{ $t("lang.historyOrder") }}</span></el-menu-item
        >
        <el-menu-item
          index="/dashboard/aftersaleservice"
          @click="openadminDash"
          v-if="!role"
        >
          <i class="el-icon-headset"></i>
          <span slot="title">{{ $t("lang.aftersale") }}</span></el-menu-item
        >
        <el-menu-item
          index="/dashboard/useradvice"
          @click="openadminDash"
          v-if="!role"
        >
          <i class="el-icon-phone"></i>
          <span slot="title">{{ $t("lang.advice") }}</span>
        </el-menu-item>
        <!-- <el-menu-item index="5" @click="openadminDash" v-if="!role">
          <i class="el-icon-s-tools"></i>
          <span slot="title">{{ $t("lang.setting") }}</span>
        </el-menu-item> -->
        <el-menu-item index="6" @click="openadminDash" @click.native="logout">
          <i class="el-icon-error"></i>
          <span slot="title">{{ $t("lang.logOut") }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      // isCollapse: false,
    };
  },
  computed: {
    isCollapse: function() {
      return !this.$store.state.sidebar;
    },
    role: function() {
      if (this.$store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    openadminDash() {
      this.reload();
      localStorage.setItem("activeNumber", 0);
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$store.commit("reset");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-meqqq {
  height: 102vh !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 80vh;
}
.logoContainer {
  height: 20vh;
  background-color: #304156;
  width: 99.5%;
  .logo {
    width: 100%;
    padding: 0 30px;
    margin: 50px 0;
  }
}
.scrollbar-wrapper {
  overflow-x: hidden !important;
}

.el-scrollbar__bar.is-vertical {
  right: 0px;
}

.el-scrollbar {
  height: 82vh;
}
</style>
