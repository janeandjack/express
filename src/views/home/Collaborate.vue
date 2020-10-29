<template>
  <div>
    <div class="header-top-area">
      <div class="headerTop row">
        <div class="lang col-4 pl-md-5">
          <i class="fas fa-language"></i>
          <span class="pl-2 langSpan" @click="toCH">中文</span> |
          <span class="langSpan" @click="toEN"> EN</span>
        </div>
        <div class="topLogo col-4 text-center">
          <img
            @click="$router.push('/')"
            src="/images/logo.png"
            alt="logo"
            height="50"
            style="cursor: pointer;"
          />
        </div>
        <div class="user col-4 text-right pr-md-5">
          <div>
            <i class="far fa-user-circle"></i>
            <span class="pl-2" v-if="!userExist"
              ><a href="/#/login/login">登录</a> |
              <a href="/#/login/register"> 注册</a></span
            >
            <span class="pl-2" v-if="userExist"
              ><a href="/#/dashboard">Welcome, {{ userExist }}</a></span
            >
          </div>
        </div>
      </div>
      <div class="mainNav">
        <nav>
          <ul>
            <li @click="$router.push('/home')">
              <a href="#">{{ $t("lang.home") }} </a>
            </li>
            <el-divider direction="vertical"></el-divider>
            <li class="active" @click="$router.push('/collaborate')">
              <a href="#">{{ $t("lang.coo") }}</a>
            </li>
            <el-divider direction="vertical"></el-divider>
            <li @click="$router.push('/aboutus')">
              <a href="#">{{ $t("lang.about") }}</a>
            </li>
            <el-divider direction="vertical"></el-divider>
            <li @click="$router.push('/member')">
              <a href="#">会员</a>
            </li>
            <el-divider direction="vertical"></el-divider>
            <li @click="$router.push('/moreInfo')">
              <a href="#">帮助中心</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="banner">
      <h2>合作联系</h2>
    </div>
    <div class="naviDiv border">
      <div class="innerDiv border-top border-left border-right text-center">
        加入我们
      </div>
    </div>
    <div>
      <div class="secondTitle">
        加入我们，拓展自身市场，打造华人海外联盟！
      </div>
      <div
        v-for="(item, index) in infoOptions"
        :key="index"
        style=" margin-top:60px;"
      >
        <div class="thirdTitle">
          {{ item.title }}
        </div>
        <div class="imageIcon">
          <img :src="item.icon" style="width:60px;height:60px;" alt="" />
        </div>
        <div class="text-center">
          <el-button class="buttonText" @click="dialogVisible = true">{{
            item.buttonText
          }}</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="推广负责人-Andy"
      :visible.sync="dialogVisible"
      width="400px"
    >
      <img class="mx-auto d-block" src="/images/weixinCode.png" />
      <p class="text-center" style="margin-top:20px;font-size:18px;color:red">
        扫描添加微信，加入我们
      </p>
    </el-dialog>
    <div class="naviDiv border" style="margin-top:60px;">
      <div class="innerDiv border-top border-left border-right text-center">
        分享小技巧
      </div>
    </div>
    <div class="imageTextCardDiv row">
      <div
        class="imageTextCard border col-md-5 col-xs-12"
        v-for="(itemInfo, index) in shareSkillsInfo"
        :key="index"
      >
        <div>
          <img :src="itemInfo.picture" style="width:100%;" />
        </div>
        <div class="mt-3 cardText">
          <span>{{ itemInfo.text1 }}</span>
        </div>
        <div class="cardText">
          <span>{{ itemInfo.text2 }}</span>
        </div>
        <div class="cardText">
          <span>{{ itemInfo.text3 }}</span>
        </div>
        <div class="cardText">
          <span>{{ itemInfo.text4 }}</span>
        </div>
        <div class="text-center">
          <el-button class="roundButton"
            >分享<i class="fas fa-share ml-2"></i
          ></el-button>
        </div>
      </div>
    </div>
    <footer1 />
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/composition-api";
import footer1 from "@/views/home/Footer.vue";
export default {
  name: "Collaborate",
  components: { footer1 },
  setup(props, { root: { $store } }) {
    const userExist = computed(() => {
      return $store.state.userSelf.username;
    });
    const toCH = () => {
      this.$i18n.locale = "zh-CN";
      localStorage.setItem("lang", "zh-CN");
    };
    const toEN = () => {
      this.$i18n.locale = "en-US";
      localStorage.setItem("lang", "en-US");
    };

    const infoOptions = reactive([
      {
        title: "如果您是在海外有当地店铺",
        icon: "../images/about_icon1.png",
        buttonText: "联系我们，进一步拓展业务",
      },
      {
        title: "如果身在海外，是学生，或需要一份副业",
        icon: "../images/about_icon2.png",
        buttonText: "联系我们，开发身边资源",
      },
    ]);

    const dialogVisible = ref(false);

    const shareSkillsInfo = reactive([
      {
        picture: "../images/about_img1.png",
        text1: "通过各大社交平台分享，",
        text2: "分享给朋友、亲人、同事、团体。",
        text3: "小小的推广举动，",
        text4: "可以获取平台利润反馈",
      },
      {
        picture: "../images/about_img2.png",
        text1: "当地合作，拓展进一步的",
        text2: "海外驿站业务，打造驿站基地。",
        text3: "多一个合作渠道，",
        text4: "拥有更多的业务拓展",
      },
    ]);
    return {
      userExist,
      toCH,
      toEN,

      infoOptions,
      dialogVisible,
      shareSkillsInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
// .top-area {
//   height: 100vh;
//   position: relative;
//   width: 100%;
// }
.banner {
  margin-top: 110px;
  height: 186px;
  background-color: #212537;
  background-image: url("../../../public/images/coop.png");
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
  h2 {
    color: #fff;
    text-align: center;
    line-height: 186px;
    font-weight: bold;
  }
}
/*---------------------------------
    2.2 MAINMENU AREA
-----------------------------------*/

.header-top-area {
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
}
.headerTop {
  margin: 0 !important;
  width: 100%;
  background-color: #212537;
  height: 60px;
  color: #fff;
  line-height: 60px;
  @media (max-width: 576px) {
    font-size: 12px;
  }
  .lang {
    i {
      font-size: 20px;
      color: #f39c12;
    }
  }
  .user {
    i {
      font-size: 20px;
      color: #f39c12;
    }
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        color: #f39c12;
      }
    }
  }
}

.mainNav {
  height: 60px;
  @media (max-width: 576px) {
    height: 40px;
  }
  nav {
    .active {
      background-color: #f39c12;
      a {
        color: #fff;
      }
    }
    ul {
      list-style-type: none;
      text-align: center;
      padding: 0 !important;
      margin: 0 !important;
      li {
        display: inline-block;
        @media (max-width: 576px) {
          width: 60px;
          a {
            font-size: 12px;
          }
        }
        width: 130px;
        text-align: center;
        &:hover {
          background-color: #f39c12;
          a {
            color: #fff;
          }
        }
        a {
          color: #000;
          text-decoration: none;
          font-weight: 600;
        }
      }
    }
  }
}
.mainmenu-area {
  background-color: #fff;
  border-bottom: 1px solid rgba(243, 156, 18, 0.4);
  position: relative;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  z-index: 9999;
}
.navItems ul li a,
.navItems ul li span {
  font-weight: 540;
  color: #000000 !important;
}
.navItems ul li a:hover {
  color: #f39c12 !important;
}
nav {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
}

.langSpan:hover {
  cursor: pointer;
  color: #f39c12 !important;
}

// 加入我们area
.naviDiv {
  background-color: #f5f5f5;
  height: 50px;
  width: 100%;
  padding-top: 10px;
}
.innerDiv {
  position: relative;
  background-color: white;
  height: 40px;
  width: 150px;
  left: calc(50% - 60px);
  bottom: 1px;
  padding-top: 8px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  font-size: 15px;
  font-weight: 800;
}
.secondTitle {
  margin-top: 40px;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
}
.thirdTitle {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.imageIcon {
  text-align: center;
  margin-top: 35px;
}
.buttonText {
  background-color: #212537;
  color: white;
  height: 40px;
  font-size: 14px;
  margin-top: 35px;
  width: 250px;
}
.imageTextCard {
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.5);
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
  padding-left: 0px;
  padding-right: 0px;
}
.imageTextCardDiv {
  position: relative;
  margin: 0 auto;
  width: 800px;
  margin-bottom: 100px;
}
.cardText {
  color: #212537;
  font-weight: 600;
  font-size: 15px;
  width: 70%;
  margin: 0 auto;
}
.roundButton {
  background-color: #212537;
  color: white;
  height: 40px;
  font-size: 13px;
  margin-top: 25px;
  margin-bottom: 25px;
  border-radius: 40px;
  width: 100px;
}
@media only screen and (max-width: 768px) {
  .imageTextCardDiv {
    width: 400px;
  }
}
</style>
