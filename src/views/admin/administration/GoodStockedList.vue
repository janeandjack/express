<template>
  <div class="mt-5">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="border el-breadcrumb-outer"
    >
      <el-breadcrumb-item class="mt-3 ml-3">所有商品</el-breadcrumb-item>
      <el-breadcrumb-item class="mt-3"
        ><span style="color:#f39c12;"><i class="fas fa-boxes" /> 已入库</span>
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
    <el-button v-if="editNewSign===false" type="danger" class="mt-3 float-right" @click="editNewSign=true"> 新增入库</el-button>
    <div v-if="editNewSign===true" style="margin:40px 0;">
      <div style="width:95%;max-width:800px;margin-left: auto;margin-right: auto;font-size:14px;">
        <div class="row no-gutters">
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>会员名称</span></div>
              <div><el-input v-model="adminInputStockForm.username" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货品名称</span></div>
              <div><el-input v-model="adminInputStockForm.goodName" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货品数量</span></div>
              <div>
                <el-input-number style="width:178px;" v-model="adminInputStockForm.goodNumber" :min="1"></el-input-number></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>快递公司</span></div>
              <div>
                <el-select
                style="width:178px;"
                v-model="adminInputStockForm.localExpressCompany"
                placeholder="请选择快递公司"
              >
                <el-option
                  v-for="(item, index) in expressoptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>快递号码</span></div>
              <div><el-input v-model="adminInputStockForm.localExpressNumber" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货物长度</span></div>
              <div><el-input placeholder="cm" v-model="adminInputStockForm.goodSize_length" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货物宽度</span></div>
              <div><el-input placeholder="cm" v-model="adminInputStockForm.goodSize_width" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货物高度</span></div>
              <div><el-input placeholder="cm" v-model="adminInputStockForm.goodSize_height" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货物重量</span></div>
              <div><el-input placeholder="kg" v-model="adminInputStockForm.goodWeight" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-sm-6 col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货物位置</span></div>
              <div><el-input v-model="adminInputStockForm.packageLocation" autocomplete="off"></el-input></div>
            </div>
          </div>
          <div class="col-12 mb-2">
            <div class="row no-gutters" style="margin:0 auto;">
              <div class="mr-3"><span>货物类型</span></div>
              <div class="col">
                <el-radio v-model="adminInputStockForm.goodType" :label="0"
                  >粉末货物</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="1"
                  >液体货物</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="2"
                  >食品货物</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="3"
                  >敏感类</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="4"
                  >普通货物</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="5"
                  >体积货物</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="6"
                  >仿牌</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="7"
                  >木制品</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="8"
                  >电池</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="9"
                  >内置电</el-radio
                >
                <el-radio v-model="adminInputStockForm.goodType" :label="10"
                  >违禁品</el-radio
                >
              </div>
            </div>
          </div>
          <div class="col-12 mb-3">
            <div class="row" style="margin:0 auto;">
              <div class="mr-3 mt-1"><span>货物备注</span></div>
              <div><el-input style="width:378px;" v-model="adminInputStockForm.note" autocomplete="off"></el-input></div>
            </div>
          </div>
        </div>
        <div>
            <div class="row" style="margin:0 auto;">
              <div class="mr-3"><span>货物照片</span></div>
              <div>
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
                    v-if="adminInputStockForm.goodImg"
                    :src="imageDomain + adminInputStockForm.goodImg"
                    alt=""
                    class="avatar"
                  />
                  <i v-else class="el-icon-upload"></i>
                  <div class="el-upload__text">拖拽照片 或者 <em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">
                    *上传照片只支持PNG，GIF，JPEG 和 JPG格式，大小不超过1MB。
                  </div>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <el-button type="warning" @click="adminHandleNewStock">确认</el-button>
            <el-button type="info" @click="editNewSign=false;">取消</el-button>
          </div>
      </div>
    </div>
    
    <div v-else >
    <el-table :data="allStockedGoods" class="borderRadius" style="margin-top:60px;" border>
      <el-table-column prop="goodId" label="货物号" align="center" sortable>
        <template slot-scope="{ row }">
          {{ row.goodId.substr(-10) }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="会员名称" align="center" sortable>
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodName" label="货物名称" align="center" sortable></el-table-column>
      <el-table-column prop="goodNumber" label="货物数量" align="center" sortable>
      </el-table-column>
      <el-table-column
        prop="packageLocation"
        label="货物位置"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="goodSize_length"
        label="货物尺寸(cm)"
        align="center"
      >
        <template slot-scope="{ row }">
          <div>长: {{ row.goodSize_length }}</div>
          <div>宽: {{ row.goodSize_width }}</div>
          <div>高: {{ row.goodSize_height }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodWeight"
        label="货物重量(kg)"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="goodPaidWeight"
        label="计费重量(kg)"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column prop="goodType" label="货物类型" align="center" sortable>
        <template slot-scope="{ row }">
          <span v-if="row.goodType === 0">粉末货物</span>
          <span v-if="row.goodType === 1">液体货物</span>
          <span v-if="row.goodType === 2">食品货物</span>
          <span v-if="row.goodType === 3">敏感类</span>
          <span v-if="row.goodType === 4">普通货物</span>
          <span v-if="row.goodType === 5">体积货物</span>
          <span v-if="row.goodType === 6">仿牌</span>
          <span v-if="row.goodType === 7">木制品</span>
          <span v-if="row.goodType === 8">电池</span>
          <span v-if="row.goodType === 9">内置电</span>
          <span v-if="row.goodType === 10">违禁品</span>
        </template>
      </el-table-column>

      <el-table-column label="货物照片" align="center">
        <template slot-scope="{ row }">
          <el-image
            :src="imageDomain + row.goodImg"
            fit="fill"
            :preview-src-list="[imageDomain + row.goodImg]"
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
        prop="goodStatus"
        label="货物状态"
        align="center"
        sortable
      >
        <template slot-scope="{ row }" class="text-primary">
          <span class="text-danger">{{ row.goodStatus }}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="stockOperator"
        label="录入人员"
        align="center"
        sortable
      >
        <template slot-scope="{ row }" class="text-primary">
          <span v-if="row.stockOperator" class="text-danger">{{
            row.stockOperator
          }}</span>
          <span v-else class="text-info">无录入人员</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="stockUpdateOperator"
        label="更新人员"
        align="center"
        sortable
      >
        <template slot-scope="{ row }" class="text-primary">
          <span v-if="row.stockUpdateOperator" class="text-danger">{{
            row.stockUpdateOperator
          }}</span>
          <span v-else class="text-info">无更新人员</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130" fixed="right">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.goodStatus === '已入库'"
            type="warning"
            size="mini"
            @click="handleUpdate(row)"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :data="allStockedGoods"
      class="mt-5 float-right"
      @pagechange="pageChange"
      pager="prev, pager, next, jumper, ->, total, slot"
      limitNumber="5"
    />
    </div>

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
        <el-form-item label="货物数量">
          <el-input
            v-model="adminHandleForm.goodNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物长度 (cm)">
          <el-input
            v-model="adminHandleForm.goodSize_length"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物宽度 (cm)">
          <el-input
            v-model="adminHandleForm.goodSize_width"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物高度 (cm)">
          <el-input
            v-model="adminHandleForm.goodSize_height"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物重量 kg">
          <el-input
            v-model="adminHandleForm.goodWeight"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物类型">
          <el-radio v-model="adminHandleForm.goodType" :label="0"
            >粉末货物</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="1"
            >液体货物</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="2"
            >食品货物</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="3"
            >敏感类</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="4"
            >普通货物</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="5"
            >体积货物</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="6"
            >仿牌</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="7"
            >木制品</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="8"
            >电池</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="9"
            >内置电</el-radio
          >
          <el-radio v-model="adminHandleForm.goodType" :label="10"
            >违禁品</el-radio
          >
        </el-form-item>
        <el-form-item label="货物位置">
          <el-input
            v-model="adminHandleForm.packageLocation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物照片">
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
              v-if="adminHandleForm.goodImg"
              :src="imageDomain + adminHandleForm.goodImg"
              alt=""
              class="avatar"
            />
            <i v-else class="el-icon-upload"></i>
            <div class="el-upload__text">拖拽照片 或者 <em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              *上传照片只支持PNG，GIF，JPEG 和 JPG格式，大小不超过1MB。
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="货物备注">
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
import { mainDomain } from "@/MainAPI.js";
import { imageDomain } from "@/MainAPI.js";
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
    const editNewSign = ref(false);

    onMounted(() => {
      $store.dispatch("getAllGoods", {
        status: "已入库",
        page: "0",
        size: "5",
        status1: "待打包",
      });
      $store.dispatch("getUpToken");
    });

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
      storageTime: "",
      note: "",
      stockUpdateOperator: $store.state.userSelf.username,
      goodNumber:0,
    });

    const adminInputStockForm = reactive({
      username: "",
      goodName:"",
      goodNumber: 1,
      localExpressCompany: "",
      localExpressNumber: "",
      goodImg:"",
      goodSize_width: "",
      goodSize_height: "",
      goodSize_length: "",
      goodWeight: "",
      goodType: 0,
      packageLocation: "",
      storageTime: "",
      note: "",
      goodPaidWeight: 0,
      stockUpdateOperator: $store.state.userSelf.username,
    });

    const adminHandleNewStock = () =>{
      if (
        adminInputStockForm.username === "" ||
        adminInputStockForm.goodName === "" ||
        adminInputStockForm.localExpressCompany === "" ||
        adminInputStockForm.localExpressNumber === "" ||
        adminInputStockForm.goodImg === "" ||
        adminInputStockForm.goodSize_width === "" ||
        adminInputStockForm.goodSize_height === "" ||
        adminInputStockForm.goodSize_length === "" ||
        adminInputStockForm.goodWeight === "" ||
        adminInputStockForm.packageLocation === ""
      ) {
        $message.error("请填写完整的货物入库信息");
      } else {
        let sizeWeight = Math.round((adminInputStockForm.goodSize_width * adminInputStockForm.goodSize_height * adminInputStockForm.goodSize_length) / 5000);
        let realGoodWeight = adminInputStockForm.goodWeight > sizeWeight ? adminInputStockForm.goodWeight :sizeWeight;
        adminInputStockForm.goodPaidWeight = realGoodWeight;
        adminInputStockForm.storageTime = Date(Date.now()).toString();
        switchEditSign.value = false;
        loading.value = true;
        $store
          .dispatch("adminSubmitGoods", adminInputStockForm)
          .then(() => {
            $message.success("客服入库信息成功！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    const token = computed(() => {
      return $store.state.token;
    });
    const imageUrl = reactive([]);

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
    // const handleAvatarSuccess = file => {
    //     imageUrl.value = [URL.createObjectURL(file.file)];
    //     getBase64(file.file).then(res => {
    //         adminHandleForm.goodImg = res;
    //     });
    // };
    const handleAvatarSuccess = (file) => {
      $store.dispatch("getUpToken").then(() => {
        adminInputStockForm.goodImg = file.key;
        imageUrl.value.push(imageDomain + file.key);
      });
    };

    const handleUpdate = (row) => {
      switchEditSign.value = true;
      adminHandleForm._Id = row.goodId;
      adminHandleForm.goodImg = row.goodImg;
      adminHandleForm.goodSize_width = row.goodSize_width;
      adminHandleForm.goodSize_height = row.goodSize_height;
      adminHandleForm.goodSize_length = row.goodSize_length;
      adminHandleForm.goodWeight = row.goodWeight;
      adminHandleForm.goodType = row.goodType;
      adminHandleForm.packageLocation = row.packageLocation;
      adminHandleForm.storageTime = row.updatedAt;
      adminHandleForm.note = row.note;
      adminHandleForm.goodNumber = row.goodNumber;
    };

    const submitGoodsInfo = () => {
      if (
        adminHandleForm.goodImg === "" ||
        adminHandleForm.goodSize_width === "" ||
        adminHandleForm.goodSize_height === "" ||
        adminHandleForm.goodSize_length === "" ||
        adminHandleForm.goodWeight === "" ||
        adminHandleForm.goodType === "" ||
        adminHandleForm.packageLocation === ""
      ) {
        $message.error("请填写完整的货物入库信息");
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
    const allGoods = computed(() => {
      return $store.state.allGoods;
    });

    const allStockedGoods = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = allGoods.value;
      }
      return data.map((object) => {
        return {
          goodId: object._id,
          goodName: object.goodName,
          localExpressNumber: object.localExpressNumber,
          localExpressCompany: object.localExpressCompany,
          goodStatus: object.goodStatus,
          packageLocation: object.packageLocation,
          goodImg: object.goodImg,
          goodSize_height: object.goodSize_height,
          goodSize_length: object.goodSize_length,
          goodSize_width: object.goodSize_width,
          goodType: object.goodType,
          goodWeight: object.goodWeight,
          goodPaidWeight: object.goodPaidWeight,
          updatedAt: object.updatedAt,
          isStorage: object.isStorage,
          stockOperator: object.stockOperator,
          stockUpdateOperator: object.stockUpdateOperator,
          username: object.username,
          goodNumber: object.goodNumber,
        };
      });
    });

    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已入库",
        page: "0",
        size: "5",
        status1: "待打包",
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
          status: "已入库",
          page: val - 1,
          size: "5",
          status1: "待打包",
        });
      } else {
        $store
          .dispatch("searchGoods", {
            keyword: { searchString: keyWord.value },
            status: "已入库",
            page: val - 1,
            size: "5",
            status1: "待打包",
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

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

    return {
      loading,
      keyWord,
      handleQuery,
      pageChange,

      allStockedGoods,

      goodName,
      switchEditSign,
      adminHandleForm,
      handleUpdate,

      imageUrl,
      beforeAvatarUpload,
      handleAvatarSuccess,

      allGoods,

      submitGoodsInfo,
      mainDomain,
      imageDomain,
      token,

      editNewSign,
      adminInputStockForm,
      expressoptions,
      adminHandleNewStock,
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin: 0 auto;
}
</style>
