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
            ><i class="fas fa-warehouse" /> 待入库</span
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
      <el-button
        class="mt-2 float-right mb-2"
        v-show="switchAdd === false"
        type="primary"
        @click="switchAddExpress"
      >
        <i class="el-icon-plus"> 新增单号</i>
      </el-button>
      <el-collapse-transition>
        <div class="mt-5" v-show="switchAdd === true" v-loading="loading">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="100px"
            class="demo-ruleForm el-form-outer"
          >
            <el-form-item label="快递公司:" prop="localexpresscompany">
              <el-select
                v-model="ruleForm.localexpresscompany"
                placeholder="请选择快递公司"
              >
                <el-option
                  v-for="(item, index) in expressoptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-collapse-transition>
                <el-input
                  v-if="ruleForm.localexpresscompany === '其他：'"
                  style="width:calc(100%-100px);margin-top:10px;"
                  placeholder="请手动输入公司"
                  v-model="manualInput"
                ></el-input>
              </el-collapse-transition>
            </el-form-item>
            <el-form-item label="快递单号:" prop="localexpressnumber">
              <el-input
                class="el-input-width"
                v-model="ruleForm.localexpressnumber"
              ></el-input>
            </el-form-item>
            <el-form-item label="货物名称:" prop="goodname">
              <el-input
                class="el-input-width"
                v-model="ruleForm.goodname"
              ></el-input>
            </el-form-item>
            <el-form-item label="货物数量:" prop="goodNumber">
              <el-input
                class="el-input-width"
                v-model="ruleForm.goodNumber"
              ></el-input>
            </el-form-item>
            <el-form-item label="* 客户备注:" prop="goodNotes">
              <el-input
                class="el-input-width"
                placeholder=""
                v-model="ruleForm.goodNotes"
              ></el-input>
            </el-form-item>
            
            
          </el-form>
          <div class="mb-4 text-center">
            <el-button type="primary" @click="addExpress">
              确认添加
            </el-button>
            <el-button type="warning" @click="switchAddExpress">
              取消编辑
            </el-button>
          </div>
        </div>
      </el-collapse-transition>
      <el-table
        :data="tableData"
        class="borderRadius mt-5"
        border
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="goodId" label="货物号" align="center" sortable>
          <template slot-scope="{ row }">
            {{ row.goodId.substr(-10) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="trackingNumber"
          label="快递单号"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="expressCompany"
          label="快递公司"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="goodName"
          label="货物名称"
          align="center"
          sortable
        >
        </el-table-column>
         <el-table-column
          prop="goodNumber"
          label="货物数量"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="goodNotes"
          label="客户备注"
          align="center"
          sortable
        >
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
        <el-table-column label="货物状态" align="center" sortable>
          <template slot-scope="{ row }">
            <span class="text-danger">{{ row.goodStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="130" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="warning" size="mini" @click="handleUpdate(row)">
              修改
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

      <el-dialog
        title="货物入库信息"
        :visible.sync="switchEditSign"
        center
        width="420px"
      >
        <el-form :model="updateForm" label-position="left" label-width="120px">
          <el-form-item label="货物名称">
            <el-input
              v-model="updateForm.goodname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="货物数量">
            <el-input
              v-model="updateForm.goodNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户备注">
            <el-input
              v-model="updateForm.goodNotes"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="快递公司">
            <el-select
              v-model="updateForm.localexpresscompany"
              placeholder="请选择快递公司"
            >
              <el-option
                v-for="(item, index) in expressoptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-if="updateForm.localexpresscompany === '其他：'"
              style="width:calc(100%-100px);margin-top:10px;"
              placeholder="请手动输入公司"
              v-model="manualInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="快递单号">
            <el-input
              v-model="updateForm.localexpressnumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="switchEditSign = false">取消</el-button>
          <el-button
            v-if="
              updateForm.goodname === '' ||
                updateForm.localexpresscompany === '' ||
                updateForm.localexpressnumber === ''
            "
            type="primary"
            disabled
            >确认</el-button
          >
          <el-button v-else type="primary" @click="updateGoodsInfo"
            >确认</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  inject,
} from "@vue/composition-api";
import pagination from "../components/InfoPagination";

export default {
  name: "stockpendinglist",
  components: {
    pagination,
  },

  setup(props, { root: { $store, $message } }) {
    //inject reload() to refresh component
    const toReload = inject("reload");
    const loading = ref(false);

    onMounted(() => {
      $store.dispatch("goodGet", {
        status: "待入库",
        page: "0",
        size: "10",
      });
    });

    //table data for display
    const goodList = computed(() => {
      return $store.state.goodlist;
    });
    const keyWord = ref("");
    const returnData = ref([]);
    const handleQuery = () => {
      let data = {
        keyword: { searchString: keyWord.value },
        status: "待入库",
        page: "0",
        size: "10",
        // status1: '待入库',
      };
      $store
        .dispatch("searchGoodsForUser", data)
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
        data = goodList.value;
      }
      return data.map((object) => {
        return {
          goodId: object._id,
          trackingNumber: object.localExpressNumber,
          goodName: object.goodName,
          goodNumber: object.goodNumber,
          goodNotes: object.goodNotes,
          expressCompany: object.localExpressCompany,
          goodStatus: object.goodStatus,
          updatedAt: object.updatedAt,
        };
      });
    });
    const pageChange = (val) => {
      if (keyWord.value === "") {
        $store.dispatch("goodGet", {
          status: "待入库",
          page: val - 1,
          size: "10",
          // status1: '待入库',
        });
      } else {
        $store
          .dispatch("searchGoodsForUser", {
            keyword: { searchString: keyWord.value },
            status: "待入库",
            page: val - 1,
            size: "10",
            // status1: '待入库',
          })
          .then((res) => {
            returnData.value = res.data;
          })
          .catch(() => {});
      }
    };

    //user edit new good info
    const expressoptions = reactive([
      {
        value: "中国邮政",
        label: "中国邮政",
      },
      {
        value: "顺丰速运",
        label: "顺丰速运",
      },
      {
        value: "圆通快递",
        label: "圆通快递",
      },
      {
        value: "申通快递",
        label: "申通快递",
      },
      {
        value: "韵达快递",
        label: "韵达快递",
      },
      {
        value: "汇通快递",
        label: "汇通快递",
      },
      {
        value: "中通快递",
        label: "中通快递",
      },
      {
        value: "宅急送",
        label: "宅急送",
      },
      {
        value: "天天快递",
        label: "天天快递",
      },
      {
        value: "其他：",
        label: "其他",
      },
    ]);
    const manualInput = ref("");
    const ruleForm = reactive({
      goodname: "",
      goodNumber:"",
      goodNotes:"",
      localexpressnumber: "",
      localexpresscompany: "",
    });

    const rules = ref({
      goodname: [
        { required: true, message: "请输入货物名称", trigger: "blur" },
      ],
      goodNumber: [
        { required: true, message: "请输入货物数量", trigger: "blur" },
      ],
      localexpressnumber: [
        { required: true, message: "请输入快递单号", trigger: "blur" },
      ],
      localexpresscompany: [
        { required: true, message: "请输入快递公司", trigger: "blur" },
      ],
    });
    const switchAdd = ref(false);
    const tableRowClassName = ({ row }) => {
      if (row.status === false) {
        return "information-row";
      } else if (row.status === true) {
        return "success-row";
      }
    };
    const switchAddExpress = () => {
      switchAdd.value = !switchAdd.value;
    };

    const addExpress = () => {
      if (ruleForm.goodname === "") {
        $message.error("货物名称不能为空！");
      }else if (ruleForm.goodNumber === "") {
        $message.error("货物数量不能为空！");
      } else if (ruleForm.localexpressnumber === "") {
        $message.error("快递单号不能为空！");
      } else if (ruleForm.localexpresscompany === "") {
        $message.error("货快递公司不能为空！");
      } else if (
        ruleForm.localexpresscompany === "其他：" &&
        manualInput.value === ""
      ) {
        $message.error("请手动输入快递公司名称！");
      } else {
        let data = {
          goodName: ruleForm.goodname,
          goodNumber: ruleForm.goodNumber,
          goodNotes: ruleForm.goodNotes,
          localExpressNumber: ruleForm.localexpressnumber,
          localExpressCompany: ruleForm.localexpresscompany + manualInput.value,
        };
        loading.value = true;
        $store
          .dispatch("submitExpress", data)
          .then(() => {
            $message.success("单号添加成功！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    //user update/modify good express info
    const switchEditSign = ref(false);
    const updateForm = reactive({
      goodId: "",
      goodname: "",
      goodNumber:"",
      goodNotes:"",
      localexpressnumber: "",
      localexpresscompany: "",
    });
    const handleUpdate = (row) => {
      switchEditSign.value = true;
      updateForm.goodId = row.goodId;
      updateForm.goodname = row.goodName;
      updateForm.goodNumber = row.goodNumber;
      updateForm.goodNotes = row.goodNotes;
      updateForm.localexpressnumber = row.trackingNumber;
      updateForm.localexpresscompany = row.expressCompany;
    };
    const updateGoodsInfo = () => {
      switchEditSign.value = false;
      if (updateForm.goodname === "") {
        $message.error("货物名称不能为空！");
      } else if (updateForm.goodNumber === "") {
        $message.error("货物数量不能为空！");
      }else if (updateForm.localexpressnumber === "") {
        $message.error("快递单号不能为空！");
      } else if (updateForm.localexpresscompany === "") {
        $message.error("货快递公司不能为空！");
      } else if (
        updateForm.localexpresscompany === "其他：" &&
        manualInput.value === ""
      ) {
        $message.error("请手动输入快递公司名称！");
      } else {
        let data = {
          _id: updateForm.goodId,
          goodName: updateForm.goodname,
          goodNumber: updateForm.goodNumber,
          goodNotes: updateForm.goodNotes,
          localExpressNumber: updateForm.localexpressnumber,
          localExpressCompany:
            updateForm.localexpresscompany + manualInput.value,
        };
        loading.value = true;
        $store
          .dispatch("userUpdateGoods", data)
          .then(() => {
            $message.success("货物快递信息修改成功！");
            loading.value = false;
            toReload();
          })
          .catch(() => {
            loading.value = false;
          });
      }
    };

    return {
      loading,
      keyWord,
      handleQuery,
      returnData,
      tableData,
      goodList,
      pageChange,

      handleUpdate,
      updateForm,
      switchEditSign,
      updateGoodsInfo,

      ruleForm,
      rules,
      switchAdd,
      manualInput,
      tableRowClassName,
      switchAddExpress,
      expressoptions,
      addExpress,
    };
  },
};
</script>

<style lang="scss">
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

.el-form-outer {
  overflow: hidden;
  position: relative;
  width: 60%;
  margin: auto;
  left: 0;
  top: 0;
}

.el-input-width {
  width: calc(100%-100px);
}

.button-center {
  text-align: center;
}
</style>
