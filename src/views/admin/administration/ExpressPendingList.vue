<template>
  <div class="mt-5">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="border el-breadcrumb-outer"
      >
        <el-breadcrumb-item class="mt-3 ml-3">所有订单</el-breadcrumb-item>
        <el-breadcrumb-item class="mt-3"
          ><span style="color:#f39c12;"><i class="fas fa-box" /> 待寄出</span>
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
          <el-table-column prop="id" label="订单号" align="center" sortable>
            <template slot-scope="{ row }">
              <span>{{ row.id.substr(-10) }}</span>
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
            prop="orderExpressRetail"
            label="快递信息"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.orderExpressRetail }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="packageLocation"
            label="订单位置"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.packageLocation }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderDetail"
            label="订单详情"
            align="center"
            width="160"
          >
            <template slot-scope="{ row }">
              <div v-for="(orderGoods, index) in row.orderDetail" :key="index" class="border-bottom">
                <div>货物名称:{{ orderGoods.goodName }}</div>
                <div>货物数量:{{ orderGoods.goodNumber }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="订单类型"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.orderType === 0">粉末货物</span>
              <span v-if="row.orderType === 1">液体货物</span>
              <span v-if="row.orderType === 2">食品货物</span>
              <span v-if="row.orderType === 3">敏感类</span>
              <span v-if="row.orderType === 4">普通货物</span>
              <span v-if="row.orderType === 5">体积货物</span>
              <span v-if="row.orderType === 6">仿牌</span>
              <span v-if="row.orderType === 7">木制品</span>
              <span v-if="row.orderType === 8">电池</span>
              <span v-if="row.orderType === 9">内置电</span>
              <span v-if="row.orderType === 10">违禁品</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="shippingCountry"
            label="运送国家"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.shippingCountry }}</span>
            </template>
          </el-table-column>
          <el-table-column label="寄送地址" width="150">
            <template slot-scope="{ row }">
              <div>地址: {{ row.shippingAddress }}</div>
              <div>城市: {{ row.shippingCity }}</div>
              <div>省份: {{ row.shippingProvince }}</div>
              <div>邮编: {{ row.shippingPostcode }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="shippingContact"
            label="联系方式"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.shippingContact }}</span>
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
            prop="orderStatus"
            label="订单状态"
            align="center"
            sortable
          >
            <template slot-scope="{ row }">
              <span class="text-danger">{{ row.orderStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="150"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <el-button type="primary" @click="handleUpdate(row)">
                填写邮寄信息
              </el-button>
              <br />
              <el-button
                class="mt-2"
                type="primary"
                @click="invoiceUpdate(row)"
              >
                生成订单发票
              </el-button>
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
      <el-dialog
        title="温馨提示"
        :visible.sync="editDialogVisible"
        width="400px"
        center
        v-loading="loading"
      >
        <el-form
          :model="handleOrderForm"
          label-position="left"
          label-width="120px"
        >
          <el-form-item label="*快递查询号码:">
            <el-input
              v-model="handleOrderForm.orderShippingNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="*成本费用:">
            <el-input
              v-model="handleOrderForm.costPrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button
            v-if="
              handleOrderForm.orderShippingNumber != '' &&
                handleOrderForm.costPrice != ''
            "
            type="primary"
            @click="submitOrderEdition"
            >确定</el-button
          >
          <el-button v-else type="primary" disabled="">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="发票生成"
        :visible.sync="invoiceDialogVisible"
        width="1200px"
        center
      >
        <table class="tableizer-table" v-loading="downloading">
          <thead>
            <th colspan="6">Commercial Invoice</th>
          </thead>
          <tbody>
            <tr>
              <td colspan="3" class="text-center font-weight-bold">
                Sender Information (寄件人信息)
              </td>
              <td class="font-weight-bold">
                Date of Exportation<br />
                (出口日期):
              </td>
              <td colspan="2">
                <input type="date" v-model="invoiceInfoForm.exportDate" />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Company (公司名):</td>
              <td colspan="2">
                <input
                  type="text"
                  v-model="invoiceInfoForm.senderCompanyName"
                />
              </td>
              <td class="font-weight-bold">
                Country of Export<br />
                (出口国):
              </td>
              <td colspan="2">
                <input
                  type="text"
                  value="CHINA"
                  v-model="invoiceInfoForm.exportCountry"
                />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Address (地址):</td>
              <td colspan="5">
                <input type="text" v-model="invoiceInfoForm.senderAddress" />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Contact Name (联系人)：</td>
              <td colspan="2">
                <input type="text" v-model="invoiceInfoForm.senderName" />
              </td>
              <td class="font-weight-bold">Tel (电话):</td>
              <td colspan="2">
                <input type="text" v-model="invoiceInfoForm.senderTel" />
              </td>
            </tr>
            <tr>
              <td colspan="6" class="text-center font-weight-bold">↑↓</td>
            </tr>
            <tr>
              <td colspan="6" class="text-center font-weight-bold">
                Receiver Information(收件人信息)
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Company(公司):</td>
              <td colspan="5">
                <input
                  type="text"
                  v-model="invoiceInfoForm.receiverCompanyName"
                />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Receiver Address (地址):</td>
              <td colspan="5">
                <input type="text" v-model="invoiceInfoForm.receiverAddress" />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Zip Code (邮编):</td>
              <td colspan="2">
                <input type="text" v-model="invoiceInfoForm.receiverZipcode" />
              </td>
              <td class="font-weight-bold">
                Country of destination <br />(进口国):
              </td>
              <td colspan="2">
                <input type="text" v-model="invoiceInfoForm.importCountry" />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">Contact Name (联系人):</td>
              <td colspan="2">
                <input type="text" v-model="invoiceInfoForm.receiverName" />
              </td>
              <td class="font-weight-bold">Tel (电话):</td>
              <td colspan="2">
                <input type="text" v-model="invoiceInfoForm.receiverTel" />
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">No.</td>
              <td class="font-weight-bold">
                DESCRIPTION (货物描述)<br />(品名、用途、材质)
              </td>
              <td class="font-weight-bold">Qty 数量(pcs)</td>
              <td class="font-weight-bold">Price单价(USD)</td>
              <td class="font-weight-bold">Hs Code(海关编码)</td>
              <td class="font-weight-bold">Total Usd(总价值)</td>
            </tr>
            <tr v-for="(item, index) in invoiceInfoForm.goods" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <input type="text" v-model="item.goodName" />
              </td>
              <td>
                <input type="text" v-model="item.goodNumber" />
              </td>
              <td>
                <input type="text" v-model="item.goodPrice" />
              </td>
              <td>
                <input type="text" v-model="item.hsCode" />
              </td>
              <td>
                <input type="text" v-model="item.totalPrice" />
              </td>
            </tr>
            <tr>
              <td colspan="3" class="font-weight-bold">Total:</td>
              <td colspan="3">
                <input type="text" v-model="invoiceInfoForm.totalPrice" />
              </td>
            </tr>
          </tbody>
        </table>
        <vue-html2pdf
          :show-layout="false"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="Commercial Invoice"
          :pdf-quality="2"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="1200px"
          @progress="onProgress($event)"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <table class="tableizer-table">
              <thead>
                <th colspan="6">Commercial Invoice</th>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3" class="text-center font-weight-bold">
                    Sender Information (寄件人信息)
                  </td>
                  <td class="font-weight-bold">
                    Date of Exportation<br />
                    (出口日期):
                  </td>
                  <td colspan="2">
                    <input type="date" v-model="invoiceInfoForm.exportDate" />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Company (公司名):</td>
                  <td colspan="2">
                    <input
                      type="text"
                      v-model="invoiceInfoForm.senderCompanyName"
                    />
                  </td>
                  <td class="font-weight-bold">
                    Country of Export<br />
                    (出口国):
                  </td>
                  <td colspan="2">
                    <input
                      type="text"
                      value="CHINA"
                      v-model="invoiceInfoForm.exportCountry"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Address (地址):</td>
                  <td colspan="5">
                    <input
                      type="text"
                      v-model="invoiceInfoForm.senderAddress"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Contact Name (联系人)：</td>
                  <td colspan="2">
                    <input type="text" v-model="invoiceInfoForm.senderName" />
                  </td>
                  <td class="font-weight-bold">Tel (电话):</td>
                  <td colspan="2">
                    <input type="text" v-model="invoiceInfoForm.senderTel" />
                  </td>
                </tr>
                <tr>
                  <td colspan="6" class="text-center font-weight-bold">↑↓</td>
                </tr>
                <tr>
                  <td colspan="6" class="text-center font-weight-bold">
                    Receiver Information(收件人信息)
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Company(公司):</td>
                  <td colspan="5">
                    <input
                      type="text"
                      v-model="invoiceInfoForm.receiverCompanyName"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Receiver Address (地址):</td>
                  <td colspan="5">
                    <input
                      type="text"
                      v-model="invoiceInfoForm.receiverAddress"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Zip Code (邮编):</td>
                  <td colspan="2">
                    <input
                      type="text"
                      v-model="invoiceInfoForm.receiverZipcode"
                    />
                  </td>
                  <td class="font-weight-bold">
                    Country of destination <br />(进口国):
                  </td>
                  <td colspan="2">
                    <input
                      type="text"
                      v-model="invoiceInfoForm.importCountry"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Contact Name (联系人):</td>
                  <td colspan="2">
                    <input type="text" v-model="invoiceInfoForm.receiverName" />
                  </td>
                  <td class="font-weight-bold">Tel (电话):</td>
                  <td colspan="2">
                    <input type="text" v-model="invoiceInfoForm.receiverTel" />
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">No.</td>
                  <td class="font-weight-bold">
                    DESCRIPTION (货物描述)<br />(品名、用途、材质)
                  </td>
                  <td class="font-weight-bold">Qty 数量(pcs)</td>
                  <td class="font-weight-bold">Price单价(USD)</td>
                  <td class="font-weight-bold">Hs Code(海关编码)</td>
                  <td class="font-weight-bold">Total Usd(总价值)</td>
                </tr>
                <tr v-for="(item, index) in invoiceInfoForm.goods" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <input type="text" v-model="item.goodName" />
                  </td>
                  <td>
                    <input type="text" v-model="item.goodNumber" />
                  </td>
                  <td>
                    <input type="text" v-model="item.goodPrice" />
                  </td>
                  <td>
                    <input type="text" v-model="item.hsCode" />
                  </td>
                  <td>
                    <input type="text" v-model="item.totalPrice" />
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="font-weight-bold">Total:</td>
                  <td colspan="3">
                    <input type="text" v-model="invoiceInfoForm.totalPrice" />
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </vue-html2pdf>

        <span slot="footer" class="dialog-footer">
          <el-button @click="invoiceDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="exportInvoice"
            >下载订单发票</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  computed,
  ref,
  reactive,
  inject,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";
import VueHtml2pdf from "vue-html2pdf";
export default {
  components: {
    pagination,
    VueHtml2pdf,
  },

  setup(props, { root: { $store, $message }, refs }) {
    //inject reload() to refresh component
    const toReload = inject("reload");

    onMounted(() => {
      $store.dispatch("getAllOrderForm", {
        status: "待发货",
        page: "0",
        size: "5",
      });
    });
    const loading = ref(false);

    const editDialogVisible = ref(false);
    const invoiceDialogVisible = ref(false);
    const handleOrderForm = reactive({
      orderId: "",
      orderShippingNumber: "",
      costPrice: "",
      shippingTime: "",
    });

    const goodList = computed(() => {
      return $store.state.orderlist;
    });

    const tableData = computed(() => {
      let data = [];
      if (keyWord.value != "") {
        data = returnData.value;
      } else {
        data = goodList.value;
      }
      return data.map((object, i) => {
        return {
          ordernumber: i + 1,
          id: object._id,
          username: object.username,
          shippingCountry: object.shippingCountry,
          shippingAddress: object.shippingAddress,
          shippingCity: object.shippingCity,
          shippingProvince: object.shippingProvince,
          shippingPostcode: object.shippingPostcode,
          shippingContact: `${object.shippingRecevier}, ${object.shippingPhone}`,
          orderExpressRetail: object.orderExpressRetail,
          orderStatus: object.orderStatus,
          packageLocation: object.packageLocation,
          orderType: object.orderType,
          updatedAt: object.updatedAt,
          orderDetail: object.orderGoodsList,
        };
      });
    });

    const keyWord = ref("");

    const returnData = ref([]);

    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "待发货",
        page: "0",
        size: "5",
      };
      $store
        .dispatch("searchOrders", data)
        .then((res) => {
          returnData.value = res.data;
        })
        .catch(() => {});
    };

    const handleUpdate = (row) => {
      editDialogVisible.value = true;
      handleOrderForm.orderId = row.id;
    };

    const invoiceInfoForm = reactive({
      username: "",
      exportDate: "",
      senderCompanyName: "",
      exportCountry: "",
      senderAddress: "",
      senderName: "",
      senderTel: "",
      receiverCompanyName: "",
      receiverAddress: "",
      receiverZipcode: "",
      importCountry: "",
      receiverName: "",
      receiverTel: "",
      goods: [
        {
          goodName: "",
          goodNumber: "",
          goodPrice: "",
          hsCode: "",
          totalPrice: "",
        },
      ],
      totalPrice: "",
    });
    const invoiceUpdate = (row) => {
      invoiceDialogVisible.value = true;
      let goodListValue = goodList.value.filter((i) => i._id == row.id)[0];
      invoiceInfoForm.receiverAddress = goodListValue.shippingAddress;
      invoiceInfoForm.importCountry = goodListValue.shippingCountry;
      invoiceInfoForm.receiverName = goodListValue.shippingRecevier;
      invoiceInfoForm.receiverTel = goodListValue.shippingPhone;
      invoiceInfoForm.receiverZipcode = goodListValue.shippingPostcode;
      invoiceInfoForm.goods = goodListValue.orderGoodsList;
      invoiceInfoForm.username = goodListValue.username;
    };
    const downloading = ref(false);
    const exportInvoice = async () => {
      let invoiceInfo = {};
      invoiceInfo = invoiceInfoForm;
      invoiceInfo.operator = $store.state.userSelf.username;
      if (Object.values(invoiceInfo).every((v) => !!v)) {
        $store.dispatch("createInvoice", invoiceInfo).then(() => {
          downloading.value = true;
          refs.html2Pdf.generatePdf();
        });
      } else {
        $message.error("请填写完整的发票信息！");
      }
    };

    const onProgress = (progress) => {
      if (progress === 100) {
        downloading.value = false;
      }
    };

    const expressOptions = reactive([
      {
        label: "DHL",
        value: "DHL",
      },
      {
        label: "UPS",
        value: "UPS",
      },
      {
        label: "FedEx",
        value: "FedEx",
      },
      {
        label: "TNT",
        value: "TNT",
      },
      {
        label: "EMS",
        value: "EMS",
      },
      {
        label: "Special",
        value: "Special",
      },
    ]);

    const submitOrderEdition = () => {
      let data = {
        _id: handleOrderForm.orderId,
        data: {
          orderShippingNumber: handleOrderForm.orderShippingNumber,
          costPrice: handleOrderForm.costPrice,
          expressOperator: $store.state.userSelf.username,
          shippingTime: Date(Date.now()).toString(),
        },
      };
      editDialogVisible.value = false;
      loading.value = true;
      $store
        .dispatch("orderDelivering", data)
        .then(() => {
          $message.success("快递信息更新成功！");
          loading.value = false;
          toReload();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("getAllOrderForm", {
          status: "待发货",
          page: val - 1,
          size: 5,
        });
      } else {
        $store
          .dispatch("searchOrders", {
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
      loading,
      keyWord,
      handleQuery,
      pageChange,

      goodList,
      editDialogVisible,
      tableData,

      handleOrderForm,
      handleUpdate,
      invoiceUpdate,
      invoiceDialogVisible,
      invoiceInfoForm,
      exportInvoice,
      onProgress,
      downloading,

      expressOptions,
      submitOrderEdition,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb-outer {
  height: 48px;
  font-size: 15px;
  background-color: #f0f3f4;
  border-radius: 3px;
}
.bottom-margin {
  margin-bottom: 120px;
}
.dialog-notice {
  color: #f56c6c;
  font-weight: 800;
  margin-left: 42px;
}
.input-width {
  width: 80px;
}
table.tableizer-table {
  font-size: 14px;
  border: 2px solid #ccc;
  border-collapse: collapse;
  font-family: Arial, Helvetica, sans-serif;
}
.tableizer-table td {
  padding: 10px;
  border: 2px solid #ccc;
  border-collapse: collapse;
}
.tableizer-table th {
  font-weight: bold;
  font-size: 2em;
  padding: 10px;
  text-align: center;
}
input {
  width: 100%;
  border: none;
}
</style>
