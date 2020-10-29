<template>
  <div class="top-area">
    <div class="top-area-bg" data-stellar-background-ratio="0.6"></div>
    <!-- <div class="header-top-area">
      <div class="mainmenu-area" id="mainmenu-area">
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
                <a class="nav-link" href="/#/">{{ $t("lang.home") }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">{{ $t("lang.mailing") }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">{{ $t("lang.about") }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">服务</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">{{ $t("lang.coo") }}</a>
              </li>
              <li class="nav-item">
                <span class="nav-link"
                  ><span class="langSpan" @click="toCH">中文</span> |
                  <span class="langSpan" @click="toEN"> EN</span></span
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div> -->
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
          <span class="pl-2"
            ><a href="/#/login/login" @click="loginSwitch = true">登录</a> |
            <a href="/#/login/register" @click="loginSwitch = false">
              注册</a
            ></span
          >
        </div>
      </div>
    </div>
    <!--HOME SLIDER AREA-->
    <div class="welcome-slider-area">
      <div class="welcome-single-slide slider-bg-one">
        <div class="container">
          <div class="row flex-v-cener">
            <div class="col-md-10 offset-md-1">
              <div class="welcome-text text-center">
                <!-- login -->
                <div class="ms-login" v-if="loginSwitch">
                  <h2>用户登录</h2>
                  <el-form
                    :model="loginParam"
                    ref="login"
                    label-width="0px"
                    class="ms-content"
                  >
                    <el-form-item prop="email">
                      <el-input
                        v-model="loginParam.email"
                        placeholder="请输入电子邮箱"
                      >
                        <el-button
                          slot="prepend"
                          icon="el-icon-user"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="loginParam.password"
                        @keyup.enter.native="submitLoginForm()"
                      >
                        <el-button
                          slot="prepend"
                          icon="el-icon-lock"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                    <div class="login-btn">
                      <el-button
                        type="primary"
                        @click="submitLoginForm()"
                        v-loading="loading"
                        >确认登录</el-button
                      >
                    </div>
                    <p class="login-tips">
                      新用户?
                      <span class="span" @click="loginSwitch = !loginSwitch"
                        >点击注册</span
                      >
                      <span class="span_f" @click="forgotPsw()"
                        >忘记密码？</span
                      >
                    </p>
                  </el-form>
                </div>

                <!-- signup -->
                <div class="ms-login" v-if="!loginSwitch">
                  <h2>新用户注册</h2>
                  <el-form
                    :model="signupParam"
                    ref="login"
                    label-width="0px"
                    class="ms-content"
                  >
                    <el-form-item prop="email">
                      <el-input
                        v-model="signupParam.email"
                        placeholder="请输入电子邮箱"
                      >
                        <el-button
                          slot="prepend"
                          icon="el-icon-user"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                      <el-input
                        v-model="signupParam.username"
                        placeholder="请输入用户名"
                      >
                        <el-button
                          slot="prepend"
                          icon="el-icon-s-flag"
                        ></el-button>
                      </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                      <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="signupParam.password"
                      >
                        <el-button
                          slot="prepend"
                          icon="el-icon-lock"
                        ></el-button>
                      </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                      <el-input
                        type="password"
                        placeholder="请确认密码"
                        v-model="signupParam.password_v"
                      >
                        <el-button
                          slot="prepend"
                          icon="el-icon-lock"
                        ></el-button>
                      </el-input>
                    </el-form-item>

                    <el-form-item prop="weixin">
                      <el-input
                        v-model="signupParam.weixin"
                        placeholder="请输入微信账号,以便客服服务"
                      >
                        <el-button
                          slot="prepend"
                          icon="fab fa-weixin"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                    <div class="login-btn">
                      <el-button
                        type="primary"
                        @click="submitSignUpForm()"
                        v-loading="loading"
                        >点击注册</el-button
                      >
                    </div>
                    <p class="login-tips">
                      已经有了账户？
                      <span class="span" @click="loginSwitch = !loginSwitch"
                        >直接登录</span
                      >
                    </p>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--END HOME SLIDER AREA-->
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
export default {
  name: "login",
  //props, {root:{$store, $router}}
  setup(
    props,
    { root: { $route, $router, $store, $message, $i18n, $alert } }
  ) {
    const loginSwitch = ref(true);

    const loginParam = ref({
      email: "",
      password: "",
    });
    const loading = ref(false);

    onMounted(() => {
      if ($route.params.login === "register") {
        loginSwitch.value = false;
      } else if ($route.params.login === "login") {
        loginSwitch.value = true;
      }
    });

    // const role = computed(() => {
    //   if (this.$store.state.role === "Admin/管理员") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    const submitLoginForm = () => {
      loading.value = true;
      let loginInfo = {
        email: loginParam.value.email,
        password: loginParam.value.password,
      };

      $store
        .dispatch("login", loginInfo)

        .then(() => {
          // if (role) {
          // $router.push("/dashboard/admindashinfo");
          // } else {
          $router.push("/dashboard");
          loading.value = false;
          // }
          $message.success("登陆成功！");
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const signupParam = ref({
      email: "",
      password: "",
      password_v: "",
      username: "",
      weixin: "",
    });

    const submitSignUpForm = () => {
      loading.value = true;
      let emailFormat = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      let passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (signupParam.value.email === "") {
        $message.error("注册邮箱不能为空！");
        loading.value = false;
      } else if (!emailFormat.test(signupParam.value.email)) {
        $message.error("邮箱格式不正确！");
        loading.value = false;
      } else if (signupParam.value.password.length < 8) {
        $message.error("密码长度要至少八位！");
        loading.value = false;
      } else if (!passwordFormat.test(signupParam.value.password)) {
        $message.error("密码至少含有一个字母和一个数字！");
        loading.value = false;
      } else if (signupParam.value.password_v === "") {
        $message.error("确认密码不能为空！");
        loading.value = false;
      } else if (signupParam.value.password !== signupParam.value.password_v) {
        $message.error("两次输入密码不同，请重新输入！");
        loading.value = false;
      } else if (signupParam.value.username === "") {
        $message.error("用户名不能为空！");
        loading.value = false;
      } else if (signupParam.value.username.indexOf(" ") >= 0) {
        $message.error("用户名不能含有空格！");
        loading.value = false;
      } else {
        let data = {
          email: signupParam.value.email,
          username: signupParam.value.username,
          password: signupParam.value.password,
          weixin: signupParam.value.weixin,
        };
        $store
          .dispatch("signup", data)
          .then(() => {
            $alert("注册成功，请登录邮箱验证激活账户！", '提示', {
              confirmButtonText: '确定',
              type: "success",
            }).then(() => {
              loading.value = false;
              loginSwitch.value = !loginSwitch.value;
            });
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    const forgotPsw = () => {
      $router.push("/resetpassword/1/1/false");
    };

    const toCH = () => {
      $i18n.locale = "zh-CN";
      localStorage.setItem("lang", "zh-CN");
    };
    const toEN = () => {
      $i18n.locale = "en-US";
      localStorage.setItem("lang", "en-US");
    };

    return {
      loading,
      loginSwitch,
      forgotPsw,

      loginParam,
      submitLoginForm,

      signupParam,
      submitSignUpForm,

      toCH,
      toEN,
    };
  },
};
</script>

<style lang="scss">
.ms-login {
  height: 50% !important;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  /* background: rgba(255, 255, 255, 0.3); */
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.span {
  color: blue;
}
.span:hover {
  cursor: pointer;
}

.span_f {
  color: #ff8c00;
  margin-left: 100px;
}
.span_f:hover {
  cursor: pointer;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}

/*--------------------------
    2. TOP AREA
---------------------------*/

.top-area {
  height: 100vh;
  position: relative;
  width: 100%;
}

.top-area-bg {
  background: rgba(0, 0, 0, 0) url("../assets/slider/slide_1.jpg") no-repeat
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

.header-top-area {
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
}

.mainmenu-area {
  border-bottom: 1px solid rgba(243, 156, 18, 0.4);
  position: relative;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  z-index: 9999;
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

.slider-bg-one {
  background: url(../assets/slider/slide_1.jpg) no-repeat scroll center center /
    cover;
}

.slider-bg-two {
  background: url(../assets/slider/slide_2.jpg) no-repeat scroll center center /
    cover;
}

.slider-bg-three {
  background: url(../assets/slider/slide_3.jpg) no-repeat scroll center center /
    cover;
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
