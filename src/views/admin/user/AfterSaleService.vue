<template>
  <div class="ml-4">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">订单详情</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"
            ><i class="fas fa-warehouse" /> 售后服务</span
          >
        </el-breadcrumb-item>
        <el-button
          class="mt-2 float-right mr-3"
          type="primary"
          v-if="addAfterSaleSign === false"
          @click="addAfterSaleSign = !addAfterSaleSign"
        >
          申请售后
          <i class="el-icon-service"></i>
        </el-button>
      </el-breadcrumb>
      <el-collapse-transition>
        <div class="mt-5" v-if="addAfterSaleSign === true" v-loading="loading">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-position="left"
            label-width="130px"
            class="demo-ruleForm form"
          >
            <el-form-item label="*售后服务单号:">
              <el-select v-model="ruleForm.order_id" placeholder="请选择单号">
                <el-option
                  v-for="(item, index) in orderIdList"
                  :key="index"
                  :label="item.id"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="*售后服务类型:" prop="aftersale_type">
              <el-radio-group v-model="ruleForm.aftersale_type">
                <el-radio label="损坏">损坏</el-radio>
                <el-radio label="丢失">丢失</el-radio>
                <el-radio label="其他">其他</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="*售后服务标题:" prop="aftersale_title">
              <el-input v-model="ruleForm.aftersale_title"></el-input>
            </el-form-item>
            <el-form-item label="*售后服务内容:" prop="aftersale_content">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model="ruleForm.aftersale_content"
              ></el-input>
            </el-form-item>
            <el-form-item label="*售后服务照片:">
              <el-upload
                drag
                action="https://upload-z2.qiniup.com"
                :data="token"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                list-type="picture"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  拖拽照片 或者 <em>点击上传</em>
                </div>
                <div
                  class="el-upload__tip text-danger"
                  style="font-size:14px;"
                  slot="tip"
                >
                  <i class="fas fa-exclamation-circle mr-2"></i
                  >上传照片只支持PNG，GIF，JPEG 和
                  JPG格式，大小不超过1MB。*每次只能上传一张图片
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div style="width:100%;margin-bottom:20px;">
            <div
              style="overflow: hidden;position:relative;margin: auto;left:0;top: 0;width:172px;"
            >
              <el-button type="primary" @click="addAfterSale">
                上传
              </el-button>
              <el-button
                type="warning"
                @click="addAfterSaleSign = !addAfterSaleSign"
              >
                取消
              </el-button>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <div class="mt-5 mb-5">
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
            highlight-current-row
            border
            :default-sort="{ prop: 'aftersalenumber', order: 'ascending' }"
          >
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
              prop="aftersale_type"
              label="售后类型"
              align="center"
              sortable
            >
              <template slot-scope="{ row }">
                <span class="text-danger" v-if="row.aftersale_type === '损坏'">损坏</span>
                <span class="text-danger" v-if="row.aftersale_type === '丢失'">丢失</span>
                <span class="text-danger" v-if="row.aftersale_type === '其他'">其他</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="aftersale_title"
              label="售后标题"
              align="center"
              sortable
            >
              <template slot-scope="{ row }">
                <span>{{ row.aftersale_title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="aftersale_content"
              label="售后内容"
              align="center"
              sortable
            >
              <template slot-scope="{ row }">
                <span>{{ row.aftersale_content }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="aftersale_image"
              label="事故图片"
              align="center"
            >
              <template slot-scope="{ row }">
                <el-carousel
                  v-if="row.aftersale_image.length > 1"
                  height="150px"
                  indicator-position="none"
                >
                  <el-carousel-item
                    v-for="(object, index) in row.aftersale_image"
                    :key="index"
                  >
                    <img
                      :src="object.src"
                      class="img-fluid pointer"
                      @click="showMultiple(row, index)"
                    />
                  </el-carousel-item>
                </el-carousel>
                <el-image
                  v-else
                  class="img-fluid"
                  style="height:150px"
                  :src="row.aftersale_image[0].src"
                  :preview-src-list="[row.aftersale_image[0].src]"
                  fit="cover"
                ></el-image>

                <vue-easy-lightbox
                  :visible="lightboxVisible"
                  :imgs="img"
                  :index="index"
                  @hide="handleHide"
                ></vue-easy-lightbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="updatedAt"
              label="更新时间"
              align="center"
              sortabl
            >
              <template slot-scope="{ row }">
                {{
                  row.updatedAt
                    | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="compensation"
              label="解决方法及赔偿"
              fixed="right"
              align="center"
              width="260"
              sortable
            >
              <template slot-scope="{ row }">
                <div v-if="!row.solution">
                  <span class="text-warning">正在尽力解决中</span>
                  <p
                    class="mt-2"
                    style="cursor:pointer"
                    @click="dialogVisible = true"
                  >
                    <span><b>请点击添加客服微信 : </b> MUAMUAYVETTE<i class="fas fa-search ml-1"></i></span>
                  </p>
                </div>
                <div v-else>
                  <div class="row">
                    <div class="col-4 float-left">
                      <el-tag type="success"> 解决方法:</el-tag>
                    </div>
                    <div class="col-7">
                      <span class="float-left">{{ row.solution }}</span>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-4 float-left">
                      <el-tag type="warning"> 赔偿金额:</el-tag>
                    </div>
                    <div class="col-7">
                      <span class="float-left">{{ row.compensation }}</span>
                    </div>
                  </div>
                   <p
                    class="mt-2"
                    style="cursor:pointer"
                    @click="dialogVisible = true"
                  >
                    <span><b>如果不满意售后服务，可点击添加客服微信: </b> MUAMUAYVETTE<i class="fas fa-search ml-1"></i></span>
                  </p>
                  <div v-if="!row.is_solve" class="mt-3">
                    <el-button
                      type="primary"
                      @click="handleConfirmService(row.id)"
                      >同意</el-button
                    >
                  </div>
                  <div v-else class="mt-3 text-success">
                    售后服务已解决 <i class="el-icon-circle-check"></i>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :data="tableData"
            class="mt-5 float-right"
            @pagechange="pageChange"
            pager="prev, pager, next, jumper, ->, total, slot"
            limitNumber="5"
          />
        </div>
      </div>
      <el-dialog
        title="扫描添加客服微信"
        :visible.sync="dialogVisible"
        width="400px"
      >
        <img class="mx-auto d-block" src="/images/weixinCode.png" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  computed,
  reactive,
  ref,
  inject,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: {
    pagination,
  },

  setup(props, { root: { $store, $message } }) {

    
    const dialogVisible = ref(false);
    const loading = ref(false);
    //inject reload() to refresh component
    const toReload = inject("reload");

    onMounted(() => {
      $store.dispatch("getUserAfterSale", {
        page: 0,
        size: 5,
      });
      $store.dispatch("getOrderForm", {
        status: "已签收",
        page: 0,
        size: 10,
        status1: "已发货",
      });
      $store.dispatch("getUpToken");
    });

    //tableData for diaplay
    const afterSaleList = computed(() => {
      return $store.state.aftersalelist;
    });
    const tableData = computed(() => {
      return afterSaleList.value.map((object, index) => {
        return {
          aftersalenumber: index + 1,
          id: object._id,
          orderId: object.order_id,
          aftersale_type: object.aftersale_type,
          aftersale_title: object.aftersale_title,
          aftersale_content: object.aftersale_content,
          aftersale_image: object.aftersale_image.map((object) => {
            return { src: imageDomain + object };
          }),
          compensation: object.compensation,
          solution: object.solution,
          is_solve: object.is_solve,
          updatedAt: object.updatedAt,
        };
      });
    });
    //page change
    const pageChange = (val) => {
      $store.dispatch("getUserAfterSale", {
        page: val - 1,
        size: 5,
      });
    };
    //picture
    //picture display
    const lightboxVisible = ref(false);
    const index = ref(0);
    const img = ref("");
    //close signle image's lightbox
    const handleHide = () => {
      lightboxVisible.value = false;
    };
    //show single image's lightbox
    const showMultiple = (row, i) => {
      lightboxVisible.value = true;
      img.value = row.aftersale_image;
      index.value = i;
    };
    //upload pictures, accept picture array
    const imageUrl = ref([]);
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

    //getBase64 is used to convert an image to base64 encoded string
    // const getBase64 = (file) => {
    //   return new Promise(function(resolve, reject) {
    //     let reader = new FileReader();
    //     let imgResult = "";
    //     reader.readAsDataURL(file);
    //     reader.onload = function() {
    //       imgResult = reader.result;
    //     };
    //     reader.onerror = function(error) {
    //       reject(error);
    //     };
    //     reader.onloadend = function() {
    //       resolve(imgResult);
    //     };
    //   });
    // };

    //get the image by the image URL, and convert it to encoded string
    // const handleAvatarSuccess = (file) => {
    //   imageUrl.value = [URL.createObjectURL(file.file)];
    //   getBase64(file.file).then((res) => {
    //     ruleForm.aftersale_image.push(res);
    //   });
    // };

    const handleRemove = (file) => {
      let removeItemIndex = ruleForm.aftersale_image.indexOf(file.response.key);
      ruleForm.aftersale_image.splice(removeItemIndex, 1);
    };

    const handleAvatarSuccess = (file) => {
      $store.dispatch("getUpToken").then(() => {
        ruleForm.aftersale_image.push(file.key);
        imageUrl.value.push(file.key);
      });
    };

    //id list for user choosing adter sale order
    const orderIdList = computed(() => {
      return $store.state.selforderlist
        .filter((object) => object.is_aftersale === false)
        .map((object) => {
          return {
            id: object._id,
          };
        });
    });

    //add afater sale
    const ruleForm = reactive({
      order_id: "",
      aftersale_type: "损坏",
      aftersale_title: "",
      aftersale_content: "",
      aftersale_image: [],
    });
    const addAfterSaleSign = ref(false);
    const addAfterSale = () => {
      loading.value = true;
      if (
        ruleForm.order_id == "" ||
        ruleForm.aftersale_type == "" ||
        ruleForm.aftersale_title == "" ||
        ruleForm.aftersale_content == "" ||
        ruleForm.aftersale_image.length == 0
      ) {
        $message.error("请填写完整内容!");
        loading.value = false;
      } else {
        $store
          .dispatch("createAfterSale", ruleForm)
          .then(() => {
            $message.success("申请售后服务成功！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    //user operation to confirm service response
    const handleConfirmService = (id) => {
      $store
        .dispatch("conformAfterSale", id)
        .then(() => {
          $message.success("同意售后方案提交成功！");
          loading.value = false;
          toReload();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    return {
      loading,

      orderIdList,
      afterSaleList,
      tableData,

      lightboxVisible,
      img,
      index,
      showMultiple,
      handleHide,

      pageChange,

      addAfterSaleSign,
      ruleForm,
      addAfterSale,

      handleConfirmService,

      imageUrl,
      beforeAvatarUpload,
      handleRemove,
      handleAvatarSuccess,
      token,
      imageDomain,

      dialogVisible,
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

.el-upload__input {
  display: none !important;
}
.el-upload {
  width: 100% !important;
}
.el-upload-dragger {
  width: 100% !important;
}

.form {
  overflow: hidden;
  position: relative;
  width: 60%;
  margin: auto;
  left: 0;
  top: 0;
  min-width: 400px;
}
.input-width {
  width: calc(100%-100px);
}
.pointer {
  cursor: pointer;
}
</style>
