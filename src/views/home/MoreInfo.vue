<template>
  <div class="top-area">
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
            <li @click="$router.push('/collaborate')">
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
            <li class="active" @click="$router.push('/moreInfo')">
              <a href="#">帮助中心</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="helpcenter">
      <div class="banner1">
        <div class="pageText wow fadeInDown">
          <p class="mb-4">帮助中心</p>
        </div>
        <div class="row helpNav">
          <div
            class="col-4 box wow zoomIn"
            v-for="(item, index) in helpNav"
            :key="index"
          >
            <div
              :class="active == item.routeLink ? 'active' : ''"
              class="container mb-5"
              @click="helpNavRouter(item.routeLink)"
            >
              <img class="mt-3" :src="'/images/' + item.img" alt="item.img" />
              <p class="mt-3 mb-3">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view id="helpitem" class="mb-5"></router-view>
    <footer1 />
    <back-top color="#409EFF" :size="1.1" :slow="10" bottom="5%"></back-top>
  </div>
</template>

<script>
import footer1 from "@/views/home/Footer.vue";
export default {
  name: "MoreInfo",
  components: { footer1 },
  data() {
    return {
      helpNav: [
        {
          title: "相关服务",
          img: "service.png",
          routeLink: "/moreInfo",
        },
        {
          title: "相关收费",
          img: "fee.png",
          routeLink: "/moreInfo/relevantcharges",
        },
        {
          title: "海关及税收",
          img: "tax.png",
          routeLink: "/moreInfo/taxation",
        },
        {
          title: "货类相关",
          img: "good.png",
          routeLink: "/moreInfo/relevantgoods",
        },
        {
          title: "渠道相关",
          img: "channel.png",
          routeLink: "/moreInfo/relevantchannel",
        },
        {
          title: "售后须知",
          img: "aftersale.png",
          routeLink: "/moreInfo/aftersaleinfo",
        },
      ],
      active: "/moreInfo",
    };
  },
  computed: {
    userExist: function() {
      return this.$store.state.userSelf.username;
    },
  },
  watch: {
    $route: function(to) {
      this.active = to.path;
    },
  },
  methods: {
    helpNavRouter(e) {
      this.$router.push(e);
      document.getElementById("helpitem").scrollIntoView();
    },
    toCH() {
      this.$i18n.locale = "zh-CN";
      localStorage.setItem("lang", "zh-CN");
    },
    toEN() {
      this.$i18n.locale = "en-US";
      localStorage.setItem("lang", "en-US");
    },
  },
};
</script>

<style lang="scss" scoped>
.top-area {
  height: 100vh;
  position: relative;
  width: 100%;
}

.helpcenter {
  height: 100%;
  .banner1 {
    position: relative;
    height: 100%;
    text-align: center;
    background: url("../../../public/images/helpcenter.jpg") no-repeat scroll
      center center / cover;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-color: #212537;
      opacity: 0.5;
    }
  }
  .pageText {
    position: relative;
    top: 20%;
    opacity: 1 !important;
    color: #fff;
    font-size: 3.25em;
    font-weight: bolder;
  }
  .helpNav {
    position: relative;
    top: 25%;
    width: 80%;
    margin: 0 auto;
    .box {
      .container {
        width: 300px;
        height: 200px;
        border: #fff solid 1px;
        border-radius: 20px;
        p {
          font-size: 1.25em;
          color: #fff;
          font-weight: bold;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    .active {
      background-color: #f39c12;
      border: #f39c12 solid 1px !important;
    }
    @media (max-width: 576px) {
      width: 100%;
      .box {
        .container {
          width: 100px;
          height: 100px;
          img {
            width: 50px;
            height: 50px;
          }
          p {
            font-size: 10px !important;
          }
        }
      }
    }
    @media (min-width: 576px) and (max-width: 768px) {
      width: 100%;
      .box {
        .container {
          width: 200px;
          height: 150px;
          img {
            width: 80px;
            height: 80px;
          }
          p {
            font-size: 1em !important;
          }
        }
      }
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      width: 100%;
      .box {
        .container {
          width: 300px;
          height: 200px;
          img {
            width: 120px;
            height: 120px;
          }
          p {
            font-size: 1.5em !important;
          }
        }
      }
    }
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
</style>
