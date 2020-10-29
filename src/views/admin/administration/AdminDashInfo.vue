<template>
  <div>
    <div v-if="!role">
      <Page401 />
    </div>
    <div v-if="role">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-people">
              <img
                src="/images/member.svg"
                alt=""
                class="card-panel-icon"
                width="60"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                会员
              </div>
              <count-to
                :start-val="0"
                :end-val="parseInt(memberNumber)"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="card-panel-icon-wrapper icon-message">
              <img
                src="/images/orders.svg"
                alt=""
                class="card-panel-icon"
                width="60"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                订单
              </div>
              <count-to
                :start-val="0"
                :end-val="parseInt(orderNumber)"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('purchases')">
            <div class="card-panel-icon-wrapper icon-money">
              <img
                src="/images/income.svg"
                alt=""
                class="card-panel-icon"
                width="60"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                收入
              </div>
              <count-to
                :start-val="0"
                :end-val="parseInt(totalIncome)"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shoppings')">
            <div class="card-panel-icon-wrapper icon-shopping">
              <img
                src="/images/profits.svg"
                alt=""
                class="card-panel-icon"
                width="60"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                利润
              </div>
              <count-to
                :start-val="0"
                :end-val="parseInt(totalProfit)"
                :duration="3000"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
      </el-row>
      <Chart />
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import Chart from "../components/LineChart";
import Page401 from "@/components/401";
export default {
  components: {
    CountTo,
    Chart,
    Page401,
  },
  mounted() {
    this.$store.dispatch("getUserNumber");
    this.$store.dispatch("getOrderListNumber");
  },
  computed: {
    memberNumber: function() {
      return this.$store.state.userNumber.UserNumber;
    },
    orderNumber: function() {
      return this.$store.state.orderNumber;
    },
    totalIncome: function() {
      return this.$store.state.totalIncome;
    },
    totalProfit: function() {
      return this.$store.state.totalProfit;
    },
    role: function() {
      if (this.$store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  padding: 0 0.2%;
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #a3e7e6;
      }

      .icon-message {
        background: #83bfec;
      }

      .icon-money {
        background: #e97185;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
