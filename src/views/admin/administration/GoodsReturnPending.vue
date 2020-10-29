<template>
  <div class="mt-5">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="border el-breadcrumb-outer"
    >
      <el-breadcrumb-item class="mt-3 ml-3">所有商品</el-breadcrumb-item>
      <el-breadcrumb-item class="mt-3"
        ><span style="color:#f39c12;"
          ><i class="fas fa-shipping-fast" /> 退货中</span
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
    <el-table
      :data="allReturnGoods"
      class="borderRadius mt-5"
      border
      :default-sort="{ prop: 'user_id', order: 'ascending' }"
    >
      <el-table-column prop="_id" label="货物号" align="center" sortable>
        <template slot-scope="{ row }">
          {{ row._id.substr(-10) }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="会员名称" align="center" sortable>
      </el-table-column>
      <el-table-column prop="goodName" label="货品名称" align="center" sortable>
      </el-table-column>

      <el-table-column label="退货地址" width="150">
        <template slot-scope="{ row }">
          <div>地址: {{ row.returnShippingAddress }}</div>
          <div>城市: {{ row.returnShippingCity }}</div>
          <div>省份: {{ row.returnShippingProvince }}</div>
          <div>国家: {{ row.returnShippingCountry }}</div>
          <div>邮编: {{ row.returnShippingPostcode }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="returnShippingRecevier"
        label="联系人"
        align="center"
        sortable
      >
        <template slot-scope="{ row }">
          {{ row.returnShippingRecevier }}
        </template>
      </el-table-column>
      <el-table-column
        prop="returnShippingPhone"
        label="联系电话"
        align="center"
        sortable
      >
        <template slot-scope="{ row }">
          {{ row.returnShippingPhone }}
        </template>
      </el-table-column>
      <el-table-column
        prop="returnShippingPhone"
        label="快递备注"
        align="center"
        sortable
      >
        <template slot-scope="{ row }">
          <div v-if="row.returnShippingNotes">
            {{ row.returnShippingNotes }}
          </div>
          <div v-else><el-tag>无快递备注</el-tag></div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" sortable>
        <template slot-scope="{ row }">
          {{
            row.updatedAt
              | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="goodStatus"
        label="货物状态"
        align="center"
        sortable
      >
        <template slot-scope="{ row }">
          <span v-if="row.goodStatus === '退货中'" class="text-danger">{{
            row.goodStatus
          }}</span>
          <span v-else class="text-success">{{ row.goodStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="goodReturnOperator"
        label="操作人员"
        align="center"
        sortable
      >
        <template slot-scope="{ row }">
          <span v-if="row.goodReturnOperator" class="text-danger">{{
            row.goodReturnOperator
          }}</span>
          <span v-else class="text-info">无操作人员</span>
        </template>
      </el-table-column>
      <el-table-column label="操作/状态" align="center" width="160" fixed="right">
        <template slot-scope="{ row }">
          <div class="mt-2">
            <span
              v-if="row.goodStatus === '退货中' && row.returnPayMethod == 0"
            >
              <el-button type="primary" @click="handleUpdate(row)">
                直接退货
              </el-button>
              <p class="mt-2">
                退货付款方式: <span class="text-success">到付</span>
              </p>
            </span>
            <div
              v-else-if="
                row.goodStatus === '退货中' && row.returnPayMethod == 1
              "
            >
              <span>
                <el-button
                  v-if="!row.IsPayed && !row.returnShippingPrice"
                  type="primary"
                  @click="handleUpdate(row)"
                >
                  填写价格(未付款)
                </el-button>
                <span
                  class="text-success"
                  v-else-if="!row.IsPayed && row.returnShippingPrice"
                >
                  <p>等待用户付款中</p>
                  <el-button type="warning" @click="updateShippingPrice(row)"
                    >修改快递价格</el-button
                  >
                </span>
                <el-button v-else type="primary" @click="handleUpdate(row)">
                  填写快递(已付款)
                </el-button>
              </span>
              <p class="mt-2">
                退货付款方式: <span class="text-success">自付</span>
              </p>
              <p v-if="row.returnShippingPrice" class="mt-2">
                退货快递价格:
                <span class="text-danger">{{ row.returnShippingPrice }}</span>
              </p>
            </div>
            <div v-else-if="row.goodStatus === '已退货'">
              <p class="mt-2">
                快递公司:
                <span class="text-success">{{ row.returnExpressCompany }}</span>
              </p>
              <p class="mt-2">
                快递号码:
                <span class="text-success">{{ row.returnExpressNumber }}</span>
              </p>
              <p v-if="row.returnPayMethod == 0" class="mt-2">
                退货付款方式: <span class="text-success">到付</span>
              </p>
              <p v-if="row.returnPayMethod == 1">
                退货付款方式: <span class="text-success">自付</span>
              </p>
              <el-button type="warning" @click="updateExpressInfo(row)"
                >修改快递信息</el-button
              >
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :data="allReturnGoods"
      class="mt-5 mb-5 float-right"
      @pagechange="pageChange"
      pager="prev, pager, next, jumper, ->, total, slot"
      limitNumber="5"
    />
    <el-dialog
      title="货物入库信息"
      :visible.sync="switchEditSign"
      center
      width="420px"
      v-loading="loading"
    >
      <el-form
        :model="adminHandleForm"
        label-position="left"
        label-width="120px"
      >
        <el-form-item v-if="priceFormSign === true" label="*退货快递价格:">
          <el-input
            v-model="adminHandleForm.returnShippingPrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="priceFormSign === true" label="*退货成本价格:">
          <el-input
            v-model="adminHandleForm.returnShippingCostPrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        
        <el-form-item
          v-if="completeFormSign === true || expressFormSign === true"
          label="*快递公司:"
        >
          <el-select
            v-model="adminHandleForm.returnExpressCompany"
            placeholder="请选择快递公司"
            autocomplete="off"
          >
            <el-option
              v-for="(item, index) in expressoptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="completeFormSign === true || expressFormSign === true"
          label="*快递单号:"
        >
          <el-input
            v-model="adminHandleForm.returnExpressNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            switchEditSign = false;
            completeFormSign = false;
            priceFormSign = false;
            expressFormSign = false;
          "
          >取消</el-button
        >
        <el-button type="primary" @click="submitExpressInfo">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  computed,
  reactive,
  inject,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
export default {
  name: "stockpendinglist",
  components: {
    pagination,
  },

  setup(props, { root: { $store, $message } }) {
    const goodName = ref("");
    const switchEditSign = ref(false);

    const toReload = inject("reload");
    const loading = ref(false);

    onMounted(() => {
      $store.dispatch("getAllGoods", {
        status: "退货中",
        page: "0",
        size: "5",
      });
    });

    const adminHandleForm = reactive({
      returnedGoods: [],
      returnShippingPrice: "",
      returnShippingCostPrice: "",
      returnExpressCompany: "",
      returnExpressNumber: "",
      goodReturnOperator: $store.state.userSelf.username,
    });

    const expressoptions = reactive([
      {
        value: "中国邮政",
        label: "中国邮政",
      },
      {
        value: "顺丰速运",
        label: "顺丰速运",
      },
      {
        value: "圆通快递",
        label: "圆通快递",
      },
      {
        value: "申通快递",
        label: "申通快递",
      },
      {
        value: "韵达快递",
        label: "韵达快递",
      },
      {
        value: "汇通快递",
        label: "汇通快递",
      },
      {
        value: "中通快递",
        label: "中通快递",
      },
      {
        value: "宅急送",
        label: "宅急送",
      },
      {
        value: "天天快递",
        label: "天天快递",
      },
      {
        value: "其他：",
        label: "其他",
      },
    ]);

    const completeFormSign = ref(false);
    const priceFormSign = ref(false);
    const expressFormSign = ref(false);

    const handleUpdate = (row) => {
      if (row.returnPayMethod == 0) {
        expressFormSign.value = true;
      } else if (row.returnPayMethod == 1 && !row.IsPayed) {
        priceFormSign.value = true;
      } else {
        expressFormSign.value = true;
      }
      switchEditSign.value = true;
      adminHandleForm.returnShippingPrice = row.returnShippingPrice;
      adminHandleForm.returnShippingCostPrice = row.returnShippingCostPrice;
      adminHandleForm.returnExpressCompany= row.returnExpressCompany;
      adminHandleForm.returnExpressNumber= row.returnExpressNumber;
      adminHandleForm.returnedGoods.push(row._id);
    };

    const updateShippingPrice = (row) => {
      priceFormSign.value = true;
      switchEditSign.value = true;
      adminHandleForm.returnedGoods.push(row._id);
      adminHandleForm.returnShippingPrice = row.returnShippingPrice;
    };

    const updateExpressInfo = (row) => {
      expressFormSign.value = true;
      switchEditSign.value = true;
      adminHandleForm.returnedGoods.push(row._id);
      adminHandleForm.returnExpressCompany = row.returnExpressCompany;
      adminHandleForm.returnExpressNumber = row.returnExpressNumber;
    };

    const submitExpressInfo = () => {
      if (
        completeFormSign.value === false &&
        priceFormSign.value === true &&
        expressFormSign.value === false
      ) {
        if (adminHandleForm.returnShippingPrice === "") {
          $message.error("请填写退货快递价格");
        }
        else if (adminHandleForm.returnShippingCostPrice === "") {
          $message.error("请填写退货成本价格");
        } else {
          switchEditSign.value = false;
          completeFormSign.value = false;
          priceFormSign.value = false;
          expressFormSign.value = false;
          loading.value = true;
          $store
            .dispatch("submitReturnGoodsInfo", adminHandleForm)
            .then(() => {
              $message.success("退货信息更新成功！");
              loading.value = false;
              toReload();
            })
            .catch(() => {
              loading.value = false;
            });
        }
      } else if (
        completeFormSign.value === false &&
        priceFormSign.value === false &&
        expressFormSign.value === true
      ) {
        if (
          adminHandleForm.returnExpressCompany === "" ||
          adminHandleForm.returnExpressNumber === ""
        ) {
          $message.error("请填写退货快递信息");
        } else {
          switchEditSign.value = false;
          completeFormSign.value = false;
          priceFormSign.value = false;
          expressFormSign.value = false;
          loading.value = true;
          $store
            .dispatch("submitReturnGoods", adminHandleForm)
            .then(() => {
              $message.success("退货信息更新成功！");
              loading.value = false;
              toReload();
            })
            .catch(() => {
              loading.value = false;
            });
        }
      } else if (
        completeFormSign.value === true &&
        priceFormSign.value === false &&
        expressFormSign.value === false
      ) {
        if (
          adminHandleForm.returnShippingPrice === "" ||
          adminHandleForm.returnExpressCompany === "" ||
          adminHandleForm.returnExpressNumber === ""
        ) {
          $message.error("请填写退货快递信息");
        } else {
          switchEditSign.value = false;
          completeFormSign.value = false;
          priceFormSign.value = false;
          expressFormSign.value = false;
          loading.value = true;
          $store
            .dispatch("submitReturnGoods", adminHandleForm)
            .then(() => {
              $message.success("退货信息更新成功！");
              loading.value = false;
              toReload();
            })
            .catch(() => {
              loading.value = false;
            });
        }
      }
    };

    const allGoods = computed(() => {
      return $store.state.allGoods;
    });

    const allReturnGoods = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = allGoods.value;
      }
      return data;
    });
    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "退货中",
        page: "0",
        size: "5",
      };
      $store
        .dispatch("searchGoods", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAllGoods", {
          status: "退货中",
          page: val - 1,
          size: "5",
        });
      } else {
        $store
          .dispatch("searchGoods", {
            keyword: { searchString: keyWord.value },
            status: "退货中",
            page: val - 1,
            size: "5",
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

      goodName,
      switchEditSign,
      adminHandleForm,
      handleUpdate,
      expressoptions,

      completeFormSign,
      priceFormSign,
      expressFormSign,
      updateShippingPrice,
      updateExpressInfo,

      allReturnGoods,

      submitExpressInfo,
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
