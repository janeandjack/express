<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-6 col-xl-4">
        <usercard :user="user" />
      </div>
      <div class="col-12 col-sm-6 col-md-6 col-xl-4">
        <boxcard />
      </div>
      <div class="col-12 col-sm-6 col-md-6 col-xl-4">
        <announcement />
      </div>
    </div>
    <!-- <div class="bottom">
      <img
        src="https://lh3.googleusercontent.com/proxy/2wonlQ7MrU46wU--lbSLH1ivPNT9LJ5ANIAc311djxtrLrSsDLftxvI5sKyPayAcUpYbOsoejM00uGQu528C"
      />
    </div> -->
  </div>
</template>

<script>
import usercard from "../components/UserCard";
import boxcard from "../components/BoxCard";
import announcement from "../components/Announcement";
export default {
  name: "dashinfo",
  components: {
    usercard,
    boxcard,
    announcement,
  },
  mounted() {
    this.$store.dispatch("getOrderAnalysis");
  },
  computed: {
    user: function() {
      return this.$store.state.userSelf;
    },
  },
};
</script>
