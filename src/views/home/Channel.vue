<template>
  <div>
    <h2 class="text-center pt-4 pb-4 wow fadeInUp" data-wow-delay="0.2s">
      <span class="mr-3"
        ><span class="d-none d-xl-inline">——————————</span>————<span
          class="ball align-middle"
        ></span>
      </span>
      渠道须知
      <span class="ml-3">
        <span class="ball align-middle"></span
        ><span class="d-none d-xl-inline">——————————</span>————</span
      >
    </h2>
    <div class="channel row mb-5">
      <div class="col-12 col-md-4 wow fadeInUp" data-wow-delay="0.3s">
        <img class="img-fluid" src="/images/channel1.png" alt="channel" />
      </div>
      <div class="col-12 col-md-4 wow fadeInUp" data-wow-delay="0.4s">
        <img class="img-fluid" src="/images/channel2.png" alt="channel" />
      </div>
      <div class="col-12 col-md-4 wow fadeInUp" data-wow-delay="0.5s">
        <img class="img-fluid" src="/images/channel3.png" alt="channel" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ball {
  display: inline-block;
  width: 13px;
  height: 13px;
  background-color: #000;
  border-radius: 50%;
}
h2 {
  font-weight: bold;
  @media (max-width: 576px) {
    font-size: 20px !important;
  }
}
.channel {
  width: 65%;
  margin: 0 auto;
}

@media only screen and (max-width: 1024px) {
  .channel {
    width: 95%;
  }
}
</style>
