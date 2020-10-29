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
            <li @click="$router.push('/collaborate')">
              <a href="#">{{ $t("lang.coo") }}</a>
            </li>
            <el-divider direction="vertical"></el-divider>
            <li class="active" @click="$router.push('/aboutus')">
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

    <div class="aboutImg">
      <!-- <img class="img-fluid" src="/images/about.png" alt="" /> -->
      <div class="fullpage-container">
        <div class="fullpage-wp" v-fullpage="opts" ref="example">
          <div class="page-1 page" v-animate="{ value: 'bounceInLeft' }">
            <div class="banner1">
              <div class="pageText" v-animate="{ value: 'swing' }">
                <h1 class="mb-4">Andy Express</h1>
                <h2>为海外用户提供最贴心最便捷的转运服务</h2>
              </div>
              <div class="pageButton">
                <el-button
                  v-animate="{ value: 'fadeInDown', delay: 500 }"
                  icon="el-icon-caret-bottom"
                  type="warning"
                  circle
                  @click="moveNext"
                ></el-button>
              </div>
            </div>
          </div>
          <div class="page-2 page" v-animate="{ value: 'bounceInRight' }">
            <div class="banner2">
              <div class="pageText" v-animate="{ value: 'zoomIn' }">
                <p class="mb-4">
                  Andy Express，有多年跨境电商以及
                  国际运输经验，2020年开发个人转运
                  平台，致力提供便捷、贴心的转运服务致海外留学生、海外华人甚至于海外用户。
                </p>
              </div>
              <div class="pageButton">
                <el-button
                  v-animate="{ value: 'fadeInDown', delay: 500 }"
                  icon="el-icon-caret-bottom"
                  type="warning"
                  circle
                  @click="moveNext"
                ></el-button>
              </div>
            </div>
          </div>
          <div class="page-3 page" v-animate="{ value: 'zoomIn' }">
            <div class="banner3">
              <div class="pageText" v-animate="{ value: 'zoomIn' }">
                <p>
                  提供免费的仓储、合箱等转运服务，Andy Express 致
                  力为海外用户提供最专业、便捷、贴心的服务。
                </p>
              </div>
              <div class="pageButton">
                <el-button
                  v-animate="{ value: 'fadeInDown', delay: 500 }"
                  icon="el-icon-caret-bottom"
                  type="warning"
                  circle
                  @click="moveNext"
                ></el-button>
              </div>
            </div>
          </div>
          <div class="page-4 page">
            <div class="banner4 d-xl-none">
              <div class="pageTextTop row">
                <div
                  class="imgLeft col-10 col-md-9 col-lg-10 mx-auto"
                  v-animate="{ value: 'fadeInLeft' }"
                >
                  <img src="/images/aboutUS4_1.png" alt="" />
                </div>
                <div
                  class="textRight col-5 mx-auto mt-3 mb-3"
                  v-animate="{ value: 'fadeInRight' }"
                >
                  <img src="/images/aboutUS4_3.png" alt="" />
                </div>
                <div
                  class="imgLeft col-5 mx-auto mt-3 mb-3"
                  v-animate="{ value: 'fadeInLeft' }"
                >
                  <img src="/images/aboutUS4_4.png" alt="" />
                </div>
                <div
                  class="textRight col-10 col-md-9 col-lg-10 mx-auto"
                  v-animate="{ value: 'fadeInRight' }"
                >
                  <img src="/images/aboutUS4_2_1.jpg" alt="" />
                </div>
              </div>
              <div class="pageButton mt-5 text-center">
                <el-button
                  v-animate="{ value: 'fadeInDown', delay: 1000 }"
                  icon="el-icon-caret-bottom"
                  type="warning"
                  circle
                  @click="moveNext"
                ></el-button>
              </div>
            </div>

            <div class="banner4 d-none d-xl-block">
              <div class="pageTextTop row">
                <div
                  class="imgLeft col-5 offset-1"
                  v-animate="{ value: 'fadeInLeft' }"
                >
                  <img class="col-10" src="/images/aboutUS4_1.png" alt="" />
                </div>
                <div
                  class="textRight col-4 offset-2 mt-5"
                  v-animate="{ value: 'fadeInRight' }"
                >
                  <img class="col-6" src="/images/aboutUS4_3.png" alt="" />
                </div>
              </div>
              <div class="pageTextBottom row">
                <div
                  class="imgLeft col-4 offset-2 mt-5 pt-5"
                  v-animate="{ value: 'fadeInLeft', delay: 500 }"
                >
                  <img class="col-6" src="/images/aboutUS4_4.png" alt="" />
                </div>
                <div
                  class="textRight col-5 offset-1"
                  v-animate="{ value: 'fadeInRight', delay: 500 }"
                >
                  <img class="col-8" src="/images/aboutUS4_2.png" alt="" />
                </div>
              </div>
              <div class="pageButton mt-2 text-center">
                <el-button
                  v-animate="{ value: 'fadeInDown', delay: 1000 }"
                  icon="el-icon-caret-bottom"
                  type="warning"
                  circle
                  @click="moveNext"
                ></el-button>
              </div>
            </div>
          </div>
          <div class="page-5 page" v-animate="{ value: 'slideInDown' }">
            <div class="banner5">
              <div class="pageText" v-animate="{ value: 'zoomIn' }">
                <p class="mb-4">
                  各种优质渠道供客户选择。与此同时我们不断的更新
                  我们的渠道服务、提高客户体验感。让包裹更快速更
                  安全地到达每一位客户手中。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      opts: {
        start: 0,
        dir: "v",
        loop: "true",
        duration: 500,
        overflow: "auto",
      },
    };
  },
  computed: {
    userExist: function() {
      return this.$store.state.userSelf.username;
    },
  },
  methods: {
    toCH() {
      this.$i18n.locale = "zh-CN";
      localStorage.setItem("lang", "zh-CN");
    },
    toEN() {
      this.$i18n.locale = "en-US";
      localStorage.setItem("lang", "en-US");
    },
    moveNext() {
      this.$refs.example.$fullpage.moveNext(); //Move to the next page
    },
  },
};
</script>

<style lang="scss" scoped>
// .top-area {
//   height: 100vh;
//   position: relative;
//   width: 100%;
// }
.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.banner1 {
  position: relative;
  height: 100%;
  text-align: center;
  &::before {
    content: "";
    background: url("../../../public/images/aboutUS1.png") no-repeat scroll
      center center / cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.6;
  }
  .pageText {
    position: relative;
    top: 20%;
  }
  .pageButton {
    position: relative;
    top: 80%;
  }
  @media (max-width: 576px) {
    h1 {
      font-size: 2em !important;
    }
    h2 {
      width: 60%;
      text-align: center;
      margin: 0 auto;
      font-size: 1.25em !important;
    }
    .pageButton {
      position: relative;
      top: 75%;
    }
  }
  @media (min-width: 576px) and (max-width: 768px) {
    h1 {
      font-size: 2.5em !important;
    }
  }
}
.banner2 {
  position: relative;
  height: 100%;
  text-align: center;
  &::before {
    content: "";
    background: url("../../../public/images/aboutUS2.png") no-repeat scroll
      center center / cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.95;
  }
  .pageText {
    position: relative;
    top: 40%;
    width: 35%;
    margin: 0 auto;
    padding: 30px 50px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    p {
      font-size: 2em;
      color: #fff;
    }
  }
  .pageButton {
    position: relative;
    top: 60%;
  }
  @media (max-width: 576px) {
    .pageText {
      width: 70%;
      top: 30%;
      padding: 20px;
      p {
        font-size: 1.25em;
      }
    }
    .pageButton {
      position: relative;
      top: 50%;
    }
  }
  @media (min-width: 576px) and (max-width: 768px) {
    .pageText {
      width: 70%;
      top: 40%;
      padding: 20px;
      p {
        font-size: 2em;
      }
    }
    .pageButton {
      position: relative;
      top: 60% !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .pageText {
      width: 70%;
    }
    .pageButton {
      position: relative;
      top: 70%;
    }
  }
}
.banner3 {
  position: relative;
  height: 100%;
  text-align: center;
  &::before {
    content: "";
    background: url("../../../public/images/aboutUS3.jpg") no-repeat scroll
      center center / cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 1;
  }
  .pageText {
    position: relative;
    top: 40%;
    left: 5%;
    width: 20%;
    padding: 30px 50px;
    p {
      font-size: 2em;
      color: #000;
      font-weight: bold;
    }
  }
  .pageButton {
    position: relative;
    top: 50%;
  }
  @media (max-width: 576px) {
    .pageText {
      position: relative;
      top: 40%;
      width: 75%;
      margin: 0 auto;
      padding: 30px 50px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.6);
      p {
        font-size: 1em;
        color: #fff;
      }
    }
    .pageButton {
      position: relative;
      top: 60%;
    }
  }
  @media (min-width: 576px) and (max-width: 768px) {
    .pageText {
      position: relative;
      top: 40%;
      width: 75%;
      margin: 0 auto;
      padding: 30px 50px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.6);
      p {
        font-size: 2em;
        color: #fff;
      }
    }
    .pageButton {
      position: relative;
      top: 65% !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .pageText {
      position: relative;
      top: 40%;
      width: 70%;
      margin: 0 auto;
      padding: 30px 50px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.6);
      p {
        font-size: 2em;
        color: #fff;
      }
    }
    .pageButton {
      position: relative;
      top: 75%;
    }
  }
}

.banner4 {
  position: relative;
  margin-top: 180px;
  .pageTextTop {
    .imgLeft {
      // width: 50%;
      color: rgba(243, 156, 18, 0.4);
    }
  }
}

.banner5 {
  position: relative;
  height: 100%;
  text-align: center;
  margin-top: 100px;
  &::before {
    content: "";
    background: url("../../../public/images/aboutUS5.png") no-repeat scroll
      center center / cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.9;
  }
  .pageText {
    position: relative;
    top: 40%;
    width: 50%;
    margin: 0 auto;
    padding: 30px 50px;
    border-radius: 20px;
    background-color: rgba(73, 78, 106, 0.8);
    p {
      font-size: 2em;
      color: #fff;
    }
  }
  @media (max-width: 576px) {
    .pageText {
      width: 70%;
      top: 30%;
      padding: 20px;
      p {
        font-size: 1.25em;
      }
    }
    .pageButton {
      position: relative;
      top: 50%;
    }
  }
  @media (min-width: 576px) and (max-width: 768px) {
    .pageText {
      width: 70%;
      top: 40%;
      padding: 20px;
      p {
        font-size: 2em;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .pageText {
      width: 70%;
    }
    .pageButton {
      position: relative;
      top: 70%;
    }
  }
}

.aboutImg {
  // width: 60%;
  // margin: 0 auto;
  img {
    width: 100%;
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
