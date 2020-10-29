<template>
  <div class="top-area">
    <div class="top-area-bg" data-stellar-background-ratio="0.6"></div>
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
                <!-- Send Link -->
                <div class="ms-login" v-if="requestlink">
                  <h2>找回密码</h2>
                  <p class="h5">* 输入正确的注册邮箱，点击发送链接</p>
                  <p class="h5">* 找到邮件内的链接地址，点击进入密码修改</p>
                  <el-form
                    :model="resetParam"
                    :rules="rules"
                    ref="login"
                    label-width="0px"
                    class="ms-content"
                  >
                    <el-form-item prop="email">
                      <el-input
                        v-model="resetParam.email"
                        placeholder="请输入电子邮箱"
                      >
                        <el-button
                          slot="prepend"
                          icon="el-icon-message"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                    <el-button
                      type="primary"
                      @click="requestPsw"
                      v-loading="isLoging"
                      >向邮箱发送链接</el-button
                    >
                    <el-button type="warning" @click="backLogin"
                      >返回</el-button
                    >
                  </el-form>
                </div>

                <!-- reset password -->
                <div class="ms-login" v-if="!requestlink">
                  <h2>修改密码</h2>
                  <el-form
                    :model="resetParam"
                    :rules="rules"
                    ref="login"
                    label-width="0px"
                    class="ms-content"
                  >
                    <el-form-item prop="email">
                      <el-input :value="$route.params.email" disabled>
                        <el-button
                          slot="prepend"
                          icon="el-icon-message"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="resetParam.password"
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
                        v-model="resetParam.password_v"
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
                        @click="submitResetForm()"
                        v-loading="isLoging"
                        >点击修改</el-button
                      >
                    </div>
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
  name: "resetpassword",
  setup(props, { root: { $route, $router, $store, $message, $alert, $i18n } }) {
    const requestlink = ref(true);
    onMounted(() => {
      if ($route.params.reset === "true") {
        requestlink.value = false;
      }
    });

    const isLoging = ref(false);

    const resetParam = ref({
      email: "",
      password: "",
      password_v: "",
    });

    const requestPsw = () => {
      let emailFormat = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (resetParam.value.email === "") {
        $message.error("找回密码的邮箱不能为空！");
      } else if (!emailFormat.test(resetParam.value.email)) {
        $message.error("邮箱格式不正确！");
      } else {
        isLoging.value = true;
        $store
          .dispatch("requestReset", { email: resetParam.value.email })
          .then(() => {
            $alert(
              "密码重置请求发送成功，请登录邮箱查看邮件并修改密码",
              "提示",
              {
                confirmButtonText: "确定",
                type: "success",
              }
            ).then(() => {
              $router.push("/login/login");
              isLoging.value = false;
            });
          })
          .catch(() => {
            $message.error("密码重置请求发送失败！");
            isLoging.value = false;
          });
      }
    };

    const submitResetForm = () => {
      let passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (resetParam.value.password.length < 8) {
        $message.error("密码长度要至少八位！");
      } else if (!passwordFormat.test(resetParam.value.password)) {
        $message.error("密码至少含有一个字母和一个数字！");
      } else if (resetParam.value.password_v === "") {
        $message.error("确认密码不能为空！");
      } else if (resetParam.value.password !== resetParam.value.password_v) {
        $message.error("两次输入密码不同，请重新输入！");
      } else {
        let data = {
          email: $route.params.email,
          password: resetParam.value.password,
        };
        isLoging.value = true;
        $store
          .dispatch("resetPassword", data)
          .then(() => {
            $message.success("修改成功，请重新登录！");
            $router.push("/login/login");
            isLoging.value = false;
          })
          .catch(() => {
            isLoging.value = false;
          });
      }
    };

    const rules = ref({
      password: [
        {
          required: true,
          message: "密码不能为空！",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "邮箱不能为空！",
          trigger: "blur",
        },
      ],
    });

    const backLogin = () => {
      $router.push("/login/login");
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
      requestlink,
      resetParam,
      requestPsw,
      submitResetForm,
      rules,

      backLogin,

      isLoging,

      toCH,
      toEN,
    };
  },
};
</script>

<style>
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

/*---------------------------------
    2.1. SEARCH AND LANGUAGE
----------------------------------*/

.search-and-language-bar {
  margin-left: 20px;
  margin-top: 30px;
  position: relative;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.is-sticky .search-and-language-bar {
  margin-top: 10px;
}

.search-and-language-bar ul li {
  color: #fff;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 10px;
}

.search-and-language-bar ul li a {
  color: #fff;
  display: block;
}

.search-box {
  position: relative;
}

.search-form {
  background: #fff none repeat scroll 0 0;
  border-radius: 5px;
  top: 72px;
  height: 60px;
  position: absolute;
  right: 0;
  width: 280px;
  display: none;
}

.is-sticky .search-form {
  top: 50px;
}

.search-form input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 center;
  border: 1px solid #f39c12;
  color: #333;
  height: 40px;
  left: 11px;
  padding: 10px;
  position: absolute;
  top: 10px;
  width: 77%;
}

.search-form button {
  background: transparent none repeat scroll 0 0;
  border: 1px solid #f39c12;
  color: #f39c12;
  font-size: 20px;
  height: 40px;
  padding: 7px 12px;
  position: absolute;
  right: 10px;
  top: 10px;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.search-form button:hover {
  background: #f39c12 none repeat scroll 0 0;
  color: #fff;
}

.select-language select {
  background: #fff;
  border: 0 none;
  color: #333;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
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

.mainmenu-area {
  border-bottom: 1px solid rgba(243, 156, 18, 0.4);
  position: relative;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  z-index: 9999;
}

.navbar-header {
  margin-top: 14px;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.navbar {
  border-bottom: 0 none;
  border-top: 0 none;
  margin-bottom: 0;
}

.navbar-brand > img {
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.is-sticky .navbar-brand > img {
  max-width: 80%;
}

ul#nav {
  float: right;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

ul#nav li a {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  color: #ffffff;
  letter-spacing: 1px;
  padding: 40px 15px;
  text-transform: uppercase;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

ul#nav li a:hover,
ul#nav li.active a {
  color: #f39c12;
}

.is-sticky ul#nav li a {
  padding: 20px 15px;
  color: #ffffff;
}

.is-sticky ul#nav li a:hover,
.is-sticky ul#nav li.active a {
  color: #f39c12;
}

.is-sticky .navbar-header {
  margin-top: -2px;
}

.is-sticky .mainmenu-area {
  background: #212121;
  -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  z-index: 99999;
}

.menu-toggle.full {
  border: 1px solid;
  height: 40px;
  letter-spacing: 2px;
  padding-top: 8px;
  position: absolute;
  right: 15px;
  text-align: center;
  top: 20px;
  width: 110px;
  color: #f39c12 !important;
}

.is-sticky .menu-toggle.full {
  top: 8px;
}

ul#nav li ul a,
.is-sticky ul#nav li ul a {
  border-bottom: 1px solid #1a1a1a;
  padding: 10px;
  padding-left: 15px;
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
