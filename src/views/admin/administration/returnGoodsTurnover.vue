<template>
  <div>
    <div>
      <div
        class="border pt-2 pb-2 pl-3"
        style="font-size:18px;background-color:#F0F3F4;border-radius:3px;"
      >
        <span class="mb-3">退货流水</span>
        <!-- <div class="float-right mr-3">
          <el-input
            v-model="keyWord"
            type="text"
            placeholder="搜索"
            class="filter-item searchInputWidth"
            prefix-icon="el-icon-search"
            @input="handleQuery"
            clearable
          />
        </div> -->
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
        <el-table
          :data="tableData"
          class="borderRadius"
          highlight-current-row
          border
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
          <el-table-column prop="_id" label="货物号" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row._id.substr(-10) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="_id" label="货物名称" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.goodName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="updatedAt"
            label="创建时间"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{
                row.updatedAt
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodStatus"
            label="货物状态"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-danger">{{ row.goodStatus }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="returnPayMethod"
            label="退货付款方法"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.returnPayMethod === '0'">到付</span>
              <span v-else>自付</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="returnShippingPrice"
            label="退货快递价格"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.returnShippingPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="returnShippingCostPrice"
            label="退货成本价格"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.returnShippingCostPrice }}</span>
            </template>
          </el-table-column> 
          <el-table-column
            prop="returnBackPrice"
            align="center"
            sortable
          >
          <template slot="header">
             <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              content="退回用户金额：是指返退给用户已付款的金额">
              <span slot="reference"> 退回用户金额 </span>
            </el-popover>
          </template>
            <template slot-scope="{ row }">
              <span>{{ row.returnBackPrice }}</span>
            </template>
          </el-table-column>
           <!-- <el-table-column
            align="center"
            sortable
          >
           <template slot="header">
             <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              content="退货流水总金额：$退回用户金额 + $退货成本金额 - $退货快递金额">
              <span slot="reference"> 退货流水总金额 </span>
            </el-popover>
          </template>
            <template slot-scope="{ row }">
              <span>{{ row.returnTotalPrice }}</span>
            </template>
          </el-table-column>  -->
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
//import {toPercent} from '../../../utils/function';
export default {
  components: {
    pagination,
  },

  setup(props, { root: { $store, $moment } }) {
    onMounted(() => {
      $store.dispatch("getPayedReturnGoods", {
        page: "0",
        size: "20",
      });
    });

    const PayedReturnGoods = computed(() => {
      return $store.state.PayedReturnGoods;
    });

    const tableData = computed(() => {
      let data = [];
      // if (keyWord.value != "") {
      //   data = returnData.value;
      // } else {
      data = PayedReturnGoods.value;
      console.log(data);
      //}
      return data.map((dataItem)=>{
        return{
          username: dataItem.username,
          _id: dataItem._id,
          goodName: dataItem.goodName,
          updatedAt: dataItem.updatedAt,
          goodStatus: dataItem.goodStatus,
          returnPayMethod: dataItem.returnPayMethod,
          returnBackPrice: dataItem.returnBackPrice,
          returnShippingPrice: dataItem.returnShippingPrice,
          returnShippingCostPrice: dataItem.returnShippingCostPrice,
          returnTotalPrice: dataItem.returnBackPrice + dataItem.returnShippingCostPrice - dataItem.returnShippingPrice,
        }
        
      });
    });

    // const keyWord = ref("");

    //const returnData = ref([]);

    // const handleQuery = () => {
    //   let data = {
    //     keyword: { searchString: keyWord.value },
    //     status: "已签收",
    //     page: 0,
    //     size: 20,
    //     status1: "已发货",
    //   };
    //   $store
    //     .dispatch("searchOrders", data)
    //     .then((res) => {
    //       returnData.value = res.data;
    //     })
    //     .catch(() => {});
    // };

    const pageChange = (val) => {
      // if (keyWord.value === "") {
      $store.dispatch("getPayedReturnGoods", {
        page: val - 1,
        size: "20",
      });
      // } else {
      //   $store
      //     .dispatch("searchOrders", {
      //       keyword: { searchString: keyWord.value },
      //       status: "已签收",
      //       page: val - 1,
      //       size: 20,
      //       status1: "已发货",
      //     })
      //     .then((res) => {
      //       returnData.value = res.data;
      //     })
      //     .catch(() => {});
      // }
    };

    const formatJson = (filterVal, jsonData) => {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "returnPayMethod") {
            if (v[j] === "0") {
              return "到付";
            } else {
              return "自付";
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

    const downloadLoading = ref(false);
    const returnGoodsTurnoverData = computed(() => {
      return $store.state.returnGoodsTurnoverData;
    });
    const handleDownload = () => {
      let fromDate = $moment(dateDuration.value[0])
        .subtract(1, "days")
        .format("YYYY-MM-DD 00:00:00");
      let toDate = $moment(dateDuration.value[1])
        .add(1, "days")
        .format("YYYY-MM-DD 00:00:00");

      $store
        .dispatch("getReturnGoodsTurnover", {
          fromDate: fromDate,
          toDate: toDate,
        })
        .then(() => {
          downloadLoading.value = true;
          import("@/components/Export2Excel").then((excel) => {
            const tHeader = [
              "会员名称",
              "货物号",
              "货物名称",
              "创建时间",
              "货物状态",
              "退货付款方法",
              "退货快递价格",
              "退货成本价格",
              "退回用户金额",
              // "退货流水总金额"
            ];
            const a = [
              "username",
              "_id",
              "goodName",
              "createdAt",
              "goodStatus",
              "returnPayMethod",
              "returnShippingPrice",
              "returnShippingCostPrice",
              "returnBackPrice",
              // "returnTotalPrice"
            ];
            const data = formatJson(a, returnGoodsTurnoverData.value);
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
                "- 退货流水",
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
      //keyWord,
      //handleQuery,
      pageChange,

      //orderList,
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
