<template>
  <div class="top-area">
    <div class="top-area-bg" data-stellar-background-ratio="0.6"></div>
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
              ><a href="/#/login/login">登录</a>
              <!-- |
              <a href="/#/login/register"> 注册</a> -->
            </span>
            <span class="pl-2" v-if="userExist"
              ><a href="/#/dashboard">Welcome, {{ userExist }}</a></span
            >
          </div>
        </div>
      </div>
      <div class="mainNav">
        <nav style="cursor:pointer;">
          <ul>
            <li class="active" @click="$router.push('/home')">
              <a href="#">{{ $t("lang.home") }} </a>
            </li>
            <el-divider direction="vertical"></el-divider>
            <li @click="$router.push('/collaborate')" >
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
      <!-- <div class="mainmenu-area">
        <nav class="navbar navbar-expand-lg navbar-light navContainer">
          <a href="/#/" class="navbar-brand"
            ><img src="/images/logo.png" alt="logo"
          /></a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse navItems"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#home"
                  >{{ $t("lang.home") }}
                  <el-divider direction="vertical"></el-divider
                ></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"
                  >{{ $t("lang.coo")
                  }}<el-divider direction="vertical"></el-divider
                ></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"
                  >{{ $t("lang.about")
                  }}<el-divider direction="vertical"></el-divider
                ></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"
                  >会员<el-divider direction="vertical"></el-divider
                ></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">帮助中心</a>
              </li>
              <li class="nav-item">
                <span class="nav-link"
                  ><span class="langSpan" @click="toCH">中文</span> |
                  <span class="langSpan" @click="toEN"> EN</span></span
                >
              </li>
              <li class="nav-item">
                <span class="nav-link" v-if="!userExist"
                  ><a href="/#/login/login">登录</a> |
                  <a href="/#/login/register"> 注册</a></span
                >
              </li>
              <li class="nav-item">
                <span class="nav-link" v-if="userExist"
                  ><a href="/#/dashboard">Welcome, {{ userExist }}</a></span
                >
              </li>
            </ul>
          </div>
        </nav>
      </div> -->
    </div>

    <!--HOME SLIDER AREA-->
    <el-carousel indicator-position="none" class="welcome-slider-area">
      <el-carousel-item>
        <div class="welcome-single-slide slider-bg-one">
          <div class="container">
            <div class="row">
              <div class="col-md-10 offset-md-1">
                <div class="welcome-text text-center">
                  <h1>WE MAKE STRONGEST SERVICE ABOVE THE WORLD</h1>
                  <p>
                    Andy Express
                    位于中国一线城市深圳，有多年跨境电商以及国际运输经验。开放个人平台为了更好的服务海外华人或海外留学生，甚至于给的海外用户。
                  </p>
                  <div class="home-button">
                    <a href="/#/login/register">注册会员</a>
                    <a href="#/aboutus">关于我们</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="welcome-single-slide slider-bg-two">
          <div class="container">
            <div class="row">
              <div class="col-md-10 offset-md-1">
                <div class="welcome-text text-center">
                  <h1>WE MAKE STRONGEST SERVICE ABOVE THE WORLD</h1>
                  <p>
                    Andy Express
                    位于中国一线城市深圳，有多年跨境电商以及国际运输经验。开放个人平台为了更好的服务海外华人或海外留学生，甚至于给的海外用户。
                  </p>
                  <div class="home-button">
                    <a href="/#/login/register">注册会员</a>
                    <a href="#/aboutus">关于我们</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="welcome-single-slide slider-bg-three">
          <div class="container">
            <div class="row">
              <div class="col-md-10 offset-md-1">
                <div class="welcome-text text-center">
                  <h1>WE MAKE STRONGEST SERVICE ABOVE THE WORLD</h1>
                  <p>
                    Andy Express
                    位于中国一线城市深圳，有多年跨境电商以及国际运输经验。开放个人平台为了更好的服务海外华人或海外留学生，甚至于给的海外用户。
                  </p>
                  <div class="home-button">
                    <a href="/#/login/register">注册会员</a>
                    <a href="#/aboutus">关于我们</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--END HOME SLIDER AREA-->
  </div>
</template>

<script>
export default {
  name: "TopNav",
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
  },
};
</script>

<style lang="scss">
.top-area {
  height: 100vh;
  position: relative;
  width: 100%;
}

.top-area-bg {
  background: rgba(0, 0, 0, 0) url("../../assets/slider/slide_1.jpg") no-repeat
    scroll center center / cover;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.top-area-bg::after {
  background: #3c4147;
  content: "";
  height: 100%;
  left: 0;
  opacity: 0.9;
  position: absolute;
  top: 0;
  width: 100%;
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
/*-----------------------------------
    2.3 WELCOME TEXT AREA
-------------------------------------*/

.welcome-area {
  color: #ffffff;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-top: 100px;
  width: 100%;
}

.welcome-text h1 {
  color: #ffffff;
  font-size: 60px;
  letter-spacing: 5px;
  line-height: 1.3;
  margin-bottom: 30px;
  text-transform: uppercase;
}

.welcome-text h4 {
  font-size: 20px;
  letter-spacing: 8px;
  text-transform: uppercase;
}

.home-button {
  margin-top: 60px;
  height: auto !important;
}

.home-button a {
  border: 2px #f39c12 solid;
  border-radius: 10px;
  color: #fff;
  letter-spacing: 2px;
  padding: 12px 30px;
  text-transform: uppercase;
}

.home-button a:last-child {
  margin-left: 100px;
  @media (max-width: 576px) {
    margin-left: 50px;
  }
}

.home-button a:hover {
  background: #f39c12 none repeat scroll 0 0;
  border-color: #f39c12;
  color: #ffffff;
  text-decoration: none;
}

.home-mockup > img {
  max-width: 50%;
}

/*------------------------------
    2.4 WELCOME SLIDER AREA
--------------------------------*/

.welcome-slider-area {
  height: 100%;
  position: relative;
  z-index: 9;
}

.welcome-slider-area div:not(.owl-controls) {
  height: 100%;
}

.welcome-single-slide {
  z-index: 9;
  position: relative;
}

.welcome-single-slide:before {
  background: #3c4147;
  content: "";
  height: 100%;
  left: 0;
  opacity: 0.7;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
}

.welcome-slider-area .welcome-text {
  color: #ffffff;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.welcome-text h4 {
  margin-bottom: 30px;
}

.welcome-text h2 {
  color: #fff;
  line-height: 1;
  margin-bottom: 30px;
}

.welcome-slider-area.home-button {
  height: auto !important;
}

.owl-item.active .welcome-single-slide .welcome-text h1 {
  -webkit-animation: 1s ease 0.5s normal both 1 running fadeInUp;
  animation: 1s ease 0.5s normal both 1 running fadeInUp;
}

.owl-item.active .welcome-single-slide .welcome-text p {
  -webkit-animation: 1s ease 0.8s normal both 1 running fadeInUp;
  animation: 1s ease 0.8s normal both 1 running fadeInUp;
}

.owl-item.active .welcome-single-slide .home-button {
  -webkit-animation: 1s ease 1s normal both 1 running fadeInUp;
  animation: 1s ease 1s normal both 1 running fadeInUp;
}

.slider-bg-one {
  background: url(../../assets/slider/slide_1.jpg) no-repeat scroll center
    center / cover;
}

.slider-bg-two {
  background: url(../../assets/slider/slide_2.jpg) no-repeat scroll center
    center / cover;
}

.slider-bg-three {
  background: url(../../assets/slider/slide_3.jpg) no-repeat scroll center
    center / cover;
}

.welcome-slider-area .owl-nav > div {
  background: #fff none repeat scroll 0 0;
  display: inline-block;
  font-size: 30px;
  height: 40px;
  margin: 0 5px;
  padding-top: 5px;
  text-align: center;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  width: 40px;
}

.welcome-slider-area .owl-controls {
  bottom: 7%;
  position: absolute;
  right: 8.4%;
}

.welcome-slider-area .owl-nav > div:hover {
  background: #f39c12 none repeat scroll 0 0;
  color: #fff;
}
</style>
