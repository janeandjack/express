<template>
  <el-dialog
    title="请更新头像"
    :visible.sync="visible"
    width="300px"
    :before-close="closeDialog"
  >
    <el-upload
      class="avatar-uploader"
      action="https://upload-z2.qiniup.com"
      :data="token"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div class="el-upload__tip" slot="tip">
        *上传照片只支持PNG，GIF，JPEG 和 JPG格式，大小不超过1MB。
      </div>
    </el-upload>
    <span slot="footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click.enter="uploadAvatar">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { ref, computed, inject } from "@vue/composition-api";
import { imageDomain } from "@/MainAPI.js";
export default {
  setup(props, { root: { $store, $message } }) {
    const imageUrl = ref("");
    const imageData = ref("");

    //inject reload() to refresh component
    const toReload = inject("reload");

    const visible = computed(() => {
      return $store.state.dialogVisible;
    });

    const token = computed(() => {
      return $store.state.token;
    });

    //Before uploading avatar, verify the format and size.
    const beforeAvatarUpload = (file) => {
      $store.dispatch("getUpToken")
      let sign = true;
      const imgAccept = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (imgAccept.indexOf(file.type) == -1) {
        $message.error("文件格式应是图片！");
        sign = false;
      } else if (!isLt1M) {
        $message.error("图片大小超过1MB了！");
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
    const handleAvatarSuccess = (file) => {
      $store.dispatch("getUpToken").then(() => {
        imageData.value = file.key;
        imageUrl.value = imageDomain + file.key;
      });
      // imageUrl.value = URL.createObjectURL(file.file);
      // getBase64(file.file).then((res) => {
      //   imageData.value = res;
      // });
    };
    //When submit/update button is clicked, save the image into database
    const uploadAvatar = () => {
      let data = {
        avatar: imageData.value,
      };
      $store
        .dispatch("avatarUpload", data)
        .then(() => {
          $message.success("头像上传成功！");
          $store.commit("openDialog", false);
          toReload();
        })
        .catch(() => {});
    };
    //Close the dialog
    const closeDialog = () => {
      $store.commit("openDialog", false);
    };
    return {
      imageUrl,
      beforeAvatarUpload,
      handleAvatarSuccess,
      uploadAvatar,
      closeDialog,

      visible,

      token,
    };
  },
};
</script>

<style lang="scss">
.el-upload {
  width: 100% !important;
}
.el-upload__input {
  display: none !important;
}
.avatar-uploader {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 80px;
  margin-top: 30px;
  margin-bottom: 70px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-left: 40px;
}
</style>
