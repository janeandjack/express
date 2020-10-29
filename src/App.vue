<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    isMobile() {
      const rect = document.body.clientWidth;
      return rect - 1 < 992;
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile();
        this.$store.dispatch("toggleDevice", isMobile ? "mobile" : "desktop");

        if (isMobile) {
          this.$store.dispatch("closeSideBar");
        }
      }
    },
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  mounted() {
    if (this.isMobile()) {
      this.$store.dispatch("toggleDevice", "mobile");
      this.$store.dispatch("closeSideBar");
    }
  },
};
</script>
<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,500i,700");
body {
  font-family: "Roboto", sans-serif;
}
</style>
