<template>
  <div style="margin-left:1%;width:98%;">
    <div class="row">
      <div
        class="col-12 col-md-6 col-xl-4"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          style="border-radius:3px; height:auto;"
          shadow="hover"
        >
          <div
            class="border-bottom pt-2 pb-2 pl-3"
            style="font-size:18px;background-color:#F0F3F4;"
          >
            <span class="mb-3">个人资料</span>
          </div>
          <div class="ml-3 mt-3 row">
            <div class="img_div" style="width:100px">
              <img
                class="uploadhover mb-3 border"
                style="width:90px;height:90px;object-fit:cover;border-radius: 50%;"
                :src="userAvatar"
              />
              <a @click="openUploadDialog">
                <div class="mask"></div>
              </a>
            </div>
            <span style="width:calc(100%-100px;);" class="ml-2">
              <p class="mt-4" style="font-size:17px;">
                {{ UserInfo.username }}
              </p>
              <p style="font-size:16px;color:gray">
                <i class="fas fa-medal"> {{ UserInfo.level }}</i>
              </p>
            </span>
          </div>
          <uploadavatar />
          <div class="border-top">
            <div class="ml-3 mr-3 mt-3">
              <el-collapse-transition>
                <el-form
                  v-show="formEdit === false"
                  :model="ruleForm"
                  ref="ruleForm"
                  label-position="left"
                  label-width="110px"
                >
                  <el-form-item label="用户邮箱">
                    {{ UserInfo.email }}
                  </el-form-item>
                  <el-form-item label="用户名">
                    {{ UserInfo.username }}
                  </el-form-item>
                  <el-form-item label="出生日期">
                    {{ UserInfo.birthday | moment("YYYY-MM-DD") }}
                  </el-form-item>
                  <el-form-item label="性别">
                    <div v-if="UserInfo.gender === 'female'">女</div>
                    <div v-else>男</div>
                  </el-form-item>
                  <el-form-item label="联系电话">
                    {{ UserInfo.phoneNumber }}
                  </el-form-item>
                  <el-form-item label="微信">
                    {{ UserInfo.weixin }}
                  </el-form-item>
                  <el-form-item label="QQ">
                    {{ UserInfo.qq }}
                  </el-form-item>
                  <div class="mb-4 text-center">
                    <el-button
                      icon="el-icon-edit"
                      type="primary"
                      @click="editInfo"
                      >编辑</el-button
                    >
                    <el-button
                      icon="el-icon-upload2"
                      type="warning"
                      @click="openUploadDialog"
                      >上传头像</el-button
                    >
                    <el-button
                      icon="el-icons-tools"
                      type="danger"
                      @click="modifyPasswordSign=true"
                      >修改密码</el-button
                    >
                  </div>
                </el-form>
              </el-collapse-transition>

              <el-collapse-transition>
                <el-form
                  v-show="formEdit === true"
                  :model="ruleForm"
                  ref="ruleForm"
                  label-position="left"
                  label-width="120px"
                  v-loading="loading"
                >
                  <el-form-item label="用户邮箱:" prop="email">
                    <el-input v-model="ruleForm.email" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="用户名:" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                  </el-form-item>
                 <el-form-item label="出生日期:" prop="birthday">
                    <el-date-picker
                      v-model="ruleForm.birthday"
                      type="date"
                      placeholder="请选择生日">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="性别:" prop="gender">
                    <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                      <el-option
                        label="男"
                        value="male">
                      </el-option>
                      <el-option
                        label="女"
                        value="female">
                      </el-option>
                    </el-select>
                    
                  </el-form-item>
                  <el-form-item label="联系电话:" prop="phoneNumber">
                    <el-input v-model="ruleForm.phoneNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="微信:" prop="weixin">
                    <el-input v-model="ruleForm.weixin"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ:" prop="qq">
                    <el-input v-model="ruleForm.qq"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm"
                      >更新</el-button
                    >
                    <el-button @click="editInfo">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-collapse-transition>
            </div>
          </div>
        </el-card>
      </div>

      <div class="col-12 col-md-6 col-xl-4 mb-5">
        <el-card :body-style="{ padding: '0px' }" style="border-radius:3px;min-height:154px;" shadow="hover">
          <div class="border-bottom pt-2 pb-2 pl-3" style="font-size:18px;background-color:#F0F3F4;">
            <span class="mb-3">地址信息</span>
            <el-button icon="el-icon-edit" class="float-right mr-1" type="primary" @click="newAddressSign = true">添加</el-button>
          </div>
          
          <div style="font-size:17px;" class="mt-4">
            <el-collapse-transition>
          <div v-if="newAddressSign === true || modifyAddressSign ===true" class="border-bottom" v-loading="loading">
            <el-form :model="newAddressForm" label-position="left" label-width="80px" class="ml-3 mr-3 pt-4 pb-4">
                    <el-form-item label="国家">
                        <el-input v-model="newAddressForm.ShippingCountry" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="省份">
                        <el-input v-model="newAddressForm.ShippingProvince" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="城市">
                        <el-input v-model="newAddressForm.ShippingCity" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="newAddressForm.ShippingAddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编">
                        <el-input v-model="newAddressForm.ShippingPostcode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="newAddressForm.shippingRecevier" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="newAddressForm.shippingPhone" autocomplete="off"></el-input>
                    </el-form-item>
                    <div class="text-center">
                      <el-button type="primary" @click="addNewAddress">确定</el-button>
                      <el-button @click="newAddressSign = false;modifyAddressSign=false">取消</el-button>
                    </div>        
            </el-form>
          </div>
          </el-collapse-transition>
            <div v-if="!UserAddressArray !== undefined && UserAddressArray.length == 0 && newAddressSign==false" class="mt-5 text-center">
              您的地址信息为空
            </div>
            <div v-else class="mb-4 mt-4 pl-3 pr-3">
              <el-collapse accordion>
                <el-collapse-item v-for="(addressItem, index) in UserAddressArray" :key="index">
                  <template slot="title" style="height:100px;">
                    <i class="fas fa-address-card text-info mr-2 fa-lg"></i>
                    地址: {{addressItem.ShippingAddress}} 
                  </template>
                  <div class="ml-3 mr-3" style="font-size:15px;">
                    <p>
                      <i class="fas fa-globe mr-2 text-success"></i> 国家/省份: {{addressItem.ShippingCountry}}, {{addressItem.ShippingProvince}}
                    </p>
                    <p>
                      <i class="fas fa-city text-success mr-2"></i>城市: {{addressItem.ShippingCity}}
                    </p>
                    <p>
                      <i class="fas fa-map-marked-alt  text-success mr-2"></i>详细地址: {{addressItem.ShippingAddress}}
                    </p>
                    <p>
                      <i class="fas fa-arrows-alt  text-success mr-2"></i> 邮编: {{addressItem.ShippingPostcode}}
                    </p>
                    <p>
                      <i class="fas fa-address-book  text-success mr-2"></i> 联系信息: {{addressItem.shippingRecevier}}, {{addressItem.shippingPhone}}
                    </p>
                    <div class="text-center mt-4">
                      <el-button type="warning" @click="modifyAddress(index)">修改</el-button>
                      <el-button type="info" @click="deleteAddress(index)">删除</el-button>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              
            </div>
          </div>
          
        </el-card>
        
      </div>

      <div
        class="col-12 col-md-6 col-xl-4 mb-5"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          style="border-radius:3px;"
          shadow="hover"
        >
          <div
            class="border-bottom pt-2 pb-2 pl-3"
            style="font-size:18px;background-color:#F0F3F4;"
          >
            <span class="mb-3">账户信息</span>
          </div>
          <div class="mt-4 row">
            <div class="col-7 ml-3">
              <p><i class="fas fa-coins"></i> 账户余额:
               <span class="text-danger ml-1 mr-1">{{userAccountBalance}}</span>
               元</p>
              <p><i class="fas fa-star-half-alt"></i> 账户积分: ***</p>
              
            </div>
            <div class="col-4">
              <el-button type="warning" @click.native="clickToInputAmount">充值</el-button>
            </div>
            <!-- <p class="ml-4"><i class="fas fa-lightbulb ml-2 text-warning"></i> 可使用微信或者支付宝金充值</p> -->
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
        title="账户充值"
        :visible.sync="inputAmountSign"
        width="400px"
        center>
        <div v-if="scanQRCode===false">
          <span class="text-center ml-3" style="font-size:16px;">
              <span class="text-danger">请输入充值金额:</span> 
              <el-input-number style="width:170px;" class="ml-3" :step="10" v-model="inputAmount" :min="1" :max="Infinity"></el-input-number>
          </span>
          <div class="text-center mt-5">
            <el-button @click="inputAmountSign = false">取消</el-button>
            <el-button type="warning" @click="scanQRCode = true">确定充值</el-button>
            
          </div>
        </div> 
        <div v-if="scanQRCode===true">
          <div class="text-danger" style="font-size:16px;">
            <i class="fas fa-bell mr-2"></i>请扫描微信或支付宝二维码支付
          </div>
          <el-tabs class="mt-3" type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="fab fa-weixin text-success"></i> 微信</span>
              <el-image
                style="width: 90%;margin-left:5%;"
                src = "/images/weixinCode.png"
                fit="fill">
              </el-image>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="fab fa-alipay text-primary"></i> 支付宝</span>
              <el-image
                style="width: 90%;margin-left:5%;"
                src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png"
                fit="fill">
            </el-image>
            </el-tab-pane>
          </el-tabs>
          <div class="text-center mt-5">
            <el-button @click="scanQRCode = false">取消</el-button>
            <el-button type="primary" @click="submitSaveAmount">确定</el-button>
          </div>
        </div> 
    </el-dialog>
    <el-dialog
        title="修改密码"
        :visible.sync="modifyPasswordSign"
        width="400px"
        center>
        <el-form :model="modifyPasswordRuleForm" status-icon label-width="80px" class="demo-ruleForm">
          <el-form-item label="输入密码">
            <el-input type="password" v-model="modifyPasswordRuleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="modifyPasswordRuleForm.checkpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitModifyPassword">提交</el-button>
            <el-button @click="resetModifyPassword">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, inject} from "@vue/composition-api";
import uploadavatar from "@/components/AvatarUpload";
import { imageDomain } from "@/MainAPI.js";
export default {
  components: {
    uploadavatar,
  },
  setup(props, { root: { $store, $message, $confirm } }) {

    onMounted(() => {
      $store.dispatch("getUserInfo");
    });

    const loading = ref(false);

    const toReload = inject("reload");

    const UserInfo = computed(() => {
      return $store.state.userSelf;
    });

    const userAvatar = computed(()=>{
      return imageDomain+UserInfo.value.avatar
    });

    const UserAddressArray = computed(() => {
      return UserInfo.value.address;
    });

    const userAccountBalance = computed(()=>{
      return $store.state.userSelf.balance;
    });

    const openUploadDialog = () => {
      $store.commit("openDialog", true);
    };
    const newAddressSign = ref(false);
    const modifyAddressSign = ref(false);

    const newAddressForm = reactive({
      ShippingCountry: "",
      ShippingProvince: "",
      ShippingCity: "",
      ShippingAddress: "",
      ShippingPostcode: "",
      shippingPhone: "",
      shippingRecevier: "",
    });

    const addNewAddress = () =>{
      if(newAddressForm.ShippingCountry === "" || newAddressForm.ShippingProvince === "" || newAddressForm.ShippingCity === "" || newAddressForm.ShippingAddress === "" ||
          newAddressForm.ShippingPostcode === "" || newAddressForm.shippingPhone === "" || newAddressForm.shippingRecevier === ""){
            $message.error("请输入完整信息！");
          }
      else{
        if(newAddressSign.value === true){
          UserAddressArray.value.push(newAddressForm);
          let  data = {
            address: UserAddressArray.value
          };
          loading.value=true;
          $store.dispatch("updateUserInfo", data)
                .then(()=>{
                  $message.success("添加新地址成功！");
                  loading.value=false;
                  toReload();
                })
                .catch(()=>{
                  loading.value=false;
                })
        }
        else if(modifyAddressSign.value === true){
          UserAddressArray.value.splice(modifyIndex.value, 1);
          UserAddressArray.value.push(newAddressForm);
          let  data = {
            address: UserAddressArray.value
          };
          loading.value=true;
          $store.dispatch("updateUserInfo", data)
                .then(()=>{
                  $message.success("地址更新成功！");
                  loading.value=false;
                  toReload();
                })
                .catch(()=>{
                  loading.value=false;
                })
        }
      }
    };

    const deleteAddress = (index) =>{
      $confirm('确定删除地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          loading.value=true;
          UserAddressArray.value.splice(index, 1);
          let  data = {
              address: UserAddressArray.value
            };
            $store.dispatch("updateUserInfo", data)
                  .then(()=>{
                    $message.success("删除地址成功！");
                    loading.value=false;
                    toReload();
                  })
                  .catch(()=>{
                    loading.value=false;
                  })
        }).catch(() => {
          $message({
            type: 'info',
            message: '取消'
          }); 
        });
    }

    const modifyIndex= ref("");

    const modifyAddress = (index) =>{
      modifyAddressSign.value = true;
      newAddressForm.ShippingCountry = UserAddressArray.value[index].ShippingCountry;
      newAddressForm.ShippingProvince= UserAddressArray.value[index].ShippingProvince;
      newAddressForm.ShippingCity= UserAddressArray.value[index].ShippingCity;
      newAddressForm.ShippingAddress= UserAddressArray.value[index].ShippingAddress;
      newAddressForm.ShippingPostcode= UserAddressArray.value[index].ShippingPostcode;
      newAddressForm.shippingPhone= UserAddressArray.value[index].shippingPhone;
      newAddressForm.shippingRecevier= UserAddressArray.value[index].shippingRecevier;
      modifyIndex.value = index;
    }

    const ruleForm = reactive({
      email: UserInfo.value.email,
      username: UserInfo.value.username,
      birthday: UserInfo.value.birthday,
      phoneNumber: UserInfo.value.phoneNumber,
      gender: UserInfo.value.gender,
      weixin: UserInfo.value.weixin,
      qq: UserInfo.value.qq,
    });

    const formEdit = ref(false);
    const passwordhide = ref(true);
    const editInfo = () => {
      formEdit.value = !formEdit.value;
    };
    const switchpsw = () => {
      passwordhide.value = !passwordhide.value;
    };

    const submitForm = () => {
      if(ruleForm.username === ""){
        $message.error("用户名不能为空");
      } 
      else{
        loading.value=true;
        $store.dispatch("updateUserInfo", ruleForm)
              .then(()=>{
                $message.success("基本信息更新成功！");
                loading.value=false;
                $store.dispatch("getUserInfo");
              })
              .catch(()=>{
                loading.value=false;
              })
      }
    };

    const inputAmountSign = ref(false);
    const clickToInputAmount = ()=>{
      inputAmountSign.value = true;
    };

    const inputAmount = ref(0);
    const scanQRCode = ref(false);

    const submitSaveAmount = () =>{
      let data = {
        rechargeBalance: inputAmount.value
      };
      $store.dispatch("rechargeAccount", data)
              .then(()=>{
                $message.success("账户充值成功！");
                inputAmountSign.value = false;
                scanQRCode.value = false;
                toReload();
              })
              .catch(()=>{
                loading.value=false;
              })

    };

    const modifyPasswordSign = ref(false);
    const modifyPasswordRuleForm = reactive({
      pass: "",
      checkpass:"",
    });
    const resetModifyPassword = () =>{
      modifyPasswordSign.value = false;
      modifyPasswordRuleForm.pass = "";
      modifyPasswordRuleForm.checkpass = "";
    };
    const submitModifyPassword = () =>{
      if(modifyPasswordRuleForm.pass === modifyPasswordRuleForm.checkpass){
        $message.success("相同");
        // localStorage.clear();
      }
      else{
        $message.error("不同")
      }
    };



    return {
      loading,
      UserInfo,
      userAvatar,
      UserAddressArray,

      newAddressSign,
      newAddressForm,
      addNewAddress,
      deleteAddress,
      modifyAddress,
      modifyAddressSign,

      openUploadDialog,
      ruleForm,
      submitForm,

      formEdit,
      editInfo,

      passwordhide,
      switchpsw,

      userAccountBalance,

      inputAmountSign,
      clickToInputAmount,
      inputAmount,
      scanQRCode,
      submitSaveAmount,

      modifyPasswordSign,
      modifyPasswordRuleForm,
      submitModifyPassword,
      resetModifyPassword
    };
  },
};
</script>

<style lang="scss">
.img_div {
  width: 100%;
  position: relative;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  height: 90px;
  background: url(https://i.52112.com/icon/jpg/256/20191003/61412/2708457.jpg);
  background-size: contain;
  opacity: 0;
  cursor: pointer;
}
.img_div a:hover .mask {
  opacity: 0.7;
}
</style>
