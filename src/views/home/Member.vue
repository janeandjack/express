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
            <li class="active" @click="$router.push('/member')">
              <a href="#">会员</a>
            </li>
            <el-divider direction="vertical"></el-divider>
            <li @click="$router.push('/moreInfo')">
              <a href="#">帮助中心</a>
            </li>
          </ul>
        </nav>
      </div>
      <h1 class="text-center" style="margin-top: 110px;">暂无内容</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Member",
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

<style lang="scss" scoped>
.top-area {
  height: 100vh;
  position: relative;
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
</style>
