<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="fixed-header">
      <navbar />
    </div>
    <div class="main-container">
      <div class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view :key="$route.path" />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/views/admin/components/SideBar";
import navbar from "@/views/admin/components/NavBar";
export default {
  components: {
    sidebar,
    navbar,
  },
  computed: {
    classObj: function() {
      return {
        hideSidebar: !this.$store.state.sidebar,
        openSidebar: this.$store.state.sidebar,
        mobile: this.$store.state.device === "mobile",
      };
    },
    device: function() {
      return this.$store.state.device;
    },
    sidebar: function() {
      return this.$store.state.sidebar;
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar");
    },
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 98%;
  margin: 0 auto;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 250px;
    margin-top: 80px;
    position: relative;
  }

  .sidebar-container {
    transition: width 0.28s;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: #304156;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.hideSidebar {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px;
  }

  .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;

    .el-tooltip {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }
    }
  }

  .el-submenu {
    overflow: hidden;

    & > .el-submenu__title {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}

.el-menu--collapse .el-menu .el-submenu {
  min-width: 230px !important;
}

// mobile responsive
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: 230px !important;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-230px, 0, 0);
    }
  }
}
.app-main {
  /* 60= navbar  60  */
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
.searchInputWidth{
  width:200px;
}
@media (max-width: 500px) {
  .searchInputWidth{
    width:120px;
  }
}

</style>
