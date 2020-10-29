<template>
    <div id="expressfeeevaluation">
        <div class="bodystyle">  
        </div>
        <div class="textstyle">
            <h1 class="text-center font-weight-bold">运费估算</h1>
            <p class="text-center font-weight-bold">您可以通过运费估算提前预估您的国际费用</p>
        </div>
         <div class="border formstyle">
                <div class="pt-4 pl-4 pr-4">
                    <p class="text-center"><span style="color:red">* </span>为必填项</p>
                    <div class="row">  
                                <div class="col-xl-4 col-lg-4 col-md-4 mt-3">
                                    <div class="row" style="margin:0 auto;">
                                        <div class="mt-1" style="width:110px;">收货地区 <span style="color:red">*</span></div>
                                        <div>
                                            <el-select style="width:170px;" v-model="evaluationForm.deliverRegion" placeholder="请选择收货地区">
                                                <el-option label="加拿大" :value="1"></el-option>
                                            </el-select>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 mt-3">
                                    <div class="row" style="margin:0 auto;">
                                        <div class="mt-1" style="width:110px;">重量(kg) <span style="color:red">*</span></div>
                                        <div ><el-select style="width:170px;" v-model="evaluationForm.goodWeight">
                                                <el-option
                                                    v-for="(item, index) in 200"
                                                    :key="index"
                                                    :label="item"
                                                    :value="item">
                                                </el-option>
                                            </el-select></div>
                                    </div> 
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-12 mt-3">
                                    <div class="row" style="margin:0 auto;">
                                        <div class="mt-1" style="width:110px;">商品类别 <span style="color:red">*</span></div>
                                        <div ><el-select style="width:170px;" v-model="evaluationForm.goodType" placeholder="请选择商品类别">
                                                <el-option
                                                    v-for="(item, index) in goodsTypeOptions"
                                                    :key="index"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div> 
                                </div>
                    </div>
                    <div class="row" style="margin:0 auto">
                                <div class="row mt-3 no-gutters">
                                    <div style="width:140px;" class="mt-2">
                                        包裹尺寸(cm) <span style="color:red">*</span>
                                    </div>
                                    <el-row class="col" style="width:100%">
                                            <el-col :xl="7" :lg="7" :md="7" :sm="18" :xs="20"  class="mt-1">
                                                <el-row>
                                                    <el-col :xl="4" :lg="4" :md="6" :sm="6" :xs="6" class="mt-1">长</el-col>
                                                    <el-col :xl="19" :lg="18" :md="16" :sm="14" :xs="14"><el-input-number v-model="evaluationForm.goodLength" controls-position="right" ></el-input-number></el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :xl="7" :lg="7" :md="7"  :sm="18" :xs="20"  class="mt-1">
                                               <el-row>
                                                    <el-col :xl="4" :lg="4" :md="6" :sm="6" :xs="6" class="mt-1">宽</el-col>
                                                    <el-col :xl="19" :lg="18" :md="16" :sm="14" :xs="14"><el-input-number v-model="evaluationForm.goodWidth" controls-position="right" ></el-input-number></el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :xl="7" :lg="7" :md="7" :sm="18" :xs="20" class="mt-1">
                                                <el-row>
                                                    <el-col :xl="4" :lg="4" :md="6" :sm="6" :xs="6" class="mt-1">高</el-col>
                                                    <el-col :xl="19" :lg="18" :md="16" :sm="14" :xs="14"><el-input-number v-model="evaluationForm.goodHeight" controls-position="right" ></el-input-number></el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :xl="3" :lg="3" :md="3" :sm="3" :xs="3" class="mt-2">
                                                <el-popover
                                                    placement="right"
                                                    width="380"
                                                    trigger="hover">
                                                    <div>
                                                        <div>
                                                            <i class="fas fa-check mr-1 text-danger"></i>实际重量、体积重量取其较大者，
                                                        </div>
                                                        <div>
                                                            <i class="fas fa-check mr-1 text-danger"></i>体积重量(kg)计算公式 = 长cm * 宽cm * 高cm / 5000
                                                        </div>
                                                    </div>
                                                    <i slot="reference" class="fas fa-question-circle text-warning ml-1" style="font-size:23px;cursor:pointer;"></i>
                                                </el-popover>  
                                            </el-col>
                                    </el-row>
                                </div>
                    </div>
                </div>
                    
                <div style="margin-top:30px;margin-bottom:20px;" class="text-center">
                    <el-button style="width:160px;background-color:#212537;color:white" @click="showFeeEvaluation"><span style="font-size:18px;">点击查询 <i class="fas fa-search"></i></span> </el-button>
                </div>
                <el-collapse-transition>
                    <div class="pl-4 pr-4 mt-4" style="margin-bottom:20px;" v-if="searchSign">
                        <el-table
                            :data="expressInfo"
                            style="width: 100%;font-size:14px;color:black;">
                            <el-table-column
                            label="渠道选择"
                            prop="label"
                            width="100"
                            align="center"
                            >
                            <template slot-scope="{row}">
                                <img class="pt-1 pb-1" :src="row.icon" style="width:80%;">
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="计费重量(kg)"
                             width="140"
                             align="center"
                            >
                            <template slot-scope="{row}">
                                <span class="text-center">
                                     {{ row.realWeight  }} 
                                </span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="首重金额(元)"
                            width="150"
                            prop="firstAmount"
                            align="center"
                            sortable
                            >
                            <template slot-scope="{row}">
                                <span><i class="fas fa-yen-sign mr-2 text-danger" style="font-size:20px;"></i>{{ row.firstAmount  }} / 500g</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="续重金额(元)"
                            width="150"
                            prop="secondAmount"
                            align="center"
                            sortable
                            >
                            <template slot-scope="{row}">
                                <span><i class="fas fa-yen-sign mr-2 text-danger" style="font-size:20px;"></i>{{ row.secondAmount  }} / 500g</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="总金额(元)"
                            width="140"
                            prop="totalAmount"
                            align="center"
                            sortable>
                            <template slot-scope="{row}">
                                <span><i class="fas fa-yen-sign mr-2 text-danger" style="font-size:20px;"></i>{{ row.totalAmount  }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="送达时效(工作日)"
                            width="180"
                            prop="deliveryTime"
                            align="center"
                            sortable>
                            <template slot-scope="{row}">
                                <span><i class="far fa-calendar-alt mr-2 text-success" style="font-size:20px;"></i>{{ row.deliveryTime  }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="备注"
                            align="center"
                            >
                            <template slot-scope="{row}">
                                <span style="color:gray;font-size:12px;">{{ row.note  }}</span>
                            </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            <p class="text-danger text-center mt-4"><i class="fas fa-exclamation-circle"> </i> 温馨提醒</p>
                            <p>1、此估算费用只含运费的基本费用，不含增值服务费用及其它费用。</p>
                            <p>2、此估算费用仅为费用参考，具体费用以实际为准。</p>
                            <p>3、包裹时效为最近一个月系统统计的参考时效，仅做为参考，暂不提供绝对时效产品。</p>
                            <p>4、如无特殊说明，所有的计算费用都为人民币费用。</p>
                            <p>5、不同的国家海关政策会随时调整，有可能部分国家的包裹需要寄件人提供相关资料协助清关。</p>
                            <p  style="cursor:pointer" @click="dialogVisible = true">6、详请可添加客户作了解。
                                <span><b>联系微信 : </b> MUAMUAYVETTE</span>
                                <i class="fas fa-search ml-1"></i>
                            </p>
                        </div>
                        <div class="text-center mt-4">
                            <el-button @click="searchSign=false">返回</el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <el-dialog
                title="扫描添加客服微信"
                :visible.sync="dialogVisible"
                width="400px"
            >
                <img
                    class="mx-auto d-block"
                    src="/images/weixinCode.png"
                />
            </el-dialog>
        </div>               
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api';
import {calculateFee} from '../../../utils/function';
export default {
    setup(props, {root:{$message}}){
        const searchSign = ref(false);
        
        const dialogVisible = ref(false);

        const expressOptions = reactive([
            {
                label:"DHL",
                value:"1",
                time:"10",
                note: "挺好",
                icon: '/images/ExpressIcon/dhl.png'
            },
            {
                label:"UPS",
                value:"2",
                time:"11",
                note: "贵",
                icon: "/images/ExpressIcon/ups.png",
            },
            {
                label:"FedEx",
                value:"3",
                time:"12",
                note: "速度快",
                icon: "/images/ExpressIcon/fedex.png",
            },
            {
                label:"TNT",
                value:"4",
                time:"13",
                note: "不认识",
                icon: "/images/ExpressIcon/tnt.png",
            },
            {
                label:"EMS",
                value:"5",
                time:"14",
                note: "式神饿吗",
                icon: "/images/ExpressIcon/ems.png",
            },
            {
                label:"Andy专线",
                value:"6",
                time:"15",
                note: "牛逼",
                icon: "/images/ExpressIcon/special.png",
            },
        ]);

        const goodsTypeOptions = reactive([
            {
                label:"普通货物",
                value:"0",
            },
            {
                label:"粉末货物",
                value:"1",
            },
            {
                label:"食品货物",
                value:"2",
            },
            {
                label:"敏感类",
                value:"3",
            },
            {
                label:"液体货物",
                value:"4",
            },
            {
                label:"体积货物",
                value:"5",
            },
        ]);

        const evaluationForm = reactive({
            deliverRegion: '',
            goodWeight: 1,
            goodType:'',
            goodLength:1,
            goodWidth:1,
            goodHeight:1,
        });

        const tableData = ref([]);

        const showFeeEvaluation = () =>{
            if(evaluationForm.deliverRegion ==='' || evaluationForm.goodType ===''){
                $message.error("请填写完整信息");
            }
            else{
                tableData.value = calculateFee(parseInt(evaluationForm.goodWeight), parseInt(evaluationForm.goodType), 
                parseInt(evaluationForm.goodLength), parseInt(evaluationForm.goodWidth), parseInt(evaluationForm.goodHeight), expressOptions);
                searchSign.value = true;
            }
            
        };

        const expressInfo = computed(()=>{
            return tableData.value;
        })

        return{
            searchSign,
            showFeeEvaluation,
            expressOptions,
            goodsTypeOptions,
            evaluationForm,
            expressInfo,
            dialogVisible 
        }
    }
}
</script>

<style lang="scss" scoped>
.bodystyle{
       padding-bottom: 100px;
       width:100%;
       margin:0 auto;
       background-image:url(/images/FeeEvalBG.png);
       background-size: 100% 100%;
       z-index:-1;
       height:300px;
       top:0;
       opacity: 0.5;
}
.textstyle{
     z-index:2;
     opacity: 0.99;
     margin-top:-220px;
     font-weight:700;
}
.formstyle{
    box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.75);
    width:70%;
    margin:0 auto;
    z-index:2;
    margin-top:60px;
    background:rgba(255,255,255,1);
    opacity: 0.99;
    margin-bottom:40px;
}

.input-width{
    width:calc(100%-110px);
}
.el-input-number--small {
    width: 100%;
}

@media only screen and (max-width: 576px) {
  .formstyle {
    width:95%;
  }
}

    
</style>