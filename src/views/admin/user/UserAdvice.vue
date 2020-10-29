<template>
  <div class="ml-4 mb-5">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">投诉与建议</el-breadcrumb-item>
         <el-button
            v-if="addAdviceSign === false"
            type="primary"
            @click="switchAddAdvice"
            class="float-right mr-3"
            style="margin-top:5px;"
          >
            填写建议
            <i class="el-icon-warning fa-lg"></i>
          </el-button>
      </el-breadcrumb>

      <el-collapse-transition>
        <div class="mt-5" v-if="addAdviceSign === true" v-loading="loading">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="100px"
            class="demo-ruleForm form"
          >
            <el-form-item label="投诉类型" prop="adviceType">
              <el-radio-group v-model="ruleForm.adviceType">
                <el-radio label="投诉">投诉</el-radio>
                <el-radio label="建议">建议</el-radio>
                <el-radio label="其他">其他</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="投诉标题" prop="adviceTitle">
              <el-input
                class="input-width"
                v-model="ruleForm.adviceTitle"
              ></el-input>
            </el-form-item>
            <el-form-item label="投诉内容" prop="adviceContent">
              <el-input
                class="input-width"
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model="ruleForm.adviceContent"
              ></el-input>
            </el-form-item>
            <el-form-item label="投诉照片" prop="evidentPicture">
              <el-upload
                drag
                action="https://upload-z2.qiniup.com"
                :data="token"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
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
              <el-button type="primary" @click="addAdvice">
                上传
              </el-button>
              <el-button type="warning" @click="switchAddAdvice">
                取消
              </el-button>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <div class="mt-5">
        <el-table
          :data="tableData"
          class="borderRadius"
          highlight-current-row
          border
          :default-sort="{ prop: 'adviceDate', order: 'descending' }"
        >
          <el-table-column
            fixed
            prop="adviceDate"
            label="投诉时间"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{
                row.adviceDate
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="adviceType"
            label="投诉类型"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-danger" v-if="row.adviceType === '投诉'">投诉</span>
              <span class="text-danger" v-if="row.adviceType === '建议'">建议</span>
              <span class="text-danger" v-if="row.adviceType === '其他'">其他</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="adviceTitle"
            label="投诉标题"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.adviceTitle }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="adviceContent"
            label="投诉详细内容"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.adviceContent }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="picture"
            label="证据照片"
            align="center"
            width="360"
          >
            <template slot-scope="{ row }">
              <el-carousel v-if="row.picture.length > 1" indicator-position="none" height="150px">
                <el-carousel-item
                  v-for="(object, index) in row.picture"
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
                class="img-fluid"
                style="height:150px"
                v-else-if="row.picture.length === 1"
                :src="row.picture[0].src"
                :preview-src-list="[row.picture[0].src]"
                fit="cover"
              ></el-image>
              <span v-else>暂无图片</span>
              <vue-easy-lightbox
                :visible="lightboxVisible"
                :imgs="img"
                :index="index"
                @hide="handleHide"
              ></vue-easy-lightbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="adviceImprovement"
            label="改善办法"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-success" v-if="row.adviceImprovement">{{
                row.adviceImprovement
              }}</span>
              <span class="text-danger" v-else>客服正在处理中 敬请期待</span>
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
  </div>
</template>

<script>
import {
  ref,
  reactive,
  inject,
  onMounted,
  computed,
} from "@vue/composition-api";
import { imageDomain } from "@/MainAPI.js";
import pagination from "../components/InfoPagination";

export default {
  components: {
    pagination,
  },
  setup(props, { root: { $store, $message } }) {
    onMounted(() => {
      $store.dispatch("getUserAdvice", {
        page: "0",
        size: "5",
      });
      $store.dispatch("getUpToken");
    });
    const loading = ref(false);
    const adviceList = computed(() => {
      return $store.state.advicelist;
    });

    const toReload = inject("reload");
    const addAdviceSign = ref(false);

    const imageUrl = ref([]);

    const switchAddAdvice = () => {
      addAdviceSign.value = !addAdviceSign.value;
    };

    const ruleForm = reactive({
      adviceType: "orderComplaint",
      adviceTitle: "",
      adviceContent: "",
      evidentPicture: [],
    });

    const addAdvice = () => {
      let data = {
        advice_type: ruleForm.adviceType,
        advice_title: ruleForm.adviceTitle,
        advice_content: ruleForm.adviceContent,
        evident_image: ruleForm.evidentPicture,
      };

      if (data.advice_title === "") {
        $message.error("请填写投诉信息的标题");
      } else if (data.advice_content === "") {
        $message.error("请填写投诉信息的内容");
      } else if (data.evident_image.length === 0) {
        $message.error("请上传货物的事故照片");
      } else {
        loading.value = true;
        $store
          .dispatch("createAdvice", data)
          .then(() => {
            $message.success("投诉提交成功！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    const tableData = computed(() => {
      return adviceList.value.map((object) => {
        return {
          adviceDate: object.createdAt,
          adviceType: object.advice_type,
          picture: object.evident_image.map((object) => {
            return {
              src: imageDomain + object,
            };
          }),
          // picture: [
          //   {src:"https://cdn.pixabay.com/photo/2020/03/31/07/56/face-mask-4986596_1280.jpg"},
          //   {src:"https://cdn.pixabay.com/photo/2020/04/09/19/27/cherry-blossom-5022811_1280.jpg"},
          // ],
          adviceTitle: object.advice_title,
          adviceContent: object.advice_content,
          adviceImprovement: object.advice_improvement,
        };
      });
    });

    const rules = reactive({
      adviceType: [
        { required: true, message: "请输入投诉类型", trigger: "blur" },
      ],
      adviceTitle: [
        { required: true, message: "请输入投诉标题", trigger: "blur" },
      ],
      adviceContent: [
        { required: true, message: "请输入具体投诉内容", trigger: "blur" },
      ],
      evidentPicture: [
        { required: true, message: "请选择问题照片", trigger: "blur" },
      ],
    });

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
    //     ruleForm.evidentPicture = res;
    //   });
    // };
    const handleRemove = (file) => {
      let removeItemIndex = ruleForm.evidentPicture.indexOf(file.response.key);
      ruleForm.evidentPicture.splice(removeItemIndex, 1);
    };
    const handleAvatarSuccess = (file) => {
      $store.dispatch("getUpToken").then(() => {
        ruleForm.evidentPicture.push(file.key);
        imageUrl.value.push(file.key);
      });
    };

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
      img.value = row.picture;
      index.value = i;
    };

    const pageChange = (val) => {
      $store.dispatch("getUserAdvice", {
        page: val - 1,
        size: 5,
      });
    };

    return {
      loading,
      addAdviceSign,
      switchAddAdvice,
      addAdvice,

      tableData,
      adviceList,
      pageChange,

      ruleForm,
      rules,

      imageUrl,
      beforeAvatarUpload,
      handleAvatarSuccess,
      handleRemove,

      lightboxVisible,
      img,
      index,
      showMultiple,
      handleHide,
      token,
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
}
.input-width {
  width: calc(100%-100px);
}
.pointer {
  cursor: pointer;
}
</style>
