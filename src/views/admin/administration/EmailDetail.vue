<template>
  <div>
    <div v-if="!role">
      <Page401 />
    </div>
    <div
      class="emailContainer"
      v-if="role"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <h3 class="text-center mt-3 pb-4">修改邮件 & 公告</h3>
      <el-form ref="postForm" :model="postForm" class="row">
        <el-form-item label-width="90px" label="标题:" class="col-6">
          <el-input v-model="postForm.title" name="title" required></el-input>
        </el-form-item>

        <el-form-item label-width="90px" label="重要性:" class="col-3">
          <el-rate
            v-model="postForm.importance"
            :max="3"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :low-threshold="1"
            :high-threshold="3"
            style="display:inline-block"
          />
        </el-form-item>
        <el-form-item label-width="90px" label="类型:" class="col-3">
          <el-select v-model="postForm.type" placeholder="请选择">
            <el-option label="邮件" value="邮件"></el-option>
            <el-option label="公告" value="公告"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="90px" label="简介:" class="col-12">
          <el-input
            v-model="postForm.summary"
            name="summary"
            required
          ></el-input>
        </el-form-item>

        <el-form-item class="col-12" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item class="col-12">
          <el-button
            class="float-right mr-2"
            type="warning"
            @click.native="$router.push('/dashboard/emaillist')"
            >返 回
          </el-button>
          <el-button
            class="float-right mr-2"
            type="primary"
            @click.native="updateEmail"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import Page401 from "@/components/401";
export default {
  components: { Tinymce, Page401 },
  data() {
    return {
      // postForm: Object.assign({}, this.defaultForm),
      loading: false,
    };
  },
  computed: {
    postForm: function() {
      return this.$store.state.emailTemplateData;
    },
    role: function() {
      if (this.$store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    updateEmail() {
      this.loading = true;
      this.$store
        .dispatch("updateEmailTemplate", this.postForm)
        .then(() => {
          this.$message.success("修改成功！");
          this.$emit("closeDialog");
          this.loading = false;
          this.$router.push("/dashboard/emaillist");
        })
        .catch(() => {
          this.$message.error("修改失败！");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.emailContainer {
  width: 95%;
  margin: 0 auto;
  h3 {
    span {
      font-size: 18px;
      color: #000000;
    }
  }
  .emailDisplay {
    font-size: 16px;
  }
}
</style>
