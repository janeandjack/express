<template>
  <div class="mt-5 ml-4">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">订单详情</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"
            ><i class="fas fa-file-signature" /> 签收评价</span
          >
        </el-breadcrumb-item>
        <div class="float-right mt-2 mr-3">
          <el-input
            v-model="keyWord"
            type="text"
            placeholder="搜索"
            class="filter-item searchInputWidth"
            prefix-icon="el-icon-search"
            @input="handleQuery"
            clearable
          />
        </div>
      </el-breadcrumb>
      <!-- <pre>{{packageTrackingList}}</pre> -->
      <el-table
        :data="TableData"
        class="borderRadius mt-5"
        border
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="orderId" label="订单号" align="center" sortable>
          <template slot-scope="{ row }">
            <span>{{ row.orderId.substr(-10) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expressCompany"
          label="国际快递公司"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            <span>{{ row.expressCompany }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="trackingNumber"
          label="国际单号"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            <span>{{ row.trackingNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="trackingContact"
          label="收件人"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            <span>{{ row.trackingContact }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="trackingAddress"
          label="收件地址"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            <span>{{ row.trackingAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="packageTime"
          sortable
        >
          <template slot-scope="{ row }">
            <span>{{
              row.packageTime
                | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="快递寄送情况" align="center">
          <template slot-scope="{ row }">
            <span>
              <el-link
                type="warning"
                target="_blank"
                :href="
                  returnTrackingLink(row.expressCompany, row.trackingNumber)
                "
                >点击查询</el-link
              >
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="签收"
          width="160"
          align="center"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <el-checkbox v-model="row.signstatus"></el-checkbox>
            <div v-if="row.signstatus === true">
              留下您的评价吧：
              <el-rate v-model="row.commentvalue" show-score :colors="colors">
              </el-rate>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-5 float-right">
        <el-button
          v-if="SignSwitch === true"
          type="primary"
          @click="submitSignComment"
          >确认签收</el-button
        >
        <el-button v-else type="primary" disabled="">确认签收</el-button>
      </div>
      <pagination
        :data="TableData"
        class="mt-5 float-right"
        @pagechange="pageChange"
        pager="prev, pager, next, jumper, ->, total, slot"
        limitNumber="5"
      />
    </div>
  </div>
</template>

<script>
import {
  reactive,
  computed,
  onMounted,
  ref,
  inject,
  watchEffect,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
export default {
  components: {
    pagination,
  },
  setup(props, { root: { $store, $message } }) {
    onMounted(() => {
      $store.dispatch("getOrderForm", {
        status: "已发货",
        page: "0",
        size: "5",
      });
    });
    const loading = ref(false);
    const toReload = inject("reload");

    //table data for display
    const packageTrackingList = computed(() => {
      return $store.state.selforderlist;
    });
    const keyWord = ref("");
    const returnData = ref([]);
    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已发货",
        page: "0",
        size: "5",
      };
      $store
        .dispatch("searchOrdersForUser", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };
    const TableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = packageTrackingList.value;
      }
      return data.map((object) => {
        return {
          orderId: object._id,
          expressCompany: object.orderExpressRetail,
          trackingNumber: object.orderShippingNumber,
          trackingContact: `${object.shippingRecevier}, ${object.shippingPhone}`,
          trackingAddress: `${object.shippingAddress}, ${object.shippingCity}, ${object.shippingProvince}, ${object.shippingCountry}, ${object.shippingPostcode}`,
          packageTime: object.updatedAt,
          signstatus: false,
          commentvalue: 0,
        };
      });
    });
    const tableRowClassName = ({ row }) => {
      if (row.signstatus === true) {
        return "warning-row";
      }
      return "";
    };
    const colors = reactive(["#99A9BF", "#F7BA2A", "#FF9900"]);
    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getOrderForm", {
          status: "已发货",
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchOrdersForUser", {
            keyword: { searchString: keyWord.value },
            status: "已发货",
            page: val - 1,
            size: 5,
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    //sign and comment
    const SignSwitch = ref(false);
    watchEffect(() => {
      if (
        TableData.value.filter((object) => object.signstatus == true).length ==
        0
      ) {
        SignSwitch.value = false;
      } else {
        SignSwitch.value = true;
      }
    });
    const submitSignComment = () => {
      loading.value = true;
      let data = TableData.value
        .filter((object) => object.signstatus === true)
        .map((object) => {
          return {
            id: object.orderId,
            is_delivery: 1,
            orderEvaluate: object.commentvalue,
          };
        });
      $store
        .dispatch("isDeliveryAndRank", data)
        .then(() => {
          $message.success("感谢您的签收以及评分！");
          loading.value = false;
          toReload();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    //tracking
    const returnTrackingLink = (company, number) => {
      if (company === "DHL") {
        let urlPrefix = "https://www.dhl.com/en/express/tracking.html?AWB=";
        let urlSuffix = "&brand=DHL";
        return urlPrefix + number + urlSuffix;
      } else if (company === "UPS") {
        let urlPrefix = "https://www.ups.com/track?loc=en_CA&tracknum=";
        let urlSuffix = "&requester=WT/trackdetails";
        return urlPrefix + number + urlSuffix;
      } else if (company === "FedEx") {
        let urlPrefix =
          "https://www.fedex.com/apps/fedextrack/index.html?tracknumbers=";
        let urlSuffix = "&cntry_code=ca";
        return urlPrefix + number + urlSuffix;
      } else if (company === "TNT") {
        let urlPrefix =
          "https://www.tnt.com/express/en_ca/site/tracking.html?searchType=con&cons=";
        return urlPrefix + number;
      } else if (company === "EMS") {
        let urlPrefix = "https://t.17track.net/en#nums=";
        return urlPrefix + number;
      } else if (company === "Special") {
        $message.error("暂无Special速递查询信息");
      }
    };

    return {
      loading,

      keyWord,
      handleQuery,
      pageChange,
      TableData,
      packageTrackingList,
      tableRowClassName,
      colors,

      SignSwitch,
      submitSignComment,

      returnTrackingLink,
    };
  },
};
</script>

<style lang="scss">
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-breadcrumb-outer {
  height: 48px;
  font-size: 15px;
  background-color: #f0f3f4;
  border-radius: 3px;
}
</style>
