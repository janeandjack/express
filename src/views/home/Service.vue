<template>
  <div>
    <h2 class="text-center pt-4 pb-4 wow fadeInUp" data-wow-delay="0.2s">
      <span class="mr-3"
        ><span class="d-none d-xl-inline">——————————</span>——<span
          class="ball align-middle"
        ></span>
      </span>
      Andy Express 相关服务
      <span class="ml-3">
        <span class="ball align-middle"></span
        ><span class="d-none d-xl-inline">——————————</span>——</span
      >
    </h2>
    <div class="serviceTop">
      <ul>
        <li class="wow fadeInDown">
          <p>免费仓储服务</p>
          <p style="color:#AAAAAA;">
            Andy
            express提供30天的免费仓储服务。使用服务即可得到私人免费仓储仓位。
          </p>
        </li>
        <li class="wow fadeInDown">
          <p>免费的合箱服务</p>
          <p style="color:#AAAAAA;">
            包裹合箱是指，多个包裹，先后寄到仓库的，可以合为一起寄送到一个地址。
          </p>
          <p style="color:#AAAAAA;">
            Andy
            express将会免费为您提供包裹合箱，以最大化压缩您的包裹减轻您的包裹体积重量！
          </p>
        </li>
        <li class="wow fadeInDown">
          <p>签收的包裹，一般会什么时候入库？</p>
          <p style="color:#AAAAAA;">国内包裹的派送时间:</p>
          <p style="color:#F4AE37;">上午10：00（当天下午16：00前入库）</p>
          <p style="color:#F4AE37;">下午16：00（当天晚上18：00前入库）</p>
          <p style="color:#E40012;">
            注：国内休息日（周六、周日）、节假日顺延。
          </p>
        </li>
      </ul>
    </div>
    <div class="serviceBottom">
      <h3 class="text-center pt-4 pb-4 wow fadeInDown" data-wow-delay="0.2s">
        <span class="mr-3"
          ><span class="d-none d-xl-inline">————————</span
          ><span class="ball align-middle"></span>
        </span>
        Andy Express 相关服务问题QA
        <span class="ml-3">
          <span class="ball align-middle"></span
          ><span class="d-none d-xl-inline">————————</span></span
        >
      </h3> 
      <ul class="infinite-list ml-0 pl-0" v-infinite-scroll="load">
        <li
          v-for="(i, index) in questionAnswer"
          :key="index"
          class="infinite-list-item font-weight-bold mx-auto mt-2 wow fadeInDown"
        >
          <p class="text-left">{{ i.question }}</p>
          <p class="text-left">
            {{ i.answer }}
          </p>
        </li>
      </ul>
      <img class="arroDown" src="/images/arroDown.png" alt="arroDown" />
      <p class="text-center font-weight-bold" style="color:#606060;">
        （详细的包裹操作添加客服沟通我们能更好的为您服务）
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questionAnswer: [
        {
          question: "Q：可以帮我验货吗？",
          answer:
            "A：可以提供验货服务。我们可以对普通商品进行验货服务，如核对衣服鞋子的颜色、码数、尺寸、瑕疵等，但无法对专业的产品如数码产品、仪器等进行专业的检测。",
        },
        {
          question: "Q：帮我去掉商品的盒子吗？",
          answer:
            "A：默认包裹原箱转运，只拆商品的外包装，不会拆商品的内包装。如有需要，您可以选择去鞋盒的增值服务。包裹在运输过程中，会经过多道环节，建议鞋盒、填充物、内包装之类的尽量不要拆。",
        },
        {
          question: "Q：称重准确吗？",
          answer:
            "A：包裹一般是原箱称重，准确率达99.5%,并且商家发货时也会显示重量，包裹入库时可以跟商家的发货重量核对（国内快递以公斤计费，对超出部分重量会忽略不计），但如果客户对称重重量有任何疑问，可以联系客服我们会重新称重确认。另外收到包裹后也可以重新称重或核对物流官网重量，如果重量不符我们会为您退还运费。",
        },
        {
          question: "Q：选择合箱时效会慢吗？",
          answer:
            "A：仓库的工作人员会优先处理原箱转运的包裹。合箱的包裹会在1个工作日内处理完毕。",
        },
        {
          question: "Q：选择合箱服务运费会便宜吗？",
          answer:
            "A：合箱服务会省掉单个包裹的首重，并且去掉包裹的外箱，使包裹重量减少，运费会更便宜，但如果商品外形不规则为了更好的保护商品避免运输途中损坏也可能会导致包装重量增加而付更多运费。",
        },
      ],
    };
  },
  methods: {
    load() {
      this.questionAnswer.length += 2;
    },
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
.serviceTop {
  font-size: 1.5em;
  font-weight: bold;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 50px;
  ul{
     list-style-type: square;
  }
  @media (max-width: 576px) {
    width: 90%;
    font-size: 1em;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 1024px) {
    width: 80%;
  }
}
.serviceBottom {
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
  border: solid 3px #aaaaaa;
  border-radius: 20px;
  ul {
    overflow: auto;
    height: 1100px;
    color: #aaaaaa;
    font-size: 1.5em;
    list-style-type: none;
    li {
      border-bottom: #aaaaaa 3px dashed;
      width: 80%;
    }
  }
  @media (max-width: 576px) {
    width: 90%;
    font-size: 1em;
    h3 {
      font-size: 18px !important;
    }
    ul {
      font-size: 1em;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 1024px) {
    width: 80%;
  }
}
.arroDown {
  width: 35px;
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
}
</style>
