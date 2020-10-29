<template>
  <div class="navbar1">
    <div
      style="padding: 0 25px;"
      class="hamburger-container"
      @click="toggleClick"
    >
      <svg
        :class="{ 'is-active': !sidebar }"
        class="hamburger"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
      >
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
        />
      </svg>
    </div>
    <div class="right-menu">
      <el-menu
        class="el-menu-demo float-right"
        mode="horizontal"
        text-color="#000"
        active-text-color="#409EFF"
        :router="true"
      >
        <el-menu-item class="d-none d-md-block"
          ><p class="time">此网站以北京时间为标准: {{ date }}</p></el-menu-item
        >
        <el-menu-item
          index="/"
          v-if="device !== 'mobile'"
          class="font-weight-bold"
          >{{ $t("lang.home") }}</el-menu-item
        >
        <el-menu-item
          index="/home/#express"
          @click="jump('express')"
          v-if="device !== 'mobile'"
        >
          {{ $t("lang.detailedProcess") }}</el-menu-item
        >
        <el-menu-item
          index="/home/#goods"
          @click="jump('goods')"
          v-if="device !== 'mobile'"
          >{{ $t("lang.classification") }}</el-menu-item
        >
        <el-menu-item
          index="/home/#channel"
          @click="jump('channel')"
          v-if="device !== 'mobile'"
          >{{ $t("lang.channelInfo") }}</el-menu-item
        >
        <!-- <el-menu-item index="/dashboard" v-if="device !== 'mobile'">{{
          $t("lang.dashboard")
        }}</el-menu-item> -->
        <el-menu-item @click="changeLangEvent">
          <div class="flag-style">
            <el-image
              class="flag-img"
              src="https://img.icons8.com/color/48/000000/china.png"
            ></el-image>
            <el-image
              class="flag-img"
              src="https://img.icons8.com/color/48/000000/usa.png"
            ></el-image>
          </div>
        </el-menu-item>
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          size="medium"
        >
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar" />
            <span class="ml-3">{{ userSelf.username }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/dashboard/useraccountinfo">
              <el-dropdown-item>{{ $t("lang.profile") }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">{{ $t("lang.logOut") }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { imageDomain } from "@/MainAPI.js";
export default {
  name: "navbar",
  data() {
    return {
      date: this.$moment()
        .tz("Asia/Shanghai")
        .format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  mounted: function() {
    this.timer = setInterval(() => {
      this.date = this.$moment()
        .tz("Asia/Shanghai")
        .format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer); //在Vue实例销毁前，清除定时器
    }
  },
  computed: {
    sidebar: function() {
      return !this.$store.state.sidebar;
    },
    userSelf: function() {
      return this.$store.state.userSelf;
    },
    avatar: function() {
      return imageDomain + this.$store.state.userSelf.avatar;
    },
    device: function() {
      return this.$store.state.device;
    },
  },
  methods: {
    jump(address) {
      localStorage.setItem("id", address);
    },
    toggleClick() {
      this.$store.dispatch("toggleSideBar");
    },
    changeLangEvent() {
      this.$confirm(this.$t("lang.switchLang"), this.$t("lang.tips"), {
        confirmButtonText: this.$t("lang.confirmButton"),
        cancelButtonText: this.$t("lang.cancleButton"),
        type: "warning",
      })
        .then(() => {
          if (this.$i18n.locale === "zh-CN") {
            this.$i18n.locale = "en-US";
            localStorage.setItem("lang", "en-US");
          } else {
            this.$i18n.locale = "zh-CN";
            localStorage.setItem("lang", "zh-CN");
          }
        })
        .catch(() => {
          this.$message.info(this.$t("lang.cancleSwitchLang"));
        });
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
.time {
  color: red;
  font-weight: bold;
  &:hover {
    transform: scale(1.02);
  }
}
.navbar1 {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    .hamburger {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
    .hamburger.is-active {
      transform: rotate(180deg);
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;
    width: calc(100%-200px);
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 50px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .flag-style {
      height: 60px;
      line-height: 60px;
      .flag-img {
        width: 30px;
        margin-top: 15px;
      }
    }
  }
}
</style>
