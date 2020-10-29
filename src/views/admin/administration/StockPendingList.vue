<template>
  <div class="mt-5">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="border el-breadcrumb-outer"
    >
      <el-breadcrumb-item class="mt-3 ml-3">所有商品</el-breadcrumb-item>

      <el-breadcrumb-item class="mt-3"
        ><span style="color:#f39c12;"
          ><i class="fas fa-warehouse" /> 待入库</span
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
    <el-table :data="tableData" class="borderRadius mt-5" border>
      <el-table-column prop="_id" label="货物号" align="center" sortable>
        <template slot-scope="{ row }">
          {{ row._id.substr(-10) }}
        </template>
      </el-table-column>
      <el-table-column prop="user_id" label="用户号" align="center" sortable>
      </el-table-column>
      <el-table-column prop="username" label="会员名称" align="center" sortable>
      </el-table-column>
      <el-table-column prop="goodName" label="货品名称" align="center">
      </el-table-column>
      <el-table-column prop="goodNumber" label="货品数量" align="center">
      </el-table-column>
      <el-table-column
        prop="localExpressNumber"
        label="快递单号"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="localExpressCompany"
        label="快递公司"
        align="center"
        sortable
      >
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
        prop="goodNotes"
        label="客户备注"
        align="center"
        sortable
      >
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
      
      <el-table-column label="操作" align="center" width="130" fixed="right">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            入库
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :data="tableData"
      class="mt-5 float-right"
      @pagechange="pageChange"
      pager="prev, pager, next, jumper, ->, total, slot"
      limitNumber="10"
    />
    <el-dialog
      title="货物入库信息"
      :visible.sync="switchEditSign"
      center
      v-loading="loading"
      width="400px"
    >
      <el-form
        :model="adminHandleForm"
        label-position="left"
        label-width="120px"
      >
       <el-form-item label="*货物数量:">
          <el-input
            v-model="adminHandleForm.goodNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="*货物长度 (cm):">
          <el-input
            v-model="adminHandleForm.goodSize_length"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="*货物宽度 (cm):">
          <el-input
            v-model="adminHandleForm.goodSize_width"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="*货物高度 (cm):">
          <el-input
            v-model="adminHandleForm.goodSize_height"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="*货物重量 (kg):">
          <el-input
            v-model="adminHandleForm.goodWeight"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="*货物类型:">
          <el-select v-model="adminHandleForm.goodType" autocomplete="off">
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
        <el-form-item label="*货物位置:">
          <el-input
            v-model="adminHandleForm.packageLocation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="*入库时间:">
          <el-date-picker v-model="adminHandleForm.storageTime" type="datetime">
          </el-date-picker>
          {{Date(Date.now()).toString()}}
        </el-form-item> -->
        <el-form-item label="*货物照片:">
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
        <el-form-item label="货物备注:">
          <el-input
            v-model="adminHandleForm.note"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="switchEditSign = false">取消</el-button>
        <el-button type="primary" @click="submitGoodsInfo">确认</el-button>
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
import { imageDomain } from "@/MainAPI.js";
export default {
  name: "stockpendinglist",
  components: {
    pagination,
  },

  setup(props, { root: { $store, $message } }) {
    onMounted(() => {
      $store.dispatch("getAllGoods", {
        status: "待入库",
        page: 0,
        size: 10,
      });
      $store.dispatch("getUpToken");
    });

    const switchEditSign = ref(false);
    const toReload = inject("reload");
    const loading = ref(false);

    const adminHandleForm = reactive({
      _Id: "",
      goodImg: "",
      goodSize_width: "",
      goodSize_height: "",
      goodSize_length: "",
      goodWeight: "",
      goodPaidWeight: 0,
      goodType: "",
      packageLocation: "",
      goodNumber:0,
      //isStorage: "",
      storageTime: "",
      note: "",
      stockOperator: $store.state.userSelf.username,
    });

    const handleUpdate = (row) => {
      switchEditSign.value = true;
      adminHandleForm._Id = row._id;
      adminHandleForm.goodNumber = row.goodNumber;
    };

    const allGoods = computed(() => {
      return $store.state.allGoods;
    });

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
      } else if (!isLt1M) {
        $message.error("图片大小超过1MB了哦！");
        sign = false;
      }
      return sign;
    };

    //getBase64 is used to convert an image to base64 encoded string
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
      $store
        .dispatch("getUpToken")
        .then(() => {
          adminHandleForm.goodImg = file.key;
          imageUrl.value.push(imageDomain + file.key);
        })
        .catch(() => {});
      // imageUrl.value = [URL.createObjectURL(file.file)];
      // getBase64(file.file).then(res => {
      //     adminHandleForm.goodImg = res;
      // });
    };

    const tableData = computed(() => {
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
        status: "待入库",
        page: "0",
        size: "10",
        // status1: '待入库',
      };
      $store
        .dispatch("searchGoods", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };

    const submitGoodsInfo = () => {
      if (
        adminHandleForm._Id == "" ||
        adminHandleForm.goodImg == "" ||
        adminHandleForm.goodSize_width == "" ||
        adminHandleForm.goodSize_height == "" ||
        adminHandleForm.goodSize_length == "" ||
        adminHandleForm.goodWeight == "" ||
        adminHandleForm.goodType == "" ||
        adminHandleForm.packageLocation == "" ||
        adminHandleForm.goodNumber == ""
      ) {
        $message.error("请填写完整货物信息");
      } else {
        let sizeWeight = Math.round((adminHandleForm.goodSize_width * adminHandleForm.goodSize_height * adminHandleForm.goodSize_length) / 5000);
        let realGoodWeight = adminHandleForm.goodWeight > sizeWeight ? adminHandleForm.goodWeight :sizeWeight;
        adminHandleForm.goodPaidWeight = realGoodWeight;
        adminHandleForm.storageTime = Date(Date.now()).toString();
        switchEditSign.value = false;
        loading.value = true;
        $store
          .dispatch("goodUpdate", adminHandleForm)
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
        $store.dispatch("getAllGoods", {
          status: "待入库",
          page: val - 1,
          size: 10,
        });
      } else {
        $store
          .dispatch("searchGoods", {
            keyword: { searchString: keyWord.value },
            status: "待入库",
            page: val - 1,
            size: 10,
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

      tableData,

      switchEditSign,
      adminHandleForm,
      handleUpdate,

      allGoods,

      imageUrl,
      beforeAvatarUpload,
      handleAvatarSuccess,

      submitGoodsInfo,
      pageChange,
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

.el-form-item--small.el-form-item {
  margin-bottom: 8px;
}
</style>
