<template>
  <el-pagination
    background
    :layout="pagerLayout"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
  >
  </el-pagination>
</template>

<script>
import { computed, ref } from "@vue/composition-api";
export default {
  name: "pagination",
  props: ["pager", "data", "limitNumber"],
  setup(props, { emit }) {
    //fetch pager from props
    const pagerLayout = computed(() => {
      if(props.data.length >= props.limitNumber){
        return props.pager;
      }
      else{
        return "prev, pager, jumper, ->, total, slot";
      }
    });
    //the current page number
    const currentPage = ref();
    //handle the page change 
    const handleCurrentChange = val => {
      currentPage.value = val
      emit("pagechange", val);
    };
    return {
      pagerLayout,
      currentPage,
      handleCurrentChange
    };
  }
};
</script>