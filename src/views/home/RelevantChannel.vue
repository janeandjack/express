<template>
  <div>
    <h2 class="text-center pt-4 pb-4 wow fadeInUp" data-wow-delay="0.2s">
      <span class="mr-3"
        ><span class="d-none d-xl-inline">——————————</span>——<span
          class="ball align-middle"
        ></span>
      </span>
      有关选择渠道问题
      <span class="ml-3">
        <span class="ball align-middle"></span
        ><span class="d-none d-xl-inline">——————————</span>——</span
      >
    </h2>
    <div class="channel">
      <div class="channelBottom mt-3">
        <p class="text-left">Q：这么多渠道我应该怎么选择？</p>
        <p class="text-left">
          A：不同的渠道有不同的收费标准，Andy express的渠道分为：
        </p>
        <ul>
          <li>
            <p>四大快递渠道：</p>
            <p>
              <span>DHL</span><span>UPS</span><span>FEX</span><span>TNT</span>
            </p>
          </li>
          <li>
            <p>邮政渠道：</p>
            <p><span>EMS</span></p>
          </li>
          <li>
            <p>专线渠道：</p>
            <p style="color:#F4AE37;">
              专线渠道为个体企业选择渠道，此为清关报税渠道。因发货环节渠道商较多，
              但包裹对于一定的把控性以及稳定性会比国际快递渠道较低，
              存在有丢件/漏件的可能性
            </p>
          </li>
        </ul>
      </div>
      <p class="text-center font-weight-bold" style="color:#606060;">
        （请客户谨慎选择您需要的发货渠道）
      </p>
    </div>
    <channel class="mt-4" />
  </div>
</template>
<script>
import channel from "@/views/home/Channel.vue";
export default {
  components: {
    channel,
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
.channel {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  border: solid 3px #aaaaaa;
  border-radius: 20px;
  p {
    font-weight: bold;
    color: #aaaaaa;
    font-size: 1.5em;
  }
  ul{
     list-style-type: square;
  }
  .channelBottom {
    width: 90%;
    margin: 0 auto;
    p {
      span {
        background-color: #f4ae37;
        padding: 5px 12px;
        border-radius: 10px;
        color: #ffffff;
        margin-right: 10px;
      }
    }
  }
  @media (max-width: 576px) {
    width: 90%;
    p {
      font-size: 1em;
    }
    h3 {
      font-size: 18px !important;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 1024px) {
    width: 80%;
  }
}
</style>
