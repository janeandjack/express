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
            <span class="mb-3">会员信息</span>
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
      <div>
        <div class="row mt-3" style="margin-left:0px;width:100%">
          <el-card
            class="box-card col-lg-4 col-md-4 col-xs-12 text-center mt-2"
            shadow="hover"
          >
            <div class="text-info">
              所有人数: {{ allUserNumber.UserNumber }}
            </div>
          </el-card>
          <el-card
            class="box-card col-lg-4 col-md-4 col-xs-12 text-center mt-2"
            shadow="hover"
          >
            <div class="text-info">
              普通会员人数: {{ allUserNumber.normalUserNumber }}
            </div>
          </el-card>
          <el-card
            class="box-card col-lg-4 col-md-4 col-xs-12 text-center mt-2"
            shadow="hover"
          >
            <div class="text-info">
              管理员人数: {{ allUserNumber.adminUserNumber }}
            </div>
          </el-card>
        </div>

        <el-table
          :data="tableData"
          class="borderRadius mt-4"
          highlight-current-row
          border
        >
          <el-table-column
            prop="user_id"
            label="用户号"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.user_id.substr(-10) }}</span>
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
            prop="birthday"
            label="出生日期"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.birthday | moment("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="性别" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.gender }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="联系电话"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.phoneNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="weixin" label="微信" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.weixin }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qq" label="QQ" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.qq }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="balance"
            label="用户余额"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-danger">{{ row.balance }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="level"
            label="用户等级"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.level }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="开户时间"
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
            prop="last_login_time"
            label="上次登录时间"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{
                row.last_login_time
                  | moment("timezone", "Asia/Shanghai", "YYYY-MM-DD HH:mm:ss")
              }}
            </template>
          </el-table-column>
        </el-table>
        <pagination
          class="mt-5 float-right"
          :data="allUserInfo"
          @pagechange="pageChange"
          pager="prev, pager, next, jumper, ->, total, slot"
          limitNumber="10"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Page401 from "@/components/401";
import { computed, onMounted, ref } from "@vue/composition-api";
import pagination from "../components/InfoPagination";
export default {
  components: { Page401, pagination },
  setup(props, { root: { $store } }) {
    onMounted(() => {
      $store.dispatch("getAllUser", {
        page: 0,
        size: 10,
      });
      $store.dispatch("getUserNumber");
    });

    const allUserInfo = computed(() => {
      return $store.state.allUser;
    });

    const allUserNumber = computed(() => {
      return $store.state.userNumber;
    });

    const role = computed(() => {
      if ($store.state.role === "Admin/管理员") {
        return true;
      } else {
        return false;
      }
    });

    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        page: 0,
        size: 10,
      };
      $store
        .dispatch("searchUser", data)
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
        data = allUserInfo.value;
      }
      return data;
    });

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAllUser", {
          page: val - 1,
          size: 10,
        });
      } else {
        $store
          .dispatch("searchUser", {
            keyword: { searchString: keyWord.value },
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
      role,

      allUserInfo,
      pageChange,
      allUserNumber,

      tableData,
      keyWord,
      handleQuery,
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
</style>
