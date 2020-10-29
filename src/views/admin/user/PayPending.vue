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
            ><i class="fas fa-file-invoice-dollar" /> 待付款</span
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column
            prop="orderId"
            label="订单号"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderId.substr(-10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shippingCountry"
            label="运至国家"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.shippingCountry }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="picture" label="包裹图片" align="center">
            <template slot-scope="{ row }">
              <el-image
                :src="row.picture"
                fit="fill"
                :preview-src-list="[row.picture]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderGoodsList"
            label="订单详情"
            align="center"
            width="160"
          >
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.orderGoodsList" :key="index" class="border-bottom">
                <div>
                  货物名称:{{ item.goodName }}
                </div>
                <div>
                  货物数量:{{ item.goodNumber }}
                </div>
              </div>
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
          <el-table-column label="尺寸(cm)" align="center">
            <template slot-scope="{ row }">
              <div>长: {{ row.orderLength }}</div>
              <div>宽: {{ row.orderWidth }}</div>
              <div>高: {{ row.orderHeight }}</div>
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
            prop="position"
            label="包裹位置"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{ row.position }}
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
            prop="orderstatus"
            label="订单状态"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-success">{{ row.orderstatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="渠道选择"
            width="300"
            fixed="right"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-form>
                <el-form-item prop="expressoptions">
                  <div v-if="row.orderstatus === '已打包'">
                    <el-select
                      v-model="row.chosenExpress"
                      clearable
                      placeholder="请选择快递"
                    >
                      <el-option
                        style="width:260px;"
                        v-for="(item, key) in row.expressoptions.filter(
                          (object) => object.price != null
                        )"
                        :key="key"
                        :value="item.name"
                      >
                        <div class="row" style="width:200px">
                          <img
                            class="col-5 pt-1 pb-1"
                            :src="item.icon"
                            style="width:100%;height:90%;"
                          />
                          <span class="col-7 text-danger"
                            >{{ item.price }}元 || {{ item.time }}个工作日</span
                          >
                        </div>
                      </el-option>
                    </el-select>
                  </div>
                  <div v-else>
                    <div class="mt-3">
                      <el-select
                        placeholder="敬待客服打包"
                        v-model="row.chosenExpress"
                        disabled
                      >
                      </el-select>
                    </div>
                    <div class="mt-2 text-danger">
                      <i class="fas fa-exclamation-triangle mr-2"></i
                      >客服打包后才可提交支付
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.orderstatus === '待打包'"
                type="primary"
                @click="handleConfirmReturn(row)"
                >取消订单</el-button
              >
              <el-button
                v-if="row.orderstatus === '已打包'"
                type="primary"
                @click="handleFeesDialog(row)"
                >取消订单</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-margin float-right mt-5">
        <el-button
          v-if="
            multipleSelection.filter(
              (object) => object.orderstatus === '已打包'
            ).length === multipleSelection.length &&
              multipleSelection.length > 0 &&
              ChosenExpressRetailSign === true
          "
          type="primary"
          @click="addressSign = true"
          >提交支付</el-button
        >
        <el-button v-else type="primary" disabled>提交支付</el-button>
      </div>
      <pagination
        :data="tableData"
        class="mt-5 float-right"
        @pagechange="pageChange"
        pager="prev, pager, next, jumper, ->, total, slot"
        limitNumber="5"
      />
      <el-dialog
        title="请填写或者选择地址"
        :visible.sync="addressSign"
        width="400px"
        center
      >
        <p class="text-center" v-if="userAccountBalance < expressTotalPrice">
          <el-link icon="el-icon-s-opportunity" @click="switchToUserInfo"
            >余额不足, 请点击链接充值</el-link
          >
        </p>
        <div v-else>
          <div>
            <span>寄送价格:</span>
            <span class="ml-3">
              <el-tag type="danger" effect="dark"
                >{{ expressTotalPrice }} 元
              </el-tag>
            </span>
            <div class="mt-3">
              <el-radio-group v-model="addressRadio">
                <el-radio :label="0">已存地址</el-radio>
                <el-radio :label="1">手动输入</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div v-if="addressRadio === 0">
            <el-radio-group
              v-if="UserInfoAddress != []"
              v-model="selectedSavedAddress"
            >
              <el-radio
                v-for="(addressItem, index) in UserInfoAddress"
                :key="index"
                :value="index"
                :label="index"
                class="mt-3 ml-1"
              >
                <div style="width:inherit;display:block;white-space:normal;">
                  <p class="row" style="width:370px">
                    <span class="col-5">具体地址:</span>
                    <span class="col-7">{{ addressItem.ShippingAddress }}</span>
                  </p>
                  <p class="row" style="width:370px">
                    <span class="col-5">城市/省份/邮编: </span>
                    <span class="col-7"
                      >{{ addressItem.ShippingCity }},
                      {{ addressItem.ShippingProvince }},
                      {{ addressItem.ShippingPostcode }}</span
                    >
                  </p>
                  <p class="row" style="width:370px">
                    <span class="col-5">联系信息:</span>
                    <span class="col-7"
                      >{{ addressItem.shippingRecevier }},
                      {{ addressItem.shippingPhone }}</span
                    >
                  </p>
                </div>
              </el-radio>
            </el-radio-group>
            <div class="text-danger" v-else>
              <p class="text-center">
                暂无已存的个人地址
              </p>
              <p>
                <el-link icon="el-icon-s-opportunity" @click="switchToUserInfo"
                  >去个人信息中心完善用户地址信息</el-link
                >
              </p>
              <p>
                <el-link icon="el-icon-s-opportunity" @click="addressRadio = 1"
                  >手动输入地址</el-link
                >
              </p>
            </div>
          </div>
          <div v-else class="mt-2 ml-2">
            <el-form
              :model="DeliveryAddressForm"
              label-position="left"
              label-width="100px"
            >
              <el-form-item label="*寄送省份:">
                <el-input
                  v-model="DeliveryAddressForm.ShippingProvince"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*寄送城市:">
                <el-input
                  v-model="DeliveryAddressForm.ShippingCity"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*具体地址:">
                <el-input
                  v-model="DeliveryAddressForm.ShippingAddress"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*地址邮编:">
                <el-input
                  v-model="DeliveryAddressForm.ShippingPostcode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*收件人:">
                <el-input
                  v-model="DeliveryAddressForm.ShippingReceiver"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="*联系电话:">
                <el-input
                  v-model="DeliveryAddressForm.ShippingPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addressSign = false">取消</el-button>
          <el-button
            v-if="addressRadio == 0 && selectedSavedAddress != 2"
            type="primary"
            @click="
              payCodeSign = true;
              addressSign = false;
            "
            >确定</el-button
          >
          <el-button
            v-else-if="
              addressRadio == 1 &&
                DeliveryAddressForm.ShippingProvince !== '' &&
                DeliveryAddressForm.ShippingCity !== '' &&
                DeliveryAddressForm.ShippingAddress !== '' &&
                DeliveryAddressForm.ShippingPostcode !== '' &&
                DeliveryAddressForm.ShippingReceiver !== '' &&
                DeliveryAddressForm.ShippingPhone !== ''
            "
            type="primary"
            @click="
              payCodeSign = true;
              addressSign = false;
            "
            >确定</el-button
          >
          <el-button v-else type="primary" disabled>确定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        v-loading="loading"
        title="支付快递费用"
        :visible.sync="payCodeSign"
        width="400px"
        center
      >
        <span></span>
        <p class="text-center mt-3" style="font-size:18px;">
          <i class="fas fa-exclamation-circle text-warning mr-2"></i
          >账户余额为<span class="text-danger ml-1 mr-1">{{
            userAccountBalance
          }}</span
          >元
        </p>
        <p class="text-center mt-3" style="font-size:18px;">
          <i class="fas fa-yen-sign text-danger mr-2"></i> 快递费用为<span
            class="text-info ml-1 mr-1"
            >{{ expressTotalPrice }}</span
          >元
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="payCodeSign = false">取消</el-button>
          <el-button
            v-if="userAccountBalance < expressTotalPrice"
            type="primary"
            disabled
            >确定</el-button
          >
          <el-button v-else type="primary" @click="submitPayAddress"
            >确定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="支付退货费用"
        :visible.sync="returnFeesPaySign"
        width="400px"
        center
      >
        <span class="text-danger" style="margin-left:65px;"
          ><i class="fas fa-exclamation-circle"></i>
          已打包商品退货须支付20元手续费</span
        >
        <p class="text-center mt-3">
          账户余额为<span class="text-info ml-1 mr-1">{{
            userAccountBalance
          }}</span
          >元
        </p>
        <p class="text-center mt-3">
          取消订单手续费用为<span class="text-info ml-1 mr-1">20</span>元
        </p>
        <p class="text-center" v-if="userAccountBalance < 20">
          <el-link icon="el-icon-s-opportunity" @click="switchToUserInfo"
            >余额不足, 请点击链接充值</el-link
          >
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="returnFeesPaySign = false">取消</el-button>
          <el-button v-if="userAccountBalance < 20" type="primary" disabled
            >确定</el-button
          >
          <el-button v-else type="primary" @click="submitReturnOrder"
            >确定</el-button
          >
        </span>
      </el-dialog>
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
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: {
    pagination,
  },
  setup(props, { root: { $store, $router, $message, $confirm } }) {
    onMounted(() => {
      $store.dispatch("getOrderForm", {
        status: "已打包",
        page: "0",
        size: "5",
        status1: "待打包",
      });
      $store.dispatch("getUserInfo");
    });

    const loading = ref(false);

    //table data for display
    const payOrderList = computed(() => {
      return $store.state.selforderlist;
    });
    const keyWord = ref("");
    const returnData = ref([]);
    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已打包",
        page: "0",
        size: "5",
        status1: "待打包",
      };
      $store
        .dispatch("searchOrdersForUser", data)
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
        data = payOrderList.value;
      }
      return data.map((object) => {
        if (!object.retailPriceAndTime) {
          return {
            orderId: object._id,
            picture:
              "https://cdn.pixabay.com/photo/2017/07/08/10/44/parcel-2484036_1280.png",
            weight: "",
            orderLength: "",
            orderWidth: "",
            orderHeight: "",
            type: "",
            position: "",
            shippingCountry: object.shippingCountry,
            orderGoodsList: object.orderGoodsList,
            expressoptions: [],
            chosenExpress: "",
            orderstatus: object.orderStatus,
            updatedAt: object.updatedAt,
          };
        } else {
          return {
            orderId: object._id,
            picture: imageDomain + object.orderImg,
            weight: object.orderWeight,
            orderLength: object.orderSize_length,
            orderWidth: object.orderSize_width,
            orderHeight: object.orderSize_height,
            type: object.orderType,
            position: object.packageLocation,
            shippingCountry: object.shippingCountry,
            orderGoodsList: object.orderGoodsList,
            expressoptions: [
              {
                name: "DHL",
                icon: "/images/ExpressIcon/dhl.png",
                price: object.retailPriceAndTime.DHL.price,
                time: object.retailPriceAndTime.DHL.time,
              },
              {
                name: "UPS",
                icon: "/images/ExpressIcon/ups.png",
                price: object.retailPriceAndTime.UPS.price,
                time: object.retailPriceAndTime.UPS.time,
              },
              {
                name: "FedEx",
                icon: "/images/ExpressIcon/fedex.png",
                price: object.retailPriceAndTime.FedEx.price,
                time: object.retailPriceAndTime.FedEx.time,
              },
              {
                name: "TNT",
                icon: "/images/ExpressIcon/tnt.png",
                price: object.retailPriceAndTime.TNT.price,
                time: object.retailPriceAndTime.TNT.time,
              },
              {
                name: "EMS",
                icon: "/images/ExpressIcon/ems.png",
                price: object.retailPriceAndTime.EMS.price,
                time: object.retailPriceAndTime.EMS.time,
              },
              {
                name: "Special",
                icon: "/images/ExpressIcon/special.png",
                price: object.retailPriceAndTime.Special.price,
                time: object.retailPriceAndTime.Special.time,
              },
            ],
            chosenExpress: object.orderExpressRetail,
            orderstatus: object.orderStatus,
            updatedAt: object.updatedAt,
          };
        }
      });
    });
    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getOrderForm", {
          status: "已打包",
          page: val - 1,
          size: 5,
          status1: "待打包",
        });
      } else {
        $store
          .dispatch("searchOrdersForUser", {
            keyword: { searchString: keyWord.value },
            status: "已打包",
            page: val - 1,
            size: 5,
            status1: "待打包",
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    //cancel order
    const returnFeesPaySign = ref(false);
    const returnOrderId = ref("");
    const orderGoodsList = ref([]);
    const handleFeesDialog = (row) => {
      returnFeesPaySign.value = true;
      returnOrderId.value = row.orderId;
      orderGoodsList.value = row.orderGoodsList;
    };
    const handleConfirmReturn = (row) => {
      $confirm("确定取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: row.orderId,
            data: { orderGoodsList: row.orderGoodsList },
          };
          $store
            .dispatch("cancleOrderForm", data)
            .then(() => {
              $message.success("订单更新成功！");

              toReload();
            })
            .catch(() => {});
        })
        .catch(() => {
          $message({
            type: "info",
            message: "取消",
          });
        });
    };

    const submitReturnOrder = () => {
      let data = {
        id: returnOrderId.value,
        data: { 
          orderGoodsList: orderGoodsList.value,
        },
      };
      let paydata = {
        payBalance: 20,
      };
      $store
        .dispatch("payFromAccount", paydata)
        .then(() => {
          $message.success("付款成功！");
          $store
            .dispatch("cancleOrderForm", data)
            .then(() => {
              $message.success("订单取消成功！");
              toReload();
            })
            .catch(() => {});
        })
        .catch(() => {});
    };

    //pay the order
    const toReload = inject("reload");
    const multipleSelection = ref([]);
    const handleSelectionChange = (val) => {
      multipleSelection.value = val;
    };
    const addressSign = ref(false);
    const addressRadio = ref(0);
    const selectedSavedAddress = ref(2);
    const UserInfoAddress = computed(() => {
      return $store.state.userSelf.address;
    });

    const expressTotalPrice = computed(() => {
      let a = multipleSelection.value.map((object) => {
        return object.expressoptions
          .filter((item) => item.name == object.chosenExpress)
          .map((object) => {
            return object.price;
          })[0];
      });
      let result = 0;
      for (let i of a) {
        result = result + i;
      }
      return result;
    });

    const ChosenExpressRetailSign = computed(() => {
      let temp = multipleSelection.value.filter(
        (object) => object.chosenExpress === undefined
      );
      if (temp.length === 0) {
        return true;
      } else {
        return false;
      }
    });
    const DeliveryAddressForm = reactive({
      ShippingProvince: "",
      ShippingCity: "",
      ShippingAddress: "",
      ShippingPostcode: "",
      ShippingReceiver: "",
      ShippingPhone: "",
    });
    const payCodeSign = ref(false);
    const submitPayAddress = () => {
      loading.value = true;
      payCodeSign.value = false;
      if (addressRadio.value == 0) {
        let data = multipleSelection.value.map((object) => {
          return {
            orderId: object.orderId,
            shippingProvince:
              UserInfoAddress.value[selectedSavedAddress.value]
                .ShippingProvince,
            shippingCity:
              UserInfoAddress.value[selectedSavedAddress.value].ShippingCity,
            shippingAddress:
              UserInfoAddress.value[selectedSavedAddress.value].ShippingAddress,
            shippingPostcode:
              UserInfoAddress.value[selectedSavedAddress.value]
                .ShippingPostcode,
            shippingPhone:
              UserInfoAddress.value[selectedSavedAddress.value].shippingPhone,
            shippingRecevier:
              UserInfoAddress.value[selectedSavedAddress.value]
                .shippingRecevier,
            orderExpressRetail: object.chosenExpress,
            incomePrice: expressTotalPrice.value,
          };
        });
        let paydata = {
          payBalance: expressTotalPrice.value,
        };
        $store
          .dispatch("payFromAccount", paydata)
          .then(() => {
            $message.success("付款成功！");
            $store
              .dispatch("orderDelivery", data)
              .then(() => {
                $message.success("订单更新成功！");
                loading.value = false;
                toReload();
              })
              .catch(() => {
                loading.value = false;
              });
          })
          .catch(() => {});
      } else {
        let data = multipleSelection.value.map((object) => {
          return {
            orderId: object.orderId,
            shippingProvince: DeliveryAddressForm.ShippingProvince,
            shippingCity: DeliveryAddressForm.ShippingCity,
            shippingAddress: DeliveryAddressForm.ShippingAddress,
            shippingPostcode: DeliveryAddressForm.ShippingPostcode,
            shippingPhone: DeliveryAddressForm.ShippingPhone,
            shippingRecevier: DeliveryAddressForm.ShippingReceiver,
            orderExpressRetail: object.chosenExpress,
            incomePrice: expressTotalPrice.value,
          };
        });
        let paydata = {
          payBalance: expressTotalPrice.value,
        };
        $store
          .dispatch("payFromAccount", paydata)
          .then(() => {
            $message.success("付款成功！");
            $store
              .dispatch("orderDelivery", data)
              .then(() => {
                $message.success("邮寄填写成功！");
                loading.value = false;
                toReload();
              })
              .catch(() => {
                loading.value = false;
              });
          })
          .catch(() => {});
      }
    };
    const switchToUserInfo = () => {
      $router.push("/dashboard/useraccountinfo");
      toReload();
    };

    const handleClose = () => {
      toReload();
    };

    const userAccountBalance = computed(() => {
      return $store.state.userSelf.balance;
    });

    return {
      loading,
      keyWord,
      handleQuery,
      payOrderList,
      tableData,
      pageChange,

      returnFeesPaySign,
      submitReturnOrder,
      handleFeesDialog,
      switchToUserInfo,
      handleConfirmReturn,

      multipleSelection,
      handleSelectionChange,
      ChosenExpressRetailSign,
      UserInfoAddress,
      selectedSavedAddress,
      addressSign,
      addressRadio,
      DeliveryAddressForm,
      expressTotalPrice,
      payCodeSign,
      submitPayAddress,

      handleClose,
      userAccountBalance,
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
.el-dropdown-item {
  width: 260px !important;
  height: 50px;
}
</style>
