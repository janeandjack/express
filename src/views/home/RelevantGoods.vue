<template>
  <div>
    <h2 class="text-center pt-4 pb-4 wow fadeInUp" data-wow-delay="0.2s">
      <span class="mr-3"
        ><span class="d-none d-xl-inline">————————</span>——<span
          class="ball align-middle"
        ></span>
      </span>
      关于敏感商品、抛货商品、重抛商品的运送说明
      <span class="ml-3">
        <span class="ball align-middle"></span
        ><span class="d-none d-xl-inline">————————</span>——</span
      >
    </h2>
    <div class="row mt-5 relevantgoods">
      <img
        class="col-12 col-md-4 wow fadeInLeft" data-wow-delay="0.3s"
        src="/images/relevantgoods1.png"
        alt="relevantgoods1"
      />
      <img
        class="col-12 col-md-4 wow fadeInLeft" data-wow-delay="0.6s"
        src="/images/relevantgoods2.png"
        alt="relevantgoods2"
      />
      <img
        class="col-12 col-md-4 wow fadeInLeft" data-wow-delay="0.9s"
        src="/images/relevantgoods3.png"
        alt="relevantgoods3"
      />
    </div>
    <goods class="mt-4" />
  </div>
</template>
<script>
import goods from "@/views/home/Goods.vue";
export default {
  components: {
    goods,
  },
};
</script>

<style lang="scss" scoped>
.ball {
  display: inline-block;
  width: 13px;
  height: 13px;
  background-color: #000;
  border-radius: 50%;
}
h2 {
  @media (max-width: 576px) {
    font-size: 20px !important;
  }
}
.relevantgoods {
  width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
  img {
    background: linear-gradient(to left, #d8abab, #d8abab) no-repeat 150px 500px;
    // border-bottom: #d8abab 10px solid;
  }
}
</style>
