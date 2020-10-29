<template>
  <div>
    <div v-if="!role">
      <Page401 />
    </div>
    <div v-if="role">
      <div>
        <div>
          <div
            class="border pt-2 pb-2 pl-3"
            style="font-size:18px;background-color:#F0F3F4;border-radius:3px;"
          >
            <span class="mb-3">投诉与建议</span>
            <div class="float-right mr-3">
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
          </div>
        </div>
      </div>
      <div class="mt-5 mb-5" v-loading="!tableData">
        <el-table
          v-loading="!tableData"
          :data="tableData"
          class="borderRadius"
          highlight-current-row
          border
        >
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
            prop="email"
            label="用户邮箱"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="advice_type"
            label="类型"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-danger" v-if="row.advice_type === '投诉'">投诉</span>
              <span class="text-danger" v-if="row.advice_type === '建议'">建议</span>
              <span class="text-danger" v-if="row.advice_type === '其他'">其他</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="advice_title"
            label="标题"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{ row.advice_title }}
            </template>
          </el-table-column>
          <el-table-column
            prop="advice_content"
            label="内容"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{ row.advice_content }}
            </template>
          </el-table-column>
          <el-table-column prop="evident_image" label="投诉图片" align="center">
            <template slot-scope="{ row }">
              <div>
                <el-carousel v-if="row.evident_image.length > 1"  indicator-position="none" height="150px">
                  <el-carousel-item
                    v-for="(object, index) in row.evident_image"
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
                  v-else-if="row.evident_image.length === 1"
                  class="img-fluid"
                  style="height:150px"
                  :src="row.evident_image[0].src"
                  :preview-src-list="[row.evident_image[0].src]"
                  fit="cover"
                ></el-image>
                <span v-else>暂无图片</span>
                <vue-easy-lightbox
                  :visible="lightboxVisible"
                  :imgs="img"
                  :index="index"
                  @hide="handleHide"
                ></vue-easy-lightbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="adviceOperator"
            label="操作人员"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.adviceOperator" class="text-danger">{{
                row.adviceOperator
              }}</span>
              <span v-else class="text-info">无操作人员</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作/回复" width="200">
            <template slot-scope="{ row }">
              <div v-if="row.advice_improvement">
                <div class="row">
                  <div class="col-3"><el-tag type="success">回复:</el-tag></div>
                  <div class="col-9">{{ row.advice_improvement }}</div>
                </div>
                <div class="mt-3">
                  <el-button
                    type="warning"
                    icon="el-icon-sort"
                    @click="handleUpdate(row)"
                    >修改</el-button
                  >
                </div>
              </div>
              <div v-else>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="lockRowAdvice(row)"
                >
                  回复
                </el-button>
              </div>
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
        <el-dialog
          title="请填写对本次投诉或建议的改进"
          :visible.sync="improvementSign"
          width="400px"
          center
          v-loading="loading"
        >
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入"
            v-model="advice_improvement"
          >
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="improvementSign = false">取消</el-button>
            <el-button v-if="!advice_improvement" type="primary" disabled
              >确定</el-button
            >
            <el-button v-else type="primary" @click="handleAdviceImprovement"
              >确定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Page401 from "@/components/401";
import { computed, onMounted, ref, inject } from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: { Page401, pagination },
  setup(props, { root: { $store, $message } }) {
    onMounted(() => {
      $store.dispatch("getAdminAdvice", {
        page: "0",
        size: 5,
      });
    });
    const loading = ref(false);

    //inject reload() to refresh component
    const toReload = inject("reload");

    const allAdviceList = computed(() => {
      return $store.state.allAdminAdvice;
    });

    const tableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = allAdviceList.value;
      }
      return data.map((object) => {
        return {
          updatedAt: object.updatedAt,
          email: object.email,
          advice_type: object.advice_type,
          advice_title: object.advice_title,
          advice_content: object.advice_content,
          evident_image: object.evident_image.map((object) => {
            return {
              src: imageDomain + object,
            };
          }),
          advice_improvement: object.advice_improvement,
          _id: object._id,
          adviceOperator: object.adviceOperator,
        };
      });
    });

    const role = computed(() => {
      if ($store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    });

    const improvementSign = ref(false);
    const advice_improvement = ref("");
    const advice_id = ref("");

    const lockRowAdvice = (row) => {
      improvementSign.value = true;
      advice_id.value = row._id;
    };

    const handleAdviceImprovement = () => {
      let data = {
        adviceId: advice_id.value,
        advice_improvement: advice_improvement.value,
        adviceOperator: $store.state.userSelf.username,
      };
      if (data.advice_improvement === "") {
        $message.error("请填写回复信息！");
      } else {
        loading.value = true;
        $store
          .dispatch("updateAdvice", data)
          .then(() => {
            $message.success("投诉建议回复成功！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    const lightboxVisible = ref(false);
    const index = ref(0);
    const img = ref("");
    //close image's lightbox
    const handleHide = () => {
      lightboxVisible.value = false;
    };
    //show image's lightbox
    const showMultiple = (row, i) => {
      lightboxVisible.value = true;
      img.value = row.evident_image;
      index.value = i;
    };

    const keyWord = ref("");
    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        page: "0",
        size: 5,
      };
      $store
        .dispatch("searchAdminAdvice", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };
    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAdminAdvice", {
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchAdminAdvice", {
            keyword: { searchString: keyWord.value },
            page: val - 1,
            size: 5,
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    const handleUpdate = (row) => {
      improvementSign.value = true;
      advice_id.value = row._id;
      advice_improvement.value = row.advice_improvement;
    };

    return {
      loading,
      role,
      pageChange,

      tableData,
      lockRowAdvice,
      improvementSign,
      advice_improvement,

      handleAdviceImprovement,

      lightboxVisible,
      img,
      index,
      showMultiple,
      handleHide,

      keyWord,
      handleQuery,
      handleUpdate,
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
.bottom-margin {
  margin-bottom: 120px;
}
.pointer {
  cursor: pointer;
}
</style>
