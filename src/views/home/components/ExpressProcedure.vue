<template>
    <div id="expressprocedure" style="margin-bottom:30px;">
        <div class="bodystyle">  
        </div>
        <div class="textstyle">
            <h1 class="text-center  font-weight-bold">快递流程</h1>
            <p class="text-center  font-weight-bold">您可以通过快递流程查看您的进程</p>
        </div>
        <div class="text-center">
            <img class="formstyle" src="/images/ExpressProcedure.png" alt="">
        </div>
    </div>               
</template>

<style lang="scss" scoped>
.bodystyle{
       padding-bottom: 100px;
       width:100%;
       margin:0 auto;
       background-image:url(/images/ExpressProBG.png);
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
}
.formstyle{
    width:70%;
    margin:0 auto;
    z-index:2;
    margin-top:60px;
    opacity: 0.99;
}
@media only screen and (max-width: 576px) {
  .formstyle {
    width:95%;
  }
}
.input-width{
    width:calc(100%-140px);
}
</style>