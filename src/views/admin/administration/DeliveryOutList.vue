<template>
  <div class="mt-5">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">所有订单</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"
            ><i class="fas fa-plane-departure" /> 已发货</span
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
          :data="tableData"
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
            prop="username"
            label="会员名称"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.username }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="orderExpressRetail"
            label="快递信息"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderExpressRetail }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderShippingNumber"
            label="快递号码"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderShippingNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="packageLocation"
            label="订单货仓位置"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.packageLocation }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderDetail"
            label="订单详情"
            align="center"
            width="160"
          >
            <template slot-scope="{ row }">
              <div v-for="(orderGoods, index) in row.orderDetail" :key="index" class="border-bottom">
                <div>货物名称:{{ orderGoods.goodName }}</div>
                <div>货物数量:{{ orderGoods.goodNumber }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="订单类型"
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
              <span v-if="row.orderType === 6">仿牌</span>
              <span v-if="row.orderType === 7">木制品</span>
              <span v-if="row.orderType === 8">电池</span>
              <span v-if="row.orderType === 9">内置电</span>
              <span v-if="row.orderType === 10">违禁品</span>
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
          <el-table-column label="寄送地址" width="150" align="center">
            <template slot-scope="{ row }">
              <div>地址: {{ row.shippingAddress }}</div>
              <div>城市: {{ row.shippingCity }}</div>
              <div>省份: {{ row.shippingProvince }}</div>
              <div>邮编: {{ row.shippingPostcode }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="shippingContact"
            label="联系方式"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.shippingContact }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shippingTime"
            label="寄送时间"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{
                row.shippingTime
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="订单状态"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-success">{{ row.orderStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="expressOperator"
            label="录入人员"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.expressOperator" class="text-danger">{{
                row.expressOperator
              }}</span>
              <span v-else class="text-info">无录入人员</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="expressUpdateOperator"
            label="更新人员"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.expressUpdateOperator" class="text-danger">{{
                row.expressUpdateOperator
              }}</span>
              <span v-else class="text-info">无更新人员</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="130" align="center">
            <template slot-scope="{ row }">
              <el-button type="primary" @click="updateExpressInfo(row)"
                >修改快递信息</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :data="tableData"
          class="mt-5 mb-5 float-right"
          @pagechange="pageChange"
          pager="prev, pager, next, jumper, ->, total, slot"
          limitNumber="5"
        />

        <el-dialog
          title="温馨提示"
          :visible.sync="editDialogVisible"
          width="400px"
          center
          v-loading="loading"
        >
          <el-form
            :model="handleOrderForm"
            label-position="left"
            label-width="120px"
          >
            <el-form-item label="*快递查询号码:">
              <el-input
                v-model="handleOrderForm.orderShippingNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="*成本费用:">
              <el-input
                v-model="handleOrderForm.costPrice"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button
              v-if="
                handleOrderForm.orderShippingNumber != '' &&
                  handleOrderForm.costPrice != ''
              "
              type="primary"
              @click="submitOrderEdition"
              >确定</el-button
            >
            <el-button v-else type="primary" disabled="">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  computed,
  ref,
  reactive,
  inject,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
export default {
  components: {
    pagination,
  },

  setup(props, { root: { $store, $message } }) {
    //inject reload() to refresh component
    const toReload = inject("reload");
    const loading = ref(false);

    onMounted(() => {
      $store.dispatch("getAllOrderForm", {
        status: "已发货",
        page: "0",
        size: "5",
      });
    });

    const editDialogVisible = ref(false);
    const handleOrderForm = reactive({
      orderId: "",
      orderShippingNumber: "",
      costPrice: "",
    });

    const updateExpressInfo = (row) => {
      editDialogVisible.value = true;
      handleOrderForm.orderId = row.id;
      handleOrderForm.orderShippingNumber = row.orderShippingNumber;
      handleOrderForm.costPrice = row.costPrice;
    };

    const goodList = computed(() => {
      return $store.state.orderlist;
    });

    const tableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = goodList.value;
      }
      return data.map((object, i) => {
        return {
          ordernumber: i + 1,
          id: object._id,
          username: object.username,
          shippingCountry: object.shippingCountry,
          shippingAddress: object.shippingAddress,
          shippingCity: object.shippingCity,
          shippingProvince: object.shippingProvince,
          shippingPostcode: object.shippingPostcode,
          shippingContact: `${object.shippingRecevier}, ${object.shippingPhone}`,
          orderExpressRetail: object.orderExpressRetail,
          orderStatus: object.orderStatus,
          packageLocation: object.packageLocation,
          orderType: object.orderType,
          orderShippingNumber: object.orderShippingNumber,
          updatedAt: object.updatedAt,
          costPrice: object.costPrice,
          expressOperator: object.expressOperator,
          expressUpdateOperator: object.expressUpdateOperator,
          shippingTime: object.shippingTime,
          orderDetail: object.orderGoodsList,
        };
      });
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
        .dispatch("searchOrders", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };

    const expressOptions = reactive([
      {
        label: "DHL",
        value: "DHL",
      },
      {
        label: "UPS",
        value: "UPS",
      },
      {
        label: "FedEx",
        value: "FedEx",
      },
      {
        label: "TNT",
        value: "TNT",
      },
      {
        label: "EMS",
        value: "EMS",
      },
      {
        label: "Special",
        value: "Special",
      },
    ]);

    const submitOrderEdition = () => {
      let data = {
        _id: handleOrderForm.orderId,
        data: {
          orderShippingNumber: handleOrderForm.orderShippingNumber,
          costPrice: handleOrderForm.costPrice,
          expressUpdateOperator: $store.state.userSelf.username,
        },
      };
      editDialogVisible.value = false;
      loading.value = true;

      $store
        .dispatch("orderDelivering", data)
        .then(() => {
          $message.success("快递信息更新成功！");
          loading.value = false;
          toReload();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAllOrderForm", {
          status: "已发货",
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchOrders", {
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

    return {
      loading,
      keyWord,
      handleQuery,
      pageChange,

      goodList,
      editDialogVisible,
      tableData,

      handleOrderForm,

      expressOptions,
      submitOrderEdition,
      updateExpressInfo,
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
