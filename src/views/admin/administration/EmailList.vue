<template>
  <div>
    <div v-if="!role">
      <Page401 />
    </div>
    <div class="app-container" v-if="role">
      <h3 class="text-center mt-3 pb-4">邮件 & 公告列表</h3>
      <el-table
        :data="allEmailTemplate"
        border
        fit
        highlight-current-row
        style="width: 98%;margin:0 auto;"
        v-loading="loading"
      >
        <el-table-column
          prop="_id"
          align="center"
          label="ID"
          width="200px"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row._id.substr(-10) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="title"
          width="280px"
          align="center"
          label="标题"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="type"
          width="120px"
          align="center"
          label="类型"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="summary" align="center" label="简介" sortable>
          <template slot-scope="scope">
            <span v-html="scope.row.summary"></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="importance"
          width="120px"
          align="center"
          label="重要性"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.importance }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="createdAt"
          width="120px"
          align="center"
          label="发布时间"
          sortable
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.createdAt
                | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click.native="openDetailPage(scope.row._id)"
            >
              Edit
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click.native="deleteAnnouncement(scope.row._id)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :data="allEmailTemplate"
      class="mt-5 mb-5 float-right"
      @pagechange="pageChange"
      pager="prev, pager, next, jumper, ->, total, slot"
      limitNumber="10"
    />
  </div>
</template>

<script>
import Page401 from "@/components/401";
import pagination from "../components/InfoPagination";
export default {
  inject: ["reload"],
  components: {
    Page401,
    pagination
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.$store.dispatch("getEmailTemplate", { page: 0, size: 10 });
  },
  computed: {
    allEmailTemplate: function() {
      return this.$store.state.allEmailTemplate;
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
    openDetailPage(id) {
      this.loading = true;
      this.$store.dispatch("getAEmailTemplate", id).then(() => {
        this.$router.push(`emailDteail/${id}`);
        this.loading = false;
      });
    },
    deleteAnnouncement(id) {
      this.$confirm("确定删除此公告？", "提示", {
        confirmButtonText: this.$t("lang.confirmButton"),
        cancelButtonText: this.$t("lang.cancleButton"),
        type: "warning",
      }).then(() => {
        this.$store.dispatch("deleteEmailTemplate", id).then(() => {
          this.reload();
          this.$message.success("删除成功");
        });
      });
    },
    pageChange(val) {
        this.$store.dispatch("getEmailTemplate", { page: val-1, size: 10 })
    },
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
