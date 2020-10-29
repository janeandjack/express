<template>
    <div id="expresstracking">
        <div class="bodystyle">
        </div>
        <div class="formstyle">
            <h1 class="text-center font-weight-bold">单号查询</h1>
            <p class="text-center font-weight-bold">您可以通过单号查询您的货流信息</p>
            <div class="div_width">
                <div class="pt-4 pl-4 pr-4 ">
                    <div class="input-group input-group ">
                        <div class="input-group-prepend">
                            <span class="input-group-text" style="background-color:#212537;color:white;border-radius:0px;">物流单号</span>
                        </div>
                        <input v-model="trackingNumber" placeholder="请输入您的物流单号" type="text" class="form-control">
                        <div class="input-group-append">
                            <button class="button" style="width:80px;background-color:#212537;color:white" type="button"  @click="findTrackingInfo"><i class="fas fa-search" style="font-size:18px;color:white"></i></button>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div v-if="trackingShowSign" style="background-color:white;box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.75);">
                            <div style="padding-top:80px;text-align:center;">
                                <el-image src="../images/findError.svg"></el-image>
                                <div class="text-danger">
                                    <i class="fas fa-exclamation-circle"> </i> 
                                    对不起，没有查询到相关包裹
                                </div>
                                <div class="" style="font-size:14px;"> 
                                    请输入正确的包裹单号或者运单号进行查询
                                </div>
                            </div>
                            <div class="text-center" style="margin-top:90px;padding-bottom:15px;">
                                <el-button @click="trackingShowSign=false">返回</el-button>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div> 
            </div>  
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';
export default {
    setup(props,{root:{$message}}){
        const trackingNumber = ref("");
        const trackingShowSign = ref(false);
        const findTrackingInfo = () =>{ 
            if(trackingNumber.value ==''){
                $message.error('请输入包裹号')
            }
            else{
                trackingShowSign.value=true;
            }
        };

        return{
            trackingShowSign,
            trackingNumber,
            findTrackingInfo
        }
    }
}
</script>

<style lang="scss" scoped>
   .bodystyle{
       width:100%;
       margin:0 auto;
       opacity: 0.5;
       background:url(/images/ExpressTracking.png);
       background-size: 100% 100%;
       height:350px;
       z-index:-1;
   }
   .input-group-text{
       border: none !important;
   }
   .button{
       border: none !important;
   }
   .formstyle{
       z-index:2;
       opacity:0.99;
       margin-top:-250px;
   }
   .div_width{
       width:70%;
       margin:0 auto;
   }
    @media only screen and (max-width: 576px) {
        .div_width{
            width:95%;
        }
    }
</style>
