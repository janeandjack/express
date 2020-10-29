<template>
  <div>
    <h2 class="text-center pt-4 pb-4 wow fadeInUp" data-wow-delay="0.2s">
      <span class="mr-3"
        ><span class="d-none d-xl-inline">——————————</span>——<span
          class="ball align-middle"
        ></span>
      </span>
      Andy Express 相关收费问题
      <span class="ml-3">
        <span class="ball align-middle"></span
        ><span class="d-none d-xl-inline">——————————</span>——</span
      >
    </h2>
    <img src="/images/chargeChart.png" alt="chargeChart" />
    <p class="text-center m-4 font-weight-bold title">
      转运包裹依据实际的情况会有不同的费用说明
    </p>
    <div class="chargeBottom">
      <h3 class="text-center pt-4 pb-4 wow fadeInDown" data-wow-delay="0.2s">
        <span class="mr-3"
          ><span class="d-none d-xl-inline">————————</span
          ><span class="ball align-middle"></span>
        </span>
        一般国际快递计费规则
        <span class="ml-3">
          <span class="ball align-middle"></span
          ><span class="d-none d-xl-inline">————————</span></span
        >
      </h3>
      <ul class="ml-1">
        <li class="wow fadeInDown">
          <p>国际快递计费规定：</p>
          <p style="color:#AAAAAA;">
            根据国际快递规定，国际包裹需要比较体积重与实重的大小，选择重量较大者计算运费。
          </p>
          <p style="color:#F4AE37;">长度测量方式：选取包裹最高点测量。</p>
          <p style="color:#F4AE37;">
            体积计算方式：长×宽×高（cm）÷5000 = 体积重（千克）
          </p>
        </li>
        <li class="wow fadeInDown">
          <p>计费单位：</p>
          <p style="color:#AAAAAA;">
            当国际快递包裹重量等于或小于21kg时，以0.5kg为一个计费单位，当大于21kg时，以1kg为一个计费单位。
          </p>
          <p style="color:#F4AE37;">
            1）计费重量在21kg以下的包裹叫做国际小包，按照每0.5kg为计费单位。
          </p>
          <p style="color:#F4AE37;">
            2）计费重量在21kg（含）以上的包裹为国际大包，按照每1kg为计费单位：
          </p>
          <p style="color:#F4AE37;padding-left:25px;">
            在测量重量时，不能有零头出现，即:
          </p>
          <p style="color:#F4AE37;padding-left:25px;">
            当物品重量在4.15kg时，实际计费按4.5kg；当物品重量在22.3kg时，实际计费按23kg；
          </p>
        </li>
        <li class="wow fadeInDown">
          <p>举例说明：</p>
          <p style="color:#AAAAAA;">
            纸箱尺寸为：高30cm，长60cm，宽52cm，实际重量15kg。
          </p>
          <p style="color:#F4AE37;">
            按照纸箱尺寸计算题及重量为：30×60×52÷5000=18.72kg
          </p>
          <p style="color:#F4AE37;">
            纸箱实际重量15kg，体积重量18.72kg，按照国际快递计费规则，这个纸箱最终的运费计算重量为19kg。
          </p>
        </li>
      </ul>
      <p class="text-center mt-5" style="color:#E40012;">
        注：Andy
        express不收取任何服务费、手续费，并提供免费代收、打包、仓储、验货等增值服务
      </p>
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
  @media (max-width: 576px) {
    font-size: 20px !important;
  }
}
img {
  width: 90%;
  display: block;
  margin: 0 auto;
}
.title {
  color: #aaaaaa;
  font-size: 1.75rem;
  @media (max-width: 768px) {
    font-size: 1.125em;
    margin: 20px !important;
  }
}
.chargeBottom {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  border: solid 3px #aaaaaa;
  border-radius: 20px;
  font-size: 1.5em;
  font-weight: bold;
  ul {
    list-style-type: square;
  }
  @media (max-width: 576px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 90%;
    font-size: 1em;
  }
  @media (max-width: 1024px) {
    width: 90%;
  }
}
</style>
