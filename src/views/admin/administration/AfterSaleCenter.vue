<template>
  <div>
    <div v-if="!role">
      <Page401 />
    </div>
    <div v-if="role">
      <div>
        <div
          class="border pt-2 pb-2 pl-3"
          style="font-size:18px;background-color:#F0F3F4;border-radius:3px;"
        >
          <span class="mb-3">售后统计</span>
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
    <div class="mt-5 mb-5">
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
        <el-table-column prop="email" label="用户邮箱" align="center" sortable>
          <template slot-scope="{ row }">
            <span>{{ row.email }}</span>
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
          label="标题"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            {{ row.aftersale_title }}
          </template>
        </el-table-column>
        <el-table-column
          prop="aftersale_content"
          label="内容"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            {{ row.aftersale_content }}
          </template>
        </el-table-column>
        <el-table-column prop="aftersale_image" label="投诉图片" align="center">
          <template slot-scope="{ row }">
            <el-carousel height="150px" v-if="row.aftersale_image.length > 1" indicator-position="none">
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
            >
            </vue-easy-lightbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="发表时间"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            {{
              row.createdAt
                | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="aftersaleOperator"
          label="操作人员"
          align="center"
          sortable
        >
          <template slot-scope="{ row }">
            <span v-if="row.aftersaleOperator" class="text-danger">{{
              row.aftersaleOperator
            }}</span>
            <span v-else class="text-info">无操作人员</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="compensation"
          align="center"
          label="操作/回馈"
          width="250"
          sortable
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="!row.compensation"
              type="primary"
              icon="el-icon-edit"
              @click="lockRowAfterSale(row)"
            >
              反馈
            </el-button>
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
              <div v-if="!row.is_solve" class="mt-3">
                <el-button type="primary" @click="handleUpdate(row)"
                  >修改</el-button
                >
                <p class="mt-2">
                  <span class="text-danger">
                    等待客户确认中 <i class="el-icon-info"></i>
                  </span>
                </p>
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

      <el-dialog
        title="请填写解决办法和赔付金额"
        :visible.sync="improvementSign"
        width="400px"
        center
        v-loading="loading"
      >
        <el-form
          ref="afterSaleForm"
          :model="afterSaleForm"
          label-width="90px"
          label-position="left"
        >
          <el-form-item label="解决办法:">
            <el-input
              type="textarea"
              rows="4"
              v-model="afterSaleForm.solution"
            ></el-input>
          </el-form-item>
          <el-form-item label="赔偿金额:">
            <el-input v-model="afterSaleForm.compensation"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="improvementSign = false">取消</el-button>
          <el-button
            v-if="
              afterSaleForm.solution === '' || afterSaleForm.compensation === ''
            "
            type="primary"
            disabled=""
            >确定</el-button
          >
          <el-button v-else type="primary" @click="handleAdviceImprovement"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page401 from "@/components/401";
import {
  onMounted,
  inject,
  computed,
  ref,
  reactive,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: { Page401, pagination },
  setup(props, { root: { $store, $message } }) {
    onMounted(() => {
      $store.dispatch("getAdminAfterSale", {
        page: 0,
        size: 5,
      });
    });
    const loading = ref(false);

    //inject reload() to refresh component
    const toReload = inject("reload");

    const allAfterSaleList = computed(() => {
      return $store.state.allAdminAfterSale;
    });

    const role = computed(() => {
      if ($store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    });

    const improvementSign = ref(false);
    const afterSaleForm = reactive({
      afterSaleId: "",
      solution: "",
      compensation: "0",
      order_id: "",
      aftersaleOperator: $store.state.userSelf.username,
    });

    const lockRowAfterSale = (row) => {
      improvementSign.value = true;
      afterSaleForm.afterSaleId = row._id;
      afterSaleForm.order_id = row.order_id;
    };

    const handleAdviceImprovement = () => {
      if (afterSaleForm.solution === "") {
        $message.error("请填写解决办法！");
      } else {
        loading.value = true;
        $store
          .dispatch("solveAfterSale", afterSaleForm)
          .then(() => {
            $message.success("售后回复成功！");
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
    //image's lightbox
    const showMultiple = (row, i) => {
      lightboxVisible.value = true;
      img.value = row.aftersale_image;
      index.value = i;
    };

    const keyWord = ref("");
    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        page: 0,
        size: 5,
      };
      $store
        .dispatch("searchAdminAfterSale", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };

    const tableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = allAfterSaleList.value;
      }
      return data.map((object) => {
        return {
          _id: object._id,
          updatedAt: object.updatedAt,
          email: object.email,
          aftersale_type: object.aftersale_type,
          aftersale_title: object.aftersale_title,
          aftersale_content: object.aftersale_content,
          aftersale_image: object.aftersale_image.map((object) => {
            return {
              src: imageDomain + object,
            };
          }),
          createdAt: object.createdAt,
          compensation: object.compensation,
          solution: object.solution,
          is_solve: object.is_solve,
          order_id: object.order_id,
          aftersaleOperator: object.aftersaleOperator,
        };
      });
    });

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAdminAfterSale", {
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchAdminAfterSale", {
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
      afterSaleForm.afterSaleId = row._id;
      afterSaleForm.solution = row.solution;
      afterSaleForm.compensation = row.compensation;
      afterSaleForm.order_id = row.order_id;
    };

    return {
      keyWord,
      handleQuery,
      tableData,
      pageChange,

      loading,
      role,

      allAfterSaleList,
      lockRowAfterSale,
      improvementSign,
      afterSaleForm,

      handleAdviceImprovement,

      lightboxVisible,
      img,
      index,
      showMultiple,
      handleHide,
      handleUpdate,

      imageDomain,
    };
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
