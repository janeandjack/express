<template>
  <div class="mt-5 ml-4">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">订单详情</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"
            ><i class="fas fa-people-carry" /> 待发货</span
          >
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
      <div class="mt-5">
        <el-table
          :data="tableData"
          class="borderRadius"
          highlight-current-row
          border
        >
          <el-table-column
            prop="orderId"
            label="订单号码"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderId.substr(-10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shippingCountry"
            label="运至国家"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.shippingCountry }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="picture" label="包裹图片" align="center">
            <template slot-scope="{ row }">
              <el-image
                :src="row.picture"
                :preview-src-list="[row.picture]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderGoodsList"
            label="订单详情"
            align="center"
            width="160"
          >
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.orderGoodsList" :key="index" class="border-bottom">
                <div>
                  货物名称:{{ item.goodName }}
                </div>
                <div>
                  货物数量:{{ item.goodNumber }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="weight"
            label="重量(kg)"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.weight }}</span>
            </template>
          </el-table-column>
          <el-table-column label="尺寸(cm)" align="center">
            <template slot-scope="{ row }">
              <div>长: {{ row.orderLength }}</div>
              <div>宽: {{ row.orderWidth }}</div>
              <div>高: {{ row.orderHeight }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类别" align="center" sortable>
            <template slot-scope="{ row }">
              <span v-if="row.type === 0">粉末货物</span>
              <span v-if="row.type === 1">液体货物</span>
              <span v-if="row.type === 2">食品货物</span>
              <span v-if="row.type === 3">敏感类</span>
              <span v-if="row.type === 4">普通货物</span>
              <span v-if="row.type === 5">体积货物</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="position"
            label="包裹位置"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              {{ row.position }}
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
            prop="orderstatus"
            label="订单状态"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-danger">{{ row.orderstatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收件地址" width="150">
            <template slot-scope="{ row }">
              <div>省份: {{ row.shippingProvince }}</div>
              <div>城市: {{ row.shippingCity }}</div>
              <div>地址: {{ row.shippingAddress }}</div>
              <div>邮编: {{ row.shippingPostcode }}</div>
              <div>联系人: {{ row.shippingRecevier }}</div>
              <div>联系电话: {{ row.shippingPhone }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="chosenExpress"
            label="渠道选择"
            width="150"
            fixed="right"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <p>快递：{{ row.chosenExpress }}</p>
              <p>价格：{{ row.chosenExpressPrice }}</p>
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
import { computed, onMounted, ref } from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: {
    pagination,
  },
  setup(props, { root: { $store } }) {
    onMounted(() => {
      $store.dispatch("getOrderForm", {
        status: "待发货",
        page: 0,
        size: 5,
      });
      $store.dispatch("getUserInfo");
    });

    //data for diaplay
    const selfOrderList = computed(() => {
      return $store.state.selforderlist;
    });
    const keyWord = ref("");
    const returnData = ref([]);
    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "待发货",
        page: 0,
        size: 5,
      };
      $store
        .dispatch("searchOrdersForUser", data)
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
        data = selfOrderList.value;
      }
      return data.map((object) => {
        return {
          updatedAt: object.updatedAt,
          orderId: object._id,
          picture: imageDomain + object.orderImg,
          weight: object.orderWeight,
          orderLength: object.orderSize_length,
          orderWidth: object.orderSize_width,
          orderHeight: object.orderSize_height,
          type: object.orderType,
          position: object.packageLocation,
          shippingCountry: object.shippingCountry,
          shippingProvince: object.shippingProvince,
          shippingCity: object.shippingCity,
          shippingPostcode: object.shippingPostcode,
          shippingAddress: object.shippingAddress,
          shippingRecevier: object.shippingRecevier,
          shippingPhone: object.shippingPhone,
          chosenExpress: object.orderExpressRetail,
          chosenExpressPrice: object.incomePrice,
          orderstatus: object.orderStatus,
          orderGoodsList: object.orderGoodsList,
        };
      });
    });

    //page change pagination
    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getOrderForm", {
          status: "待发货",
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchOrdersForUser", {
            keyword: { searchString: keyWord.value },
            status: "待发货",
            page: val - 1,
            size: 5,
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    return {
      selfOrderList,
      keyWord,
      handleQuery,
      tableData,
      pageChange,
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
