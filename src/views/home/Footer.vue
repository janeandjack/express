<template>
  <div id="footer">
    <div class="aboutUs">
      <h4 class="text-center pt-3">
        <span class="d-none d-lg-inline">———————————</span>——
        <span class="pl-5 pr-5 font-weight-bold">关于我们</span>
        <span class="d-none d-lg-inline">———————————</span>——
      </h4>
      <p class="col-12 col-md-9 col-xl-4 text-center mx-auto pt-3">
        Andy Express
        位于中国一线城市深圳，有多年跨境电商以及国际运输经验。开放个人平台为了更好的服务海外华人或海外留学生，甚至于给的海外用户。
      </p>
    </div>
    <div class="conact">
      <h4 class="text-center pt-3">
        <span class="d-none d-lg-inline">———————————</span>——
        <span class="pl-5 pr-5 font-weight-bold">联系方式</span>
        <span class="d-none d-lg-inline">———————————</span>——
      </h4>
      <ul class="row col-12 col-xl-7 mx-auto text-center pt-3">
        <li class="col-12 col-md-4">
          <span class="font-weight-bold">客服 </span>: KAKA
        </li>
        <li class="col-12 col-md-4">
          <span class="font-weight-bold">合作联系 </span>: Yvette/Andy
        </li>
        <li class="col-12 col-md-4">
          <span class="font-weight-bold">收件联系人 </span>: 黄小姐 +86
          13530471349
        </li>
      </ul>
      <div class="text-center pt-1 pt-lg-3 pl-4">
        <img src="/images/weixinCode.png" alt="weixinCode" width="120" />
        <p class="pt-3 col-12">
          <span class="font-weight-bold">国内收货地址 </span>:
          广东省深圳市宝:安区福永街道白石厦东区美华路46号首层Andy Express
        </p>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="footerNav pb-3">
      <ul class="text-center">
        <li><a href="#">关于我们</a></li>
        <li><a href="#">服务协议</a></li>
        <li><a href="#">帮助中心</a></li>
        <li><a href="#">招商合作</a></li>
        <li><a href="#">友情链接</a></li>
        <li><a href="#">联系我们</a></li>
      </ul>
      <p class="text-center">
        Copyright &copy;2020 All rights reserved |
        <i class="fa fa-heart-o" aria-hidden="true"></i> by An Liu
      </p>
    </div>
  </div>
</template>

<style lang="scss">
#footer {
  background-color: #212537;
  color: #fff;
  .conact {
    ul {
      list-style-type: none;
      li {
        display: inline-block;
      }
    }
  }
  .footerNav {
    ul {
      list-style-type: none;
      li {
        display: inline-block;
        a {
          color: #fff;
          text-decoration: none;
          &::after {
            padding-left: 10px;
            padding-right: 10px;
            content: "|";
          }
          &:hover {
            color: #f39c12;
          }
        }
      }
    }
  }
}
@media (max-width: 576px) {
  #footer {
    h4{
      font-size: 18px;
    }
    font-size: 12px;
  }
}
</style>
