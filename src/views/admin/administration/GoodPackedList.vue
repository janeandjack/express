<template>
  <div class="mt-5">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="border el-breadcrumb-outer"
    >
      <el-breadcrumb-item class="mt-3 ml-3">所有商品</el-breadcrumb-item>
      <el-breadcrumb-item class="mt-3"
        ><span style="color:#f39c12;"><i class="fas fa-archive" /> 已打包</span>
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
    <el-table :data="allStockedGoods" class="borderRadius mt-5" border>
      <el-table-column prop="goodId" label="货物号" align="center" sortable>
        <template slot-scope="{ row }">
          {{ row.goodId.substr(-10) }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="会员名称" align="center" sortable>
        <template slot-scope="{ row }">
          {{ row.username }}
        </template>
      </el-table-column>
      <el-table-column prop="goodName" label="货物名称" align="center" sortable>
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
        label="货物长度(cm)"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="goodSize_width"
        label="货物宽度(cm)"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="goodSize_height"
        label="货物高度(cm)"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="goodWeight"
        label="货物重量kg"
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
            :src="row.goodImg"
            fit="fill"
            :preview-src-list="[row.goodImg]"
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
          <span class="text-success">{{ row.goodStatus }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :data="allStockedGoods"
      class="mt-5 mb-5 float-right"
      @pagechange="pageChange"
      pager="prev, pager, next, jumper, ->, total, slot"
      limitNumber="5"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  name: "stockpendinglist",
  components: {
    pagination,
  },

  setup(props, { root: { $store } }) {
    onMounted(() => {
      $store.dispatch("getAllGoods", {
        status: "已打包",
        page: "0",
        size: "5",
      });
    });
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
          goodImg: imageDomain + object.goodImg,
          goodSize_height: object.goodSize_height,
          goodSize_length: object.goodSize_length,
          goodSize_width: object.goodSize_width,
          goodType: object.goodType,
          goodWeight: object.goodWeight,
          updatedAt: object.updatedAt,
          isStorage: object.isStorage,
          username: object.username,
        };
      });
    });

    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "已打包",
        page: "0",
        size: "5",
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
          status: "已打包",
          page: val - 1,
          size: "5",
        });
      } else {
        $store
          .dispatch("searchGoods", {
            keyword: { searchString: keyWord.value },
            status: "已打包",
            page: val - 1,
            size: "5",
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    return {
      keyWord,
      handleQuery,
      pageChange,

      allStockedGoods,
      allGoods,
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
</style>
