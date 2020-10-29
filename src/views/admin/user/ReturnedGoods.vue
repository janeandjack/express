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
            ><i class="fas fa-window-close" /> 申退货</span
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
        <!-- <pre>{{ goodList }}</pre> -->
        <el-table
          :data="tableData"
          class="borderRadius"
          highlight-current-row
          border
        >
          <el-table-column prop="id" label="货物号" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.id.substr(-10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodname"
            label="货物名称"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.goodname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="localExpressNumber"
            label="国内快递单号"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.localExpressNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="picture"
            label="包裹图片"
            align="center"
            width="150"
            sortable
          >
            <template slot-scope="{ row }">
              <el-image
                :src="imageDomain + row.picture"
                fit="fill"
                :preview-src-list="[imageDomain + row.picture]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="warehousenumber"
            label="库位号"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.warehousenumber }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="weight"
            label="重量(kg)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.weight }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="length"
            label="尺寸(cm)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <p v-if="row.length">长度：{{ row.length }}</p>
              <p v-if="row.width">宽度：{{ row.width }}</p>
              <p v-if="row.height">高度：{{ row.height }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类别" align="center" sortable>
            <template slot-scope="{ row }">
              <span v-if="row.type === 0">粉末货物</span>
              <span v-if="row.type === 1">液体货物</span>
              <span v-if="row.type === 2">食品货物</span>
              <span v-if="row.type === 3">敏感类</span>
              <span v-if="row.type === 4">普通货物</span>
              <span v-if="row.type === 5">体积货物</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="storageTime"
            label="入库时间"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{
                row.storageTime
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="退货地址" width="150" sortable>
            <template slot-scope="{ row }">
              <div>国家: {{ row.returnShippingCountry }}</div>
              <div>省份: {{ row.returnShippingProvince }}</div>
              <div>城市: {{ row.returnShippingCity }}</div>
              <div>地址: {{ row.returnShippingAddress }}</div>
              <div>邮编: {{ row.returnShippingPostcode }}</div>
              <div>联系人: {{ row.returnShippingRecevier }}</div>
              <div>联系电话: {{ row.returnShippingPhone }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            label="更新时间"
            align="center"
            sortable
          >
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
              <span v-if="row.goodStatus === '已退货'">
                <p class="text-success">{{ row.goodStatus }}</p>
                <p v-if="row.returnPayMethod == 0">付款方式:到付</p>
                <p v-if="row.returnPayMethod == 1">付款方式:自付</p>
              </span>
              <span v-else class="text-success">
                <p class="text-danger">{{ row.goodStatus }}</p>
                <p v-if="row.returnPayMethod == 0">付款方式:到付</p>
                <p v-if="row.returnPayMethod == 1">付款方式:自付</p>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="{ row }">
              <span
                v-if="
                  row.goodStatus === '退货中' &&
                    row.IsPayed &&
                    row.returnPayMethod === '1' &&
                    row.returnExpressNumber === ''
                "
                class="text-success"
                >已付款等待寄出</span
              >
              <span
                v-if="
                  row.goodStatus === '退货中' &&
                    row.IsPayed !== true &&
                    row.returnPayMethod == '1' &&
                    row.returnExpressNumber == ''
                    &&row.returnShippingPrice
                "
              >
                <el-button type="primary" @click="handleReturnPay(row)"
                  >快递付费</el-button
                >
                <p>
                  快递费用:
                  <span class="text-danger">{{ row.returnShippingPrice }}</span
                  >元
                </p>
              </span>
              <span v-if="row.goodStatus === '已退货'">
                <p>退货快递:{{ row.returnExpressCompany }}</p>
                <p>退货单号:{{ row.returnExpressNumber }}</p>
              </span>

              <span
                v-if="row.goodStatus === '退货中' && row.returnPayMethod == 0"
                class="text-success"
              >
                <p>等待寄件中</p>
                <el-button type="primary" @click="switchToEditReturnInfo(row)"
                  >修改收货信息</el-button
                >
              </span>
              <span
                v-if="
                  row.goodStatus === '退货中' &&
                    !row.IsPayed &&
                    row.returnPayMethod === '1' &&
                    !row.returnShippingPrice
                "
                class="text-warning"
              >
                <p>等待客服寻找最实惠的快递</p>
                <el-button type="primary" @click="switchToEditReturnInfo(row)"
                  >修改收货信息</el-button
                >
              </span>
              <div v-if="row.goodStatus === '退货中'" class="mt-2">
                <el-button type="warning" @click="cancelReturnGoods(row)"
                  >取消退货</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          title="支付退货快递费用"
          :visible.sync="payExpressFeeSign"
          width="400px"
          center
        >
          <p class="text-center mt-3">
            账户余额为<span class="text-info ml-1 mr-1">{{
              userAccountBalance
            }}</span
            >元
          </p>
          <p class="text-center mt-3">
            快递费用为<span class="text-info ml-1 mr-1">{{
              returnExpressFee
            }}</span
            >元
          </p>
          <p class="text-center" v-if="userAccountBalance < returnExpressFee">
            <el-link icon="el-icon-s-opportunity" @click="switchToUserInfo"
              >余额不足, 请充值</el-link
            >
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="payExpressFeeSign = false">取消</el-button>
            <el-button
              v-if="userAccountBalance < returnExpressFee"
              type="primary"
              disabled
              >确定</el-button
            >
            <el-button v-else type="primary" @click="submitReturnFees"
              >确定</el-button
            >
          </span>
        </el-dialog>
        <el-dialog
          title="温馨提示"
          :visible.sync="updateReturnDialogVisible"
          width="400px"
          center
        >
          <p class="dialog-notice">
            <i class="fas fa-exclamation-circle"></i>
            所有选择的商品将寄往同一地址
          </p>

          <div class="mt-4" v-loading="loading">
            <el-form
              :model="returnAddressForm"
              label-position="left"
              label-width="100px"
            >
              <el-form-item label="*付款方式:">
                <el-select v-model="returnAddressForm.returnPayMethod">
                  <el-option value="0" label="到付">到付</el-option>
                  <el-option value="1" label="自付">自付</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="*退货国家:">
                <el-input
                  v-model="returnAddressForm.returnShippingCountry"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*退货省份:">
                <el-input
                  v-model="returnAddressForm.returnShippingProvince"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*退货城市:">
                <el-input
                  v-model="returnAddressForm.returnShippingCity"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*具体地址:">
                <el-input
                  v-model="returnAddressForm.returnShippingAddress"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*地址邮编:">
                <el-input
                  v-model="returnAddressForm.returnShippingPostcode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*收件人:">
                <el-input
                  v-model="returnAddressForm.returnShippingRecevier"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*联系电话:">
                <el-input
                  v-model="returnAddressForm.returnShippingPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="updateReturnDialogVisible = false"
                  >取消</el-button
                >
                <el-button
                  @click="updateReturnAddress"
                  v-if="
                    returnAddressForm.returnShippingCountry != '' &&
                      returnAddressForm.returnShippingProvince != '' &&
                      returnAddressForm.returnShippingCity != '' &&
                      returnAddressForm.returnShippingAddress != '' &&
                      returnAddressForm.returnShippingPostcode != '' &&
                      returnAddressForm.returnShippingRecevier != '' &&
                      returnAddressForm.returnShippingPhone != ''
                  "
                  type="primary"
                  >确认</el-button
                >
                <el-button v-else type="primary" disabled="">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
      <pagination
        :data="tableData"
        class="mt-5 mb-5 float-right"
        @pagechange="pageChange"
        pager="prev, pager, next, jumper, ->, total, slot"
        limitNumber="5"
      />
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  computed,
  ref,
  inject,
  reactive,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: {
    pagination,
  },

  setup(props, { root: { $store, $router, $message, $confirm } }) {
    const loading = ref(false);
    const toReload = inject("reload");

    onMounted(() => {
      $store.dispatch("goodGet", {
        status: "退货中",
        page: "0",
        size: "5",
        status1: "已退货",
      });
    });


    const goodList = computed(() => {
      return $store.state.goodlist;
    });
    const keyWord = ref("");
    const returnData = ref([]);
    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "退货中",
        page: "0",
        size: "5",
        status1: "已退货",
      };
      $store
        .dispatch("searchGoodsForUser", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };
    const tableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = goodList.value;
      }
      return data.map((object, i) => {
        return {
          id: object._id,
          ordernumber: i + 1,
          localExpressNumber: object.localExpressNumber,
          goodname: object.goodName,
          picture: object.goodImg,
          warehousenumber: object.packageLocation,
          weight: object.goodWeight,
          length: object.goodSize_length,
          width: object.goodSize_width,
          height: object.goodSize_height,
          type: object.goodType,
          operation: "0",
          note: object.note,
          isStorage: object.isStorage,
          storageTime: object.storageTime,
          goodStatus: object.goodStatus,
          returnExpressNumber: object.returnExpressNumber,
          returnExpressCompany: object.returnExpressCompany,
          returnPayMethod: object.returnPayMethod,
          returnShippingPrice: object.returnShippingPrice,
          IsPayed: object.IsPayed,
          updatedAt: object.updatedAt,
          returnShippingRecevier: object.returnShippingRecevier,
          returnShippingPhone: object.returnShippingPhone,
          returnShippingAddress: object.returnShippingAddress,
          returnShippingCity: object.returnShippingCity,
          returnShippingProvince: object.returnShippingProvince,
          returnShippingCountry: object.returnShippingCountry,
          returnShippingPostcode: object.returnShippingPostcode,
        };
      });
    });
    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("goodGet", {
          status: "退货中",
          page: val - 1,
          size: "5",
          status1: "已退货",
        });
      } else {
        $store
          .dispatch("searchGoodsForUser", {
            keyword: { searchString: keyWord.value },
            status: "退货中",
            page: val - 1,
            size: "5",
            status1: "已退货",
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    //update return address
    const updateReturnDialogVisible = ref(false);
    const returnAddressForm = reactive({
      returnedGoods: [],
      returnPayMethod: "0",
      returnShippingCountry: "",
      returnShippingProvince: "",
      returnShippingCity: "",
      returnShippingAddress: "",
      returnShippingPostcode: "",
      returnShippingPhone: "",
      returnShippingRecevier: "",
    });
    const switchToEditReturnInfo = (row) => {
      updateReturnDialogVisible.value = true;
      returnAddressForm.returnedGoods = [row.id];
      returnAddressForm.returnPayMethod = row.returnPayMethod;
      returnAddressForm.returnShippingCountry = row.returnShippingCountry;
      returnAddressForm.returnShippingProvince = row.returnShippingProvince;
      returnAddressForm.returnShippingCity = row.returnShippingCity;
      returnAddressForm.returnShippingAddress = row.returnShippingAddress;
      returnAddressForm.returnShippingPostcode = row.returnShippingPostcode;
      returnAddressForm.returnShippingPhone = row.returnShippingPhone;
      returnAddressForm.returnShippingRecevier = row.returnShippingRecevier;
    };
    const updateReturnAddress = () => {
      if (
        returnAddressForm.returnShippingCountry === "" ||
        returnAddressForm.returnShippingProvince === "" ||
        returnAddressForm.returnShippingCity === "" ||
        returnAddressForm.returnShippingAddress === "" ||
        returnAddressForm.returnShippingPostcode === "" ||
        returnAddressForm.returnShippingPhone === "" ||
        returnAddressForm.returnShippingRecevier === ""
      ) {
        $message.error("请填写完整地址信息");
      } else {
        loading.value = true;
        $store
          .dispatch("returnGoods", returnAddressForm)
          .then(() => {
            $message.success("已修改完成!");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    //pay for return express fees
    const payExpressFeeSign = ref(false);
    const returnGoodsList = ref([]);
    const returnExpressFee = ref(0);
    const handleReturnPay = (row) => {
      payExpressFeeSign.value = true;
      returnGoodsList.value.push(row.id);
      returnExpressFee.value = row.returnShippingPrice;
    };
    const submitReturnFees = () => {
      let data = {
        returnedGoods: returnGoodsList.value,
        IsPayed: 1,
      };
      let paydata = {
        payBalance: returnExpressFee.value,
      };
      $store
        .dispatch("payFromAccount", paydata)
        .then(() => {
          $message.success("付款成功！");
          $store
            .dispatch("submitReturnGoodsInfo", data)
            .then(() => {
              $message.success("退货成功！");
              toReload();
            })
            .catch(() => {});
        })
        .catch(() => {});
    };
    const userAccountBalance = computed(() => {
      return $store.state.userSelf.balance;
    });
    const switchToUserInfo = () => {
      $router.push("/dashboard/useraccountinfo");
      toReload();
    };

    //cancel return goods
    const cancelReturnGoods = (row) => {
      $confirm("确定取消退货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: row.id,
          };
          $store
            .dispatch("cancelReturnGoods", data)
            .then(() => {
              $message.success("货物取消退货成功！");
              toReload();
            })
            .catch(() => {
              $message.error("取消退货失败");
            });
        })
        .catch(() => {});
    };

    return {
      loading,
      keyWord,
      handleQuery,
      goodList,
      tableData,
      pageChange,

      returnAddressForm,
      updateReturnDialogVisible,
      switchToEditReturnInfo,
      updateReturnAddress,

      payExpressFeeSign,
      handleReturnPay,
      returnExpressFee,
      submitReturnFees,

      imageDomain,

      userAccountBalance,
      switchToUserInfo,

      cancelReturnGoods,
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
</style>
