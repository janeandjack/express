<template>
  <div class="ml-4 mr-3">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">订单详情</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"
            ><i class="fas fa-warehouse" /> 历史订单</span
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
      <div class="mt-5">
        <el-table
          :data="allOrderList"
          class="borderRadius"
          highlight-current-row
          border
        >
          <el-table-column prop="id" label="订单号" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.id.substr(-10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="retailPriceAndTime"
            label="快递信息"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <p>单号: {{ row.shippingNumber }}</p>
              <p>快递：{{ row.orderExpressRetail }}</p>
              <p>价格：{{ row.incomePrice }}</p>
            </template>
          </el-table-column>

          <el-table-column
            prop="orderGoodsList"
            label="包裹详情"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.orderGoodsList" :key="index">
                <p>
                  {{ item.goodName }}
                </p>
                <hr />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="shippingRecevier"
            label="收件人"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.shippingRecevier }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shippingCountry"
            label="运送国家"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.shippingCountry }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="类别"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.orderType === 0">粉末货物</span>
              <span v-if="row.orderType === 1">液体货物</span>
              <span v-if="row.orderType === 2">食品货物</span>
              <span v-if="row.orderType === 3">敏感类</span>
              <span v-if="row.orderType === 4">普通货物</span>
              <span v-if="row.orderType === 5">体积货物</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderTime"
            label="更新时间"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{
                row.orderTime
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="订单状态"
            fixed="right"
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
            prop="orderEvaluate"
            label="服务评分"
            fixed="right"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{ row.orderEvaluate }}
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :data="allOrderList"
          class="mt-5 float-right"
          @pagechange="pageChange"
          pager="prev, pager, next, jumper, ->, total, slot"
          limitNumber="5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/composition-api";
import pagination from "../components/InfoPagination";
export default {
  components: {
    pagination,
  },
  setup(props, { root: { $store } }) {
    onMounted(() => {
      $store.dispatch("getOrderForm", {
        status: "已签收",
        page: "0",
        size: "5",
        status1: "已发货",
      });
    });

    //data for display
    const List = computed(() => {
      return $store.state.selforderlist;
    });
    const keyWord = ref("");
    const returnData = ref([]);
    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已签收",
        page: "0",
        size: "5",
        status1: "已发货",
      };
      $store
        .dispatch("searchOrdersForUser", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };
    const allOrderList = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = List.value;
      }
      return data.map((object) => {
        return {
          id: object._id,
          orderExpressRetail: object.orderExpressRetail,
          incomePrice: object.incomePrice,
          orderGoodsList: object.orderGoodsList,
          shippingRecevier: object.shippingRecevier,
          shippingCountry: object.shippingCountry,
          orderType: object.orderType,
          orderStatus: object.orderStatus,
          orderTime: object.updatedAt,
          orderEvaluate: object.orderEvaluate,
          shippingNumber: object.orderShippingNumber,
        };
      });
    });

    //pagination page change
    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getOrderForm", {
          status: "已发货",
          page: val - 1,
          size: 5,
          status1: "已签收",
        });
      } else {
        $store
          .dispatch("searchOrdersForUser", {
            keyword: { searchString: keyWord.value },
            status: "已发货",
            page: val - 1,
            size: 5,
            status1: "已签收",
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    return {
      keyWord,
      handleQuery,
      allOrderList,

      pageChange,
      List
    };
  },
};
</script>

<style lang="scss">
.el-breadcrumb-outer {
  height: 48px;
  font-size: 15px;
  background-color: #f0f3f4;
  border-radius: 3px;
}
.bottom-margin {
  margin-bottom: 120px;
}
</style>
