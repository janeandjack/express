<template>
<div>
  <div class="wow fadeInUp" data-wow-delay="0.2s">
    <h2 class="text-center pt-5 pb-5">
      <span class="mr-3"
        ><span class="d-none d-xl-inline">——————————</span>————<span
          class="ball align-middle"
        ></span>
      </span>
      Andy Express
      <span class="ml-3">
        <span class="ball align-middle"></span
        ><span class="d-none d-xl-inline">——————————</span>————</span
      >
    </h2>
  </div>
  <div class="wow fadeInUp" data-wow-delay="0.2s">
    <el-row>
      <el-col
        :lg="8"
        :md="8"
        :sm="8"
        :xs="24"
        v-for="(itemObject,index) in navigationBarInfo" :key="index"
      >
    <a :href="itemObject.id">
      <el-card class="box-card cardBackground" @click.native="highLight(navigationBarInfo, index)">
        <div style="font-size:18px;" class="text-center" :class="itemObject.isActive === 1 ?'HighLightText':'noHighLightText'">
          <span class="mr-1">{{itemObject.name}}</span> <i :class="itemObject.icon"></i>
        </div>
      </el-card>
    </a> 
    </el-col>
    </el-row>
  </div>
  <ExpressFeeEvaluation class="wow fadeInUp" data-wow-delay="0.2s" />
  <ExpressTracking  class="wow fadeInUp" style="margin-top:80px;" data-wow-delay="0.2s" />
  <ExpressProcedure class="wow fadeInUp" style="margin-top:180px;" data-wow-delay="0.2s" />
</div>
  
</template>

<script>
import { reactive, ref, } from '@vue/composition-api';
import ExpressFeeEvaluation from '../home/components/ExpressFeeEvaluation'
import ExpressTracking from '../home/components/ExpressTracking'
import ExpressProcedure from '../home/components/ExpressProcedure'
export default {
  components:{
    ExpressFeeEvaluation,
    ExpressTracking,
    ExpressProcedure,
  },
  setup(){

    const activeCard= ref("#expressfeeevaluation");

    const navigationBarInfo = reactive([
      {
        name:"运费估算",
        icon:"fas fa-calculator",
        id:"#expressfeeevaluation",
        isActive:0,
      },
      {
        name:"单号查询",
        icon:"fas fa-search",
        id:"#expresstracking",
        isActive:0,
      },
      {
        name:"快递流程",
        icon:"fas fa-kaaba",
        id:"#expressprocedure",
        isActive:0,
      },
    ]);

    const highLight = (navigationBarInfo, index) =>{
      for(let item of navigationBarInfo){
        item.isActive = 0;
      }
      navigationBarInfo[index].isActive = 1;
    }

    return{
      navigationBarInfo,
      activeCard,

      highLight
    }
  }
}
</script>

<style lang="scss" scoped>
.ball {
  display: inline-block;
  width: 13px;
  height: 13px;
  background-color: #000;
  border-radius: 50%;
}
h2 {
  @media (max-width: 576px) {
    font-size: 20px !important;
  }
}
a{
  color:white !important;
  text-decoration: none !important;
  cursor:pointer;
}
.HighLightText{
  color: #f39c12;
}
.noHighLightText{
  color: white;
}
.cardBackground{
  background-color: #212537;
}
</style>
