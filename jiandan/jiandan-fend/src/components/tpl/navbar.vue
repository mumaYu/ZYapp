<template lang="pug">
  
  .nav-bar-menu
    .scroll
      ul
        li
          router-link(to="/index/jx") 精选段子
        //- li
        //-   router-link(to="/index/video") 视频
        li
          router-link(to="/index/article")  文章
        li
          router-link(to="/index/img") 图片
        li
          router-link(to="/index/top") 热门段子

       
</template>


<script>
export default {
    
}
</script>


<style scoped lang="less">
@import "./../../assets/css/main.less";
@import "./../../assets/css/page/navbar.less";
</style>
