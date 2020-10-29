<template>
  <el-card style="margin-bottom:20px;">
    <!-- <div slot="header" class="clearfix">
      <span>About me</span>
    </div> -->

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello,</div>
          {{ user.username }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.username }}</div>
        <div class="user-role text-center text-muted">{{ user.level }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-user-solid"></i><span> 我的信息</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span><b>邮箱 : </b> {{ user.email }}</span>
          </div>
          <div class="progress-item">
            <span
              ><b>上次登录时间 : </b>
              {{
                user.last_login_time
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}</span
            >
          </div>
        </div>
      </div>

      <div class="user-education user-bio-section">
        <div class="user-bio-section-header" style="color:red;">
          <i class="el-icon-message-solid"></i><span> 注意：</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <ul>
              <li>邮寄请认真核对地址，以免造成不必要的损失。</li>
              <li>
                为了更好的进出口清关，请提醒发货方去除包裹内关于商品价格的信息，例如收据、发票、吊牌等。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
    },
  },
  computed: {
    avatar: function() {
      return imageDomain + this.user.avatar;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
    font-size: 16px;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
    font-size: 15px;
  }
  // b {
  //   color: #000000;
  // }

  .user-bio-section {
    font-size: 14px;
    padding: 10px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.progress-item {
  margin-bottom: 5px;
  font-size: 14px;
}
</style>
