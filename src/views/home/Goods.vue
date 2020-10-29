<template>
  <div>
    <h2 class="text-center pt-4 pb-4 wow fadeInUp" data-wow-delay="0.2s">
      <span class="mr-3"
        ><span class="d-none d-xl-inline">——————————</span>————<span
          class="ball align-middle"
        ></span>
      </span>
      货物分类
      <span class="ml-3">
        <span class="ball align-middle"></span
        ><span class="d-none d-xl-inline">——————————</span>————</span
      >
    </h2>
    <div class="good row mb-5 text-center">
      <div class="col-12 wow fadeInUp mb-4" data-wow-delay="0.2s">
        海关网上可查询品牌为品牌类敏感货（海关网站内有品牌备案信息）, 查询网址：<a href="http://202.127.48.148" target="_blank">http://202.127.48.148</a> 
      </div>
      <div class="col-12 wow fadeInUp" data-wow-delay="0.3s">
        <img class="img-fluid" src="/images/good1.png" alt="good" />
      </div>
      <div class="col-12 wow fadeInUp" data-wow-delay="0.4s">
        <img class="img-fluid" src="/images/good2.png" alt="good" />
      </div>
      <div class="col-12 wow fadeInUp" data-wow-delay="0.5s">
        <img class="img-fluid" src="/images/good3.png" alt="good" />
      </div>
      <div class="col-12 wow fadeInUp" data-wow-delay="0.6s">
        <img class="img-fluid" src="/images/good4.png" alt="good" />
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
.good {
  padding: 0 !important;
  margin: 0 !important;
  img {
    width: 55%;
    margin: 0 auto;
    text-align: center;
  }
}
@media only screen and (max-width: 1024px) {
  .good {
    img {
      width: 95%;
    }
  }
}
</style>
