<template>
  <div class="mt-5">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">所有订单</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"><i class="fas fa-tape" /> 待付款</span>
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
      <div class="mt-5 mb-5">
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
            prop="packageLocation"
            label="订单位置"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.packageLocation }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderSize_length"
            label="订单尺寸(cm)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <div>长: {{ row.orderSize_length }}</div>
              <div>宽: {{ row.orderSize_width }}</div>
              <div>高: {{ row.orderSize_height }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderWeight"
            label="订单重量(kg)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderWeight }}</span>
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
              <span v-if="row.orderType=== 7">木制品</span>
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
          <el-table-column prop="orderImg" label="订单照片" align="center">
            <template slot-scope="{ row }">
              <el-image
                :src="imageDomain + row.orderImg"
                fit="fill"
                :preview-src-list="[imageDomain + row.orderImg]"
              ></el-image>
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
            prop="packageOperator"
            label="打包人员"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.packageOperator" class="text-danger">{{
                row.packageOperator
              }}</span>
              <span v-else class="text-info">无打包人员</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="packageUpdateOperator"
            label="更新人员"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.packageUpdateOperator" class="text-danger">{{
                row.packageUpdateOperator
              }}</span>
              <span v-else class="text-info">无更新人员</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="primary" @click="handleUpdate(row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          class="mt-5 float-right"
          :data="tableData"
          @pagechange="pageChange"
          pager="prev, pager, next, jumper, ->, total, slot"
          limitNumber="5"
        />
        <el-dialog
          class="mb-5"
          title="温馨提示"
          :visible.sync="editDialogVisible"
          width="420px"
          center
          v-loading="loading"
        >
          <el-form
            :model="handleOrderForm"
            label-position="left"
            label-width="140px"
          >
            <el-form-item label="*订单货物长度(cm):">
              <el-input
                v-model="handleOrderForm.orderSize_length"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="*订单货物宽度(cm):">
              <el-input
                v-model="handleOrderForm.orderSize_width"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="*订单货物高度(cm):">
              <el-input
                v-model="handleOrderForm.orderSize_height"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="*订单货物重量(kg):">
              <el-input
                v-model="handleOrderForm.orderWeight"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="*订单货物类型:">
              <el-radio v-model="handleOrderForm.orderType" :label="0"
                >粉末货物</el-radio
              >
              <el-radio v-model="handleOrderForm.orderType" :label="1"
                >液体货物</el-radio
              >
              <el-radio v-model="handleOrderForm.orderType" :label="2"
                >食品货物</el-radio
              >
              <el-radio v-model="handleOrderForm.orderType" :label="3"
                >敏感类</el-radio
              >
              <el-radio v-model="handleOrderForm.orderType" :label="4"
                >普通货物</el-radio
              >
              <el-radio v-model="handleOrderForm.orderType" :label="5"
                >体积货物</el-radio
              >
               <el-radio v-model="handleOrderForm.goodType" :label="6"
                  >仿牌</el-radio
                >
                <el-radio v-model="handleOrderForm.goodType" :label="7"
                  >木制品</el-radio
                >
                <el-radio v-model="handleOrderForm.goodType" :label="8"
                  >电池</el-radio
                >
                <el-radio v-model="handleOrderForm.goodType" :label="9"
                  >内置电</el-radio
                >
                <el-radio v-model="handleOrderForm.goodType" :label="10"
                  >违禁品</el-radio
                >
            </el-form-item>
            <el-form-item label="*订单货物位置:">
              <el-input
                v-model="handleOrderForm.packageLocation"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="*订单照片:">
              <el-upload
                drag
                action="https://upload-z2.qiniup.com"
                :data="token"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="imageUrl"
                list-type="picture"
              >
                <img
                  v-if="handleOrderForm.orderImg"
                  :src="imageDomain + handleOrderForm.orderImg"
                  alt=""
                  class="avatar"
                />
                <i v-else class="el-icon-upload"></i>
                <div class="el-upload__text">
                  拖拽照片 或者 <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  *上传照片只支持PNG，GIF，JPEG 和 JPG格式，大小不超过1MB。
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="*快递价格及时效:">
              <div
                v-for="(item, index) in handleOrderForm.retailPriceAndTime"
                :key="index"
              >
                {{ item.name }}:
                <el-input
                  v-model="item.time"
                  autocomplete="off"
                  class="input-width ml-3 float-right"
                  placeholder="时效(工作日)"
                ></el-input>
                <el-input
                  style="width:60px"
                  v-model="item.price"
                  autocomplete="off"
                  class="input-width ml-1 float-right"
                  placeholder="价格"
                ></el-input>
              </div>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitOrderEdition"
              >确定</el-button
            >
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
import { mainDomain } from "@/MainAPI.js";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: {
    pagination,
  },

  setup(props, { root: { $store, $message } }) {
    onMounted(() => {
      $store.dispatch("getAllOrderForm", {
        status: "已打包",
        page: "0",
        size: "5",
      });
      $store.dispatch("getUpToken");
    });

    //inject reload() to refresh component
    const toReload = inject("reload");

    const orderList = computed(() => {
      return $store.state.orderlist;
    });
    const loading = ref(false);
    const editDialogVisible = ref(false);
    const handleOrderForm = reactive({
      orderId: "",
      orderImg: "",
      orderSize_width: "",
      orderSize_height: "",
      orderSize_length: "",
      orderWeight: "",
      orderType: "",
      packageLocation: "",
      orderGoodsList: [],
      retailPriceAndTime: [
        { name: "DHL", price: "", time: "" },
        { name: "UPS", price: "", time: "" },
        { name: "FedEx", price: "", time: "" },
        { name: "TNT", price: "", time: "" },
        { name: "EMS", price: "", time: "" },
        { name: "Special", price: "", time: "" },
      ],
      packageTime: "",
    });

    const handleUpdate = (row) => {
      editDialogVisible.value = true;
      handleOrderForm.orderId = row.id;
      handleOrderForm.orderImg = row.orderImg;

      handleOrderForm.orderSize_width = row.orderSize_width;
      handleOrderForm.orderSize_height = row.orderSize_height;
      handleOrderForm.orderSize_length = row.orderSize_length;
      handleOrderForm.orderWeight = row.orderWeight;
      handleOrderForm.orderType = row.orderType;
      handleOrderForm.packageLocation = row.packageLocation;
      handleOrderForm.packageTime = row.updatedAt;
      handleOrderForm.orderGoodsList = row.orderGoodsList.map((object) => {
        return object.goodId;
      });

      handleOrderForm.retailPriceAndTime[0].price =
        row.retailPriceAndTime.DHL.price;
      handleOrderForm.retailPriceAndTime[0].time =
        row.retailPriceAndTime.DHL.time;

      handleOrderForm.retailPriceAndTime[1].price =
        row.retailPriceAndTime.UPS.price;
      handleOrderForm.retailPriceAndTime[1].time =
        row.retailPriceAndTime.UPS.time;

      handleOrderForm.retailPriceAndTime[2].price =
        row.retailPriceAndTime.FedEx.price;
      handleOrderForm.retailPriceAndTime[2].time =
        row.retailPriceAndTime.FedEx.time;

      handleOrderForm.retailPriceAndTime[3].price =
        row.retailPriceAndTime.TNT.price;
      handleOrderForm.retailPriceAndTime[3].time =
        row.retailPriceAndTime.TNT.time;

      handleOrderForm.retailPriceAndTime[4].price =
        row.retailPriceAndTime.EMS.price;
      handleOrderForm.retailPriceAndTime[4].time =
        row.retailPriceAndTime.EMS.time;

      handleOrderForm.retailPriceAndTime[5].price =
        row.retailPriceAndTime.Special.price;
      handleOrderForm.retailPriceAndTime[5].time =
        row.retailPriceAndTime.Special.time;
    };

    const imageUrl = reactive([]);
    const token = computed(() => {
      return $store.state.token;
    });

    //Before uploading pictures, verify the format and size.
    const beforeAvatarUpload = (file) => {
      let sign = true;
      const imgAccept = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (imgAccept.indexOf(file.type) == -1) {
        $message.error("上传文件应该是图片格式！");
        sign = false;
      }
      if (!isLt1M) {
        $message.error("图片大小超过1MB了哦！");
        sign = false;
      }
      return sign;
    };

    // //getBase64 is used to convert an image to base64 encoded string
    // const getBase64 = file => {
    //     return new Promise(function(resolve, reject) {
    //         let reader = new FileReader();
    //         let imgResult = "";
    //         reader.readAsDataURL(file);
    //         reader.onload = function() {
    //         imgResult = reader.result;
    //         };
    //         reader.onerror = function(error) {
    //         reject(error);
    //         };
    //         reader.onloadend = function() {
    //         resolve(imgResult);
    //         };
    //     });
    // };

    //get the image by the image URL, and convert it to encoded string
    const handleAvatarSuccess = (file) => {
      $store.dispatch("getUpToken").then(() => {
        handleOrderForm.orderImg = file.key;
        imageUrl.value = [imageDomain + file.key];
      });
    };
    // const handleAvatarSuccess = file => {
    //     imageUrl.value.push(URL.createObjectURL(file.file));
    //     getBase64(file.file).then(res => {
    //         handleOrderForm.orderImg = res;
    //     });
    // };

    const submitOrderEdition = () => {
      let data = {
        orderId: handleOrderForm.orderId,
        orderImg: handleOrderForm.orderImg,
        orderSize_width: handleOrderForm.orderSize_width,
        orderSize_height: handleOrderForm.orderSize_height,
        orderSize_length: handleOrderForm.orderSize_length,
        orderWeight: handleOrderForm.orderWeight,
        orderType: handleOrderForm.orderType,
        packageLocation: handleOrderForm.packageLocation,
        retailPriceAndTime: {
          DHL: {
            price: handleOrderForm.retailPriceAndTime[0].price,
            time: handleOrderForm.retailPriceAndTime[0].time,
          },
          UPS: {
            price: handleOrderForm.retailPriceAndTime[1].price,
            time: handleOrderForm.retailPriceAndTime[1].time,
          },
          FedEx: {
            price: handleOrderForm.retailPriceAndTime[2].price,
            time: handleOrderForm.retailPriceAndTime[2].time,
          },
          TNT: {
            price: handleOrderForm.retailPriceAndTime[3].price,
            time: handleOrderForm.retailPriceAndTime[3].time,
          },
          EMS: {
            price: handleOrderForm.retailPriceAndTime[4].price,
            time: handleOrderForm.retailPriceAndTime[4].time,
          },
          Special: {
            price: handleOrderForm.retailPriceAndTime[5].price,
            time: handleOrderForm.retailPriceAndTime[5].time,
          },
        },
        packageTime: Date(Date.now()).toString(),
        goodsLists: handleOrderForm.orderGoodsList,
        packageUpdateOperator: $store.state.userSelf.username,
      };
      if (
        data.orderId == "" ||
        data.orderImg == "" ||
        data.orderSize_width == "" ||
        data.orderSize_height == "" ||
        data.orderSize_length == "" ||
        data.orderWeight == "" ||
        data.orderType === "" ||
        data.packageLocation == "" ||
        data.packageTime == ""
      ) {
        $message.error("请填写完整的货物打包信息");
      } else if (
        data.retailPriceAndTime.DHL.price == null &&
        data.retailPriceAndTime.DHL.time == null &&
        data.retailPriceAndTime.UPS.price == null &&
        data.retailPriceAndTime.UPS.time == null &&
        data.retailPriceAndTime.FedEx.price == null &&
        data.retailPriceAndTime.FedEx.time == null &&
        data.retailPriceAndTime.TNT.price == null &&
        data.retailPriceAndTime.TNT.time == null &&
        data.retailPriceAndTime.EMS.price == null &&
        data.retailPriceAndTime.EMS.time == null &&
        data.retailPriceAndTime.Special.price == null &&
        data.retailPriceAndTime.Special.time == null
      ) {
        $message.error("请填写快递信息");
      } else if (
        (data.retailPriceAndTime.DHL.price != null &&
          data.retailPriceAndTime.DHL.time == null) ||
        (data.retailPriceAndTime.DHL.price == null &&
          data.retailPriceAndTime.DHL.time != null)
      ) {
        $message.error("请填写完整的DHL快递信息");
      } else if (
        (data.retailPriceAndTime.UPS.price != null &&
          data.retailPriceAndTime.UPS.time == null) ||
        (data.retailPriceAndTime.UPS.price == null &&
          data.retailPriceAndTime.UPS.time != null)
      ) {
        $message.error("请填写完整的UPS快递信息");
      } else if (
        (data.retailPriceAndTime.FedEx.price != null &&
          data.retailPriceAndTime.FedEx.time == null) ||
        (data.retailPriceAndTime.FedEx.price == null &&
          data.retailPriceAndTime.FedEx.time != null)
      ) {
        $message.error("请填写完整的FedEx快递信息");
      } else if (
        (data.retailPriceAndTime.TNT.price != null &&
          data.retailPriceAndTime.TNT.time == null) ||
        (data.retailPriceAndTime.TNT.price == null &&
          data.retailPriceAndTime.TNT.time != null)
      ) {
        $message.error("请填写完整的TNT快递信息");
      } else if (
        (data.retailPriceAndTime.EMS.price != null &&
          data.retailPriceAndTime.EMS.time == null) ||
        (data.retailPriceAndTime.EMS.price == null &&
          data.retailPriceAndTime.EMS.time != null)
      ) {
        $message.error("请填写完整的EMS快递信息");
      } else if (
        (data.retailPriceAndTime.Special.price != null &&
          data.retailPriceAndTime.Special.time == null) ||
        (data.retailPriceAndTime.Special.price == null &&
          data.retailPriceAndTime.Special.time != null)
      ) {
        $message.error("请填写完整的Special快递信息");
      } else {
        loading.value = true;
        editDialogVisible.value = false;
        $store
          .dispatch("updateOrderForm", data)
          .then(() => {
            $message.success("货物信息更新成功！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    const tableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = orderList.value;
      }
      return data.map((object) => {
        return {
          id: object._id,
          username: object.username,
          orderStatus: object.orderStatus,
          packageLocation: object.packageLocation,
          orderType: object.orderType,
          shippingCountry: object.shippingCountry,
          orderSize_height: object.orderSize_height,
          orderSize_length: object.orderSize_length,
          orderSize_width: object.orderSize_width,
          orderWeight: object.orderWeight,
          updatedAt: object.updatedAt,
          orderImg: object.orderImg,
          orderGoodsList: object.orderGoodsList,
          retailPriceAndTime: object.retailPriceAndTime,
          packageOperator: object.packageOperator,
          packageUpdateOperator: object.packageUpdateOperator,
          orderDetail: object.orderGoodsList,
        };
      });
    });

    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已打包",
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

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAllOrderForm", {
          status: "已打包",
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchOrders", {
            keyword: { searchString: keyWord.value },
            status: "已打包",
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
      keyWord,
      handleQuery,
      pageChange,

      orderList,

      tableData,
      loading,
      editDialogVisible,
      handleOrderForm,
      handleUpdate,

      imageUrl,
      beforeAvatarUpload,
      handleAvatarSuccess,

      submitOrderEdition,
      mainDomain,
      imageDomain,
      token,
    };
  },
};
</script>

<style lang="scss">
.el-upload__input {
  display: none !important;
}
.el-upload {
  width: 100% !important;
}
.el-upload-dragger {
  width: 100% !important;
}
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin: 0 auto;
}
</style>
