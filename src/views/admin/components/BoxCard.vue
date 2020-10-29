<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header" v-if="!role">
      <img
        src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
      />
    </div>
    <div style="position:relative;">
      <pan-thumb
        image="/images/logo.png"
        class="panThumb img-fluid"
        v-if="!role"
      />
      <mallki class-name="mallki-text" :text="titleText" />
      <div v-if="role" style="padding-top:35px;">
        <div
          v-for="(item, index) in orderData"
          :key="index"
          class="orderdate row"
          @click="$router.push(item.direction)"
        >
          <span class="col-2">
            <i :class="item.icon" class="iconsize" :style="item.color" />
          </span>
          <p class="title col-6">{{ item.title }}</p>
          <p class="text col-3 text-right" :style="item.border">
            {{ item.text }}
          </p>
        </div>
      </div>
      <div v-if="!role">
        <div style="padding-top:35px;" class="progress-item">
          <span
            ><b>收件人 : </b> Andy Express-{{ username }}
            <el-tooltip class="item" :content="copyMessage" placement="right">
              <i
                class="el-icon-document ml-3"
                v-clipboard:copy="'Andy Express-' + username"
                v-clipboard:success="onCopy"
              />
            </el-tooltip>
          </span>
        </div>
        <div class="progress-item">
          <span
            ><b>收件电话 : </b> {{ phone }}
            <el-tooltip class="item" :content="copyMessage" placement="right">
              <i
                class="el-icon-document ml-3"
                v-clipboard:copy="phone"
                v-clipboard:success="onCopy"
              /> </el-tooltip
          ></span>
        </div>
        <div class="progress-item">
          <span
            ><b>收件地址 : </b> {{ address }}
            <el-tooltip class="item" :content="copyMessage" placement="right">
              <i
                class="el-icon-document ml-3"
                v-clipboard:copy="address"
                v-clipboard:success="onCopy"
              /> </el-tooltip
          ></span>
        </div>
        <div class="progress-item">
          <span
            ><b>收件邮编 : </b> {{ postcode }}
            <el-tooltip class="item" :content="copyMessage" placement="right">
              <i
                class="el-icon-document ml-3"
                v-clipboard:copy="postcode"
                v-clipboard:success="onCopy"
              /> </el-tooltip
          ></span>
        </div>
        <div class="progress-item" @click="dialogVisible = true">
          <span class="weixin"><b>联系微信 : </b> MUAMUAYVETTE</span
          ><i class="fas fa-search ml-2"></i>
        </div>
      </div>
    </div>
    <el-dialog
      title="扫描添加客服微信"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <img
        class="mx-auto d-block"
        src="/images/weixinCode.png"
        alt="weixinCode"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import Mallki from "@/components/TextEffect";

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024,
      },
      dialogVisible: false,
      copyMessage: "Copy",
      postcode: "581000",
      phone: "+86 13632758817",
      address:
        "广东省深圳市宝安区白石厦东区美华路46号首层andy express",
    };
  },
  computed: {
    orderAnalysis: function() {
      return this.$store.state.orderAnalysis;
    },
    username: function() {
      return this.$store.state.userSelf.username;
    },
    role: function() {
      if (this.$store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    },
    titleText: function() {
      if (this.role) {
        return "待处理事项";
      } else {
        return "Andy Express仓库地址";
      }
    },
    orderData: function() {
      return [
        {
          icon: "fas fa-warehouse",
          title: "待入库",
          text: this.orderAnalysis.stockPending,
          color: "background-color: #67C23A;",
          border: "border-right: #67C23A 10px solid;",
          direction: "/dashboard/goodsstatistic/stockpendinglist",
        },
        {
          icon: "fas fa-sign",
          title: "待退货",
          text: this.orderAnalysis.returnPackages,
          color: "background-color: #E6A23C;",
          border: "border-right: #E6A23C 10px solid;",
          direction: "/dashboard/goodsstatistic/goodsreturnpendinglist",
        },
        {
          icon: "fas fa-box",
          title: "待打包",
          text: this.orderAnalysis.packagePending,
          color: "background-color: #F56C6C;",
          border: "border-right: #F56C6C 10px solid;",
          direction: "/dashboard/goodsstatistic/packpendinglist",
        },
        {
          icon: "fas fa-shipping-fast",
          title: "待发货",
          text: this.orderAnalysis.expressPending,
          color: "background-color: #409EFF;",
          border: "border-right: #409EFF 10px solid;",
          direction: "/dashboard/ordersstatistic/expresspendinglist",
        },
        {
          icon: "fas fa-headset",
          title: "售后待回复",
          text: this.orderAnalysis.afterSalePending,
          color: "background-color: #202FD7;",
          border: "border-right: #202FD7 10px solid;",
          direction: "/dashboard/aftersalecenter",
        },
        {
          icon: "fas fa-phone-alt",
          title: "投诉与建议待回复",
          text: this.orderAnalysis.advicePending,
          color: "background-color: #B220D7;",
          border: "border-right: #B220D7 10px solid;",
          direction: "/dashboard/advicescenter",
        },
      ];
    },
  },
  methods: {
    onCopy() {
      this.copyMessage = "Copied!";
      setTimeout(() => {
        this.copyMessage = "Copy";
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.orderdate {
  border-bottom: #eee 1.2px solid;
  padding: 10px 0;
  &:hover {
    background-color: #eee;
    transform: scale(1.02);
    cursor: pointer;
  }
  .iconsize {
    width: 60px;
    height: 60px;
    font-size: 2em;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .title {
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    margin: 0;
  }
  .text {
    height: 60px;
    line-height: 60px;
    margin: 0;
    font-weight: bold;
  }
}
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    /deep/ .pan-info {
      box-shadow: none !important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
    color: #606266;
    // b{
    //   color: #000000;
    // }
    i {
      &:hover {
        cursor: pointer;
      }
    }
    .weixin {
      &:hover {
        cursor: pointer;
      }
    }
  }
  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
