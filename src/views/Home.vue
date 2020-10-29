<template>
  <div>
    <banner id="home" />
    <express id="express" />
    <goods id="goods" />
    <channel id="channel" />
    <footer1 />
    <back-top color="#409EFF" :size="1.1" :slow="10" bottom="5%"></back-top>
  </div>
</template>

<script>
import banner from "@/views/home/Banner.vue";
import express from "@/views/home/Express.vue";
import goods from "@/views/home/Goods.vue";
import channel from "@/views/home/Channel.vue";
import footer1 from "@/views/home/Footer.vue";
export default {
  name: "Home",
  components: {
    banner,
    express,
    goods,
    channel,
    footer1,
  },
  created() {
    this.$nextTick(() => {
      this.getlocal();
    });
  },
  methods: {
    getlocal() {
      let sel = localStorage.getItem("id");
      let anel = document.getElementById(sel);
      if (sel) {
        anel.scrollIntoView();
      }
      localStorage.setItem("id", "");
    },
  },
};
</script>
