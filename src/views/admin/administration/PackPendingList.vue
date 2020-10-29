<template>
  <div class="mt-5">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">所有商品</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"><i class="fas fa-box" /> 待打包</span>
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
            prop="goodsList"
            label="货物详情"
            align="center"
            width="400"
            sortable
          >
            <template slot-scope="{ row }">
              <div
                v-for="(item, index) in row.goodsList"
                :key="index"
                class="mb-2"
              >
                <div>货物序号: {{ item.goodId }}</div>
                <div>货物名称: {{ item.goodName }}</div>
                <div>货物数量: {{ item.goodNumber }}</div>
                <div>货物位置: {{ item.goodLocation }}</div>
                <hr />
              </div>
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
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="{ row }">
              <el-button type="primary" @click="handleUpdate(row)">
                打包
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :data="tableData"
          class="mt-5 float-right mb-5"
          @pagechange="pageChange"
          pager="prev, pager, next, jumper, ->, total, slot"
          limitNumber="5"
        />
      </div>
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
            <el-select v-model="handleOrderForm.orderType" autocomplete="off">
              <el-option label="粉末货物" value="0"></el-option>
              <el-option label="液体货物" value="1"></el-option>
              <el-option label="食品货物" value="2"></el-option>
              <el-option label="敏感类" value="3"></el-option>
              <el-option label="普通货物" value="4"></el-option>
              <el-option label="体积货物" value="5"></el-option>
              <el-option label="仿牌" value="6"></el-option>
              <el-option label="木制品" value="7"></el-option>
              <el-option label="电池" value="8"></el-option>
              <el-option label="内置电" value="9"></el-option>
              <el-option label="违禁品" value="10"></el-option>
            </el-select>
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
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">拖拽照片 或者 <em>点击上传</em></div>
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
          <el-button type="primary" @click="submitOrderEdition">确定</el-button>
        </span>
      </el-dialog>
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
import { imageDomain } from "@/MainAPI.js";
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
        status: "待打包",
        page: "0",
        size: "5",
      });
      $store.dispatch("getUpToken");
    });

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
      orderStatus: "已打包",
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
        return {
          id: object._id,
          shippingCountry: object.shippingCountry,
          goodsList: object.orderGoodsList,
          username: object.username,
          updatedAt: object.updatedAt,
          orderStatus: object.orderStatus,
        };
      });
    });

    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "待打包",
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

    const handleUpdate = (row) => {
      editDialogVisible.value = true;
      (handleOrderForm.orderId = row.id),
        (handleOrderForm.orderGoodsList = row.goodsList.map((object) => {
          return object.goodId;
        }));
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
      // imageUrl.value = [URL.createObjectURL(file.file)];
      // getBase64(file.file).then(res => {
      //     adminHandleForm.goodImg = res;
      // });
    };

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
        goodsLists: handleOrderForm.orderGoodsList,
        packageTime: Date(Date.now()).toString(),
        packageOperator: $store.state.userSelf.username,
        cancleFee: 20,
      };
      if (
        data.orderId == "" ||
        data.orderImg == "" ||
        data.orderSize_width == "" ||
        data.orderSize_height == "" ||
        data.orderSize_length == "" ||
        data.orderWeight == "" ||
        data.orderType == "" ||
        data.packageLocation == "" ||
        data.packageTime == ""
      ) {
        $message.error("请填写完整的货物打包信息");
      } else if (
        data.retailPriceAndTime.DHL.price == "" &&
        data.retailPriceAndTime.DHL.time == "" &&
        data.retailPriceAndTime.UPS.price == "" &&
        data.retailPriceAndTime.UPS.time == "" &&
        data.retailPriceAndTime.FedEx.price == "" &&
        data.retailPriceAndTime.FedEx.time == "" &&
        data.retailPriceAndTime.TNT.price == "" &&
        data.retailPriceAndTime.TNT.time == "" &&
        data.retailPriceAndTime.EMS.price == "" &&
        data.retailPriceAndTime.EMS.time == "" &&
        data.retailPriceAndTime.Special.price == "" &&
        data.retailPriceAndTime.Special.time == ""
      ) {
        $message.error("请填写快递信息");
      } else if (
        (data.retailPriceAndTime.DHL.price != "" &&
          data.retailPriceAndTime.DHL.time == "") ||
        (data.retailPriceAndTime.DHL.price == "" &&
          data.retailPriceAndTime.DHL.time != "")
      ) {
        $message.error("请填写完整的DHL快递信息");
      } else if (
        (data.retailPriceAndTime.UPS.price != "" &&
          data.retailPriceAndTime.UPS.time == "") ||
        (data.retailPriceAndTime.UPS.price == "" &&
          data.retailPriceAndTime.UPS.time != "")
      ) {
        $message.error("请填写完整的UPS快递信息");
      } else if (
        (data.retailPriceAndTime.FedEx.price != "" &&
          data.retailPriceAndTime.FedEx.time == "") ||
        (data.retailPriceAndTime.FedEx.price == "" &&
          data.retailPriceAndTime.FedEx.time != "")
      ) {
        $message.error("请填写完整的FedEx快递信息");
      } else if (
        (data.retailPriceAndTime.TNT.price != "" &&
          data.retailPriceAndTime.TNT.time == "") ||
        (data.retailPriceAndTime.TNT.price == "" &&
          data.retailPriceAndTime.TNT.time != "")
      ) {
        $message.error("请填写完整的TNT快递信息");
      } else if (
        (data.retailPriceAndTime.EMS.price != "" &&
          data.retailPriceAndTime.EMS.time == "") ||
        (data.retailPriceAndTime.EMS.price == "" &&
          data.retailPriceAndTime.EMS.time != "")
      ) {
        $message.error("请填写完整的EMS快递信息");
      } else if (
        (data.retailPriceAndTime.Special.price != "" &&
          data.retailPriceAndTime.Special.time == "") ||
        (data.retailPriceAndTime.Special.price == "" &&
          data.retailPriceAndTime.Special.time != "")
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

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAllOrderForm", {
          status: "待打包",
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchOrders", {
            keyword: { searchString: keyWord.value },
            status: "待打包",
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

      orderList,
      editDialogVisible,
      tableData,

      handleOrderForm,
      handleUpdate,

      imageUrl,
      beforeAvatarUpload,
      handleAvatarSuccess,

      submitOrderEdition,
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
</style>
