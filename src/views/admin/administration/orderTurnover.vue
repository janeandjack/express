<template>
  <div>
    <div>
      <div
        class="border pt-2 pb-2 pl-3"
        style="font-size:18px;background-color:#F0F3F4;border-radius:3px;"
      >
        <span class="mb-3">订单流水</span>
        <div class="float-right mr-3">
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
        <el-popover
          placement="bottom"
          title="选择导出时间"
          width="370"
          trigger="click"
          class="float-right mr-3"
        >
          <div>
            <el-date-picker
              v-model="dateDuration"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <el-button
              :loading="downloadLoading"
              type="primary"
              @click="handleDownload"
              class="float-right mt-3 pl-4 pr-4"
            >
              导出
            </el-button>
          </div>
          <el-button icon="el-icon-document" type="primary" slot="reference"
            >Excel导出</el-button
          >
        </el-popover>
      </div>

      <div class="mt-5">
        <!-- <pre>{{orderList}}</pre> -->
        <el-table
          :data="tableData"
          class="borderRadius"
          highlight-current-row
          border
          :default-sort="{ prop: 'createdAt', order: 'descending' }"
        >
          <el-table-column
            prop="username"
            label="会员名称"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="订单号" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.id.substr(-10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="创建时间"
            align="center"
            width="150"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{
                row.createdAt
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderRealWeight"
            label="计算重量(kg)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderRealWeight }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="incomePrice"
            label="实付金额(元)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.incomePrice }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="costPrice"
            label="成本金额(元)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.costPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="订单状态"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.orderStatus === '已发货'" class="text-danger">{{
                row.orderStatus
              }}</span>
              <span v-else class="text-success">{{ row.orderStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="寄出时间"
            prop="shippingTime"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{
                row.shippingTime
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="寄送时效" align="center" sortable>
            <template slot-scope="{ row }">
              <span v-if="row.status === '已寄出'">{{
                row.shippingTime
                  | moment("timezone", "Asia/Shanghai", "from", "now")
              }}</span>
              <span v-else>{{
                row.shippingTime
                  | moment("timezone", "Asia/Shanghai", "from", "now")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="compensation"
            label="售后赔付"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.compensation }}</span>
            </template>
          </el-table-column>
          
          <el-table-column
            prop="orderProfitRate"
            label="每单利润率"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderProfitRate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderProfit"
            label="利润(或亏损)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderProfit }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="date" label="更新时间" align="center"  sortable>
                        <template slot-scope="{row}">
                            <span>{{ row.date | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss") }}</span>
                        </template>
                    </el-table-column> -->
        </el-table>
        <pagination
          :data="tableData"
          class="mt-5 mb-5 float-right"
          @pagechange="pageChange"
          pager="prev, pager, next, jumper, ->, total, slot"
          limitNumber="20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref, reactive } from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { toPercent } from "../../../utils/function";
export default {
  components: {
    pagination,
  },

  setup(props, { root: { $store, $moment } }) {
    onMounted(() => {
      $store.dispatch("getAllOrderForm", {
        status: "已签收",
        page: "0",
        size: "20",
        status1: "已发货",
      });
    });

    const orderList = computed(() => {
      return $store.state.orderlist;
    });

    const tableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = orderList.value;
      }
      return data.map((object) => {
        let orderSizeWeight = Math.round(
          (object.orderSize_length *
            object.orderSize_width *
            object.orderSize_height) /
            5000
        );
        let compensation = object.compensation ? object.compensation : 0;
        return {
          id: object._id,
          createdAt: object.createdAt,
          date: object.updatedAt,
          username: object.username,
          incomePrice: object.incomePrice,
          costPrice: object.costPrice,
          compensation: object.compensation,
          orderStatus: object.orderStatus,
          orderRealWeight:
            orderSizeWeight > object.orderWeight
              ? orderSizeWeight
              : object.orderWeight,
          shippingTime: object.shippingTime,
          orderProfitRate: toPercent(
            object.incomePrice / (object.costPrice + compensation),
            1
          ),
          orderProfit: object.incomePrice - object.costPrice - compensation,
        };
      });
    });

    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已签收",
        page: 0,
        size: 20,
        status1: "已发货",
      };
      $store
        .dispatch("searchOrders", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAllOrderForm", {
          status: "已签收",
          page: val - 1,
          size: 20,
          status1: "已发货",
        });
      } else {
        $store
          .dispatch("searchOrders", {
            keyword: { searchString: keyWord.value },
            status: "已签收",
            page: val - 1,
            size: 20,
            status1: "已发货",
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    const downloadLoading = ref(false);

    const formatJson = (filterVal, jsonData) => {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "shippingDuration") {
            if (v["shippingTime"]) {
              return $moment(v["shippingTime"])
                .tz("Asia/Shanghai")
                .fromNow();
            } else {
              return "";
            }
          } else if (j == "shippingTime") {
            if (v[j]) {
              return $moment(v[j])
                .tz("Asia/Shanghai")
                .format("YYYY-MM-DD HH:mm:ss");
            } else {
              return "";
            }
          } else if (j == "updatedAt" || j == "createdAt") {
            return $moment(v[j])
              .tz("Asia/Shanghai")
              .format("YYYY-MM-DD HH:mm:ss");
          } else {
            return v[j];
          }
        })
      );
    };

    const orderTurnoverData = computed(() => {
      return $store.state.orderTurnoverData.map((object) => {
        let orderSizeWeight = Math.round(
          (object.orderSize_length *
            object.orderSize_width *
            object.orderSize_height) /
            5000
        );
        let compensation = object.compensation ? object.compensation : 0;
        return {
          id: object._id,
          createdAt: object.createdAt,
          date: object.updatedAt,
          username: object.username,
          incomePrice: object.incomePrice,
          costPrice: object.costPrice,
          compensation: object.compensation,
          orderStatus: object.orderStatus,
          orderRealWeight:
            orderSizeWeight > object.orderWeight
              ? orderSizeWeight
              : object.orderWeight,
          shippingTime: object.shippingTime,
          orderProfitRate: toPercent(
            object.incomePrice / (object.costPrice + compensation),
            1
          ),
          orderProfit: object.incomePrice - object.costPrice - compensation,
        };
      });
    });
    const handleDownload = () => {
      let fromDate = $moment(dateDuration.value[0])
        .subtract(1, "days")
        .format("YYYY-MM-DD 00:00:00");
      let toDate = $moment(dateDuration.value[1])
        .add(1, "days")
        .format("YYYY-MM-DD 00:00:00");

      $store
        .dispatch("getOrderTurnover", {
          fromDate: fromDate,
          toDate: toDate,
        })
        .then(() => {
          downloadLoading.value = true;
          import("@/components/Export2Excel").then((excel) => {
            const tHeader = [
              "会员名称",
              "订单号",
              "创建时间",
              "计算重量(kg)",
              "实付金额(元)",
              "成本金额(元)",
              "订单状态",
              "寄出时间",
              "寄送时效",
              "售后赔付",
              "每单利润率",
              "利润/亏损",
            ];
            const a = [
              "username",
              "id",
              "createdAt",
              "orderRealWeight",
              "incomePrice",
              "costPrice",
              "orderStatus",
              "shippingTime",
              "shippingDuration",
              "compensation",
              "orderProfitRate",
              "orderProfit",
            ];
            const data = formatJson(a, orderTurnoverData.value);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename:
                $moment(fromDate)
                  .add(1, "days")
                  .format("YYYY/MM/DD") +
                "-" +
                $moment(toDate)
                  .subtract(1, "days")
                  .format("MM/DD") +
                "- 订单流水",
              autoWidth: true,
              bookType: "xlsx",
            });
            downloadLoading.value = false;
          });
        });
    };

    const dateDuration = ref("");
    const pickerOptions = reactive({
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          },
        },
      ],
    });

    return {
      keyWord,
      handleQuery,
      pageChange,

      orderList,
      tableData,

      downloadLoading,
      handleDownload,
      pickerOptions,
      dateDuration,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb-outer {
  height: 48px;
  font-size: 15px;
  background-color: #f0f3f4;
  border-radius: 3px;
}
.bottom-margin {
  margin-bottom: 120px;
}
.dialog-notice {
  color: #f56c6c;
  font-weight: 800;
  margin-left: 42px;
}
.input-width {
  width: 80px;
}
</style>
