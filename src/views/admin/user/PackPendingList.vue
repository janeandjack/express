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
            ><i class="fas fa-pallet" /> 已入库</span
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
          @selection-change="handleSelectionChange"
          max-height="600px"
          border
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            fixed
            prop="id"
            label="货物号"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.id.substr(-10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
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
            fixed
            prop="goodNumber"
            label="货物数量"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.goodNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
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
          >
            <template slot-scope="{ row }">
              <el-image
                :src="row.picture"
                fit="fill"
                :preview-src-list="[row.picture]"
                lazy
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
          <el-table-column prop="weight" label="重量(kg)" align="center" sortable>
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
           <el-table-column
            prop="goodPaidWeight"
            label="计费重量(kg)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-danger">{{row.goodPaidWeight}}</span>
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
          <el-table-column
            prop="goodStatus"
            label="货物状态"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-success">{{ row.goodStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodNotes" label="客户备注" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.goodNotes }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="客服备注" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.note }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt-5 mb-5 float-right">
        <div v-if="multipleSelection.length > 0">
          <el-button type="primary" @click="shippingCountryDialogVisible = true"
            >提交打包</el-button
          >
          <el-button type="warning" @click="returnDialogVisible = true"
            >选择退货</el-button
          >
        </div>
        <div v-else>
          <el-button type="primary" disabled>提交打包</el-button>
          <el-button type="warning" disabled>选择退货</el-button>
        </div>
      </div>
      <!-- <div>
        <pagination
          :data="tableData"
          class="mt-5 float-right mb-5"
          @pagechange="pageChange"
          pager="prev, pager, next, jumper, ->, total, slot"
          limitNumber="5"
        />
      </div> -->

      <el-dialog
        v-loading="loading"
        title="请选择运送到的国家"
        :visible.sync="shippingCountryDialogVisible"
        width="420px"
        center
      >
        <el-select
          style="margin-left:100px;"
          v-model="shippingCountry"
          placeholder="请选择国家"
        >
          <el-option
            v-for="(item, index) in shippingCountryOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="shippingCountryDialogVisible = false"
            >取消</el-button
          >
          <el-button
            v-if="shippingCountry !== ''"
            type="primary"
            @click="createOrder"
            >确定</el-button
          >
          <el-button v-else type="primary" disabled="">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="温馨提示"
        :visible.sync="returnDialogVisible"
        width="400px"
        center
      >
        <p class="dialog-notice">
          <i class="fas fa-exclamation-circle"></i> 所有选择的商品将寄往同一地址
        </p>
        <span
          v-if="returnAddressDialogVisible === true"
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="returnDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="returnAddressDialogVisible = false"
            >确定</el-button
          >
        </span>
        <div
          v-if="returnAddressDialogVisible === false"
          class="mt-4"
          v-loading="loading"
        >
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
            <el-form-item label="快递备注:">
              <el-input
                v-model="returnAddressForm.returnShippingNotes"
                placeholder="可备注快递公司"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="returnAddressDialogVisible = true"
                >取消</el-button
              >
              <el-button
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
                @click="submitReturn"
                >确认</el-button
              >
              <el-button v-else type="primary" disabled="">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  computed,
  inject,
  ref,
  reactive,
} from "@vue/composition-api";
//import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: {
    //pagination,
  },

  setup(props, { root: { $store, $message } }) {
    //inject reload() to refresh component
    const toReload = inject("reload");
    const loading = ref(false);
    const serviceChargeSign = ref(false);

    onMounted(() => {
      $store.dispatch("goodGet", {
        status: "已入库",
        page: "0",
        size: "10000",
      });
    });

    //table data for display including query data
    const goodList = computed(() => {
      return $store.state.goodlist;
    });
    const keyWord = ref("");
    const returnData = ref([]);
    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已入库",
        page: "0",
        size: "10000",
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
      return data.map((object) => {
        return {
          id: object._id,
          localExpressNumber: object.localExpressNumber,
          goodname: object.goodName,
          picture: imageDomain + object.goodImg,
          warehousenumber: object.packageLocation,
          weight: object.goodWeight,
          length: object.goodSize_length,
          width: object.goodSize_width,
          height: object.goodSize_height,
          type: object.goodType,
          operation: "0",
          goodNotes: object.goodNotes,
          note: object.note,
          isStorage: object.isStorage,
          storageTime: object.storageTime,
          goodStatus: object.goodStatus,
          returnExpressNumber: object.returnExpressNumber,
          returnExpressCompany: object.returnExpressCompany,
          goodPaidWeight: object.goodPaidWeight,
          goodNumber: object.goodNumber,
        };
      });
    });
    //pagination
    // const pageChange = (val) => {
    //   if (keyWord.value === "") {
    //     $store.dispatch("goodGet", {
    //       status: "已入库",
    //       page: val - 1,
    //       size: 5,
    //     });
    //   } else {
    //     $store
    //       .dispatch("searchGoodsForUser", {
    //         keyword: { searchString: keyWord.value },
    //         status: "已入库",
    //         page: val - 1,
    //         size: 5,
    //       })
    //       .then((res) => {
    //         returnData.value = res.data;
    //       })
    //       .catch(() => {});
    //   }
    // };

    //create an order
    const multipleSelection = ref([]);
    const handleSelectionChange = (val) => {
      multipleSelection.value = val;
    };
    const shippingCountryDialogVisible = ref(false);
    const shippingCountry = ref("");
    const shippingCountryOptions = reactive([
      {
        label: "加拿大",
        value: "Canada",
      },
      {
        label: "美国",
        value: "USA",
      },
    ]);
    const createOrder = () => {
      let orderGoodsList = multipleSelection.value.map((object) => {
        return {
          goodId: object.id,
          goodName: object.goodname,
          goodLocation: object.warehousenumber,
          goodNumber: object.goodNumber,
        };
      });
      let data = {
        orderGoodsList: orderGoodsList,
        shippingCountry: shippingCountry.value,
      };
      if (data.shippingCountry === "") {
        $message.error("请填写收货国家");
      } else {
        shippingCountryDialogVisible.value = false;
        $store
          .dispatch("createOrderForm", data)
          .then(() => {
            $message.success("打包申请提交成功！");
            toReload();
          })
          .catch(() => {});
      }
    };

    //order return
    const returnDialogVisible = ref(false);
    const returnAddressDialogVisible = ref(true);
    const handleServiceCharge = () => {
      serviceChargeSign.value = true;
      returnAddressDialogVisible.value = false;
    };
    const handletoReturnAddress = () => {
      returnAddressDialogVisible.value = false;
      serviceChargeSign.value = false;
    };
    const serviceChargeAmount = computed(() => {
      return (
        20 *
        multipleSelection.value.filter(
          (object) => object.goodStatus === "待打包"
        ).length
      );
    });
    const returnAddressForm = reactive({
      returnPayMethod: "0",
      returnShippingCountry: "",
      returnShippingProvince: "",
      returnShippingCity: "",
      returnShippingAddress: "",
      returnShippingPostcode: "",
      returnShippingPhone: "",
      returnShippingRecevier: "",
      returnShippingNotes: "",
    });
    const submitReturn = () => {
      returnAddressDialogVisible.value = true;
      returnDialogVisible.value = false;
      loading.value = true;
      let returnGoodsIdArray = multipleSelection.value.map((object) => {
        return object.id;
      });
      let data = {
        returnedGoods: returnGoodsIdArray,
        returnShippingCountry: returnAddressForm.returnShippingCountry,
        returnShippingProvince: returnAddressForm.returnShippingProvince,
        returnShippingCity: returnAddressForm.returnShippingCity,
        returnShippingAddress: returnAddressForm.returnShippingAddress,
        returnShippingPostcode: returnAddressForm.returnShippingPostcode,
        returnShippingPhone: returnAddressForm.returnShippingPhone,
        returnShippingRecevier: returnAddressForm.returnShippingRecevier,
        returnPayMethod: returnAddressForm.returnPayMethod,
        returnShippingNotes: returnAddressForm.returnShippingNotes,
      };
      if (
        data.returnShippingCountry == "" ||
        data.returnShippingProvince == "" ||
        data.returnShippingCity == "" ||
        data.returnShippingAddress == "" ||
        data.returnShippingPostcode == "" ||
        data.returnShippingRecevier == "" ||
        data.returnShippingPhone == ""
      ) {
        $message.error("请填写完整的退货信息");
      } else {
        $store
          .dispatch("returnGoods", data)
          .then(() => {
            $message.success("退货商品已发送到后台等待我们打包！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    return {
      loading,
      keyWord,
      handleQuery,
      goodList,
      tableData,
      //pageChange,

      handleSelectionChange,
      multipleSelection,
      shippingCountryDialogVisible,
      shippingCountry,
      shippingCountryOptions,
      createOrder,

      returnDialogVisible,
      returnAddressDialogVisible,
      returnAddressForm,
      serviceChargeAmount,
      serviceChargeSign,
      handleServiceCharge,
      handletoReturnAddress,
      submitReturn,
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
