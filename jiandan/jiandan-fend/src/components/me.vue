<template lang="pug">
    .me
      .head
          img(src="http://img4.imgtn.bdimg.com/it/u=2366463909,489903727&fm=26&gp=0.jpg")
          p.user zhouyu
          p 生活不止眼前的苟且，还有代码和解决不了的BUG
      mu-container
        mu-expansion-panel
          div(slot='header') 我的收藏
          |     生活不止眼前的苟且，还有代码和解决不了的BUG
          mu-button(slot='action', flat='') Cancel
          mu-button(slot='action', flat='', color='primary') Save
        mu-expansion-panel
          div(slot='header') 我的钱包
          |     生活不止眼前的苟且，还有代码和解决不了的BUG
        mu-expansion-panel
          div(slot='header') 设置
          |     生活不止眼前的苟且，还有代码和解决不了的BUG


</template>
<script>
export default {
    mounted() {
        this.$parent.$data.isShow = false

    },
    beforeRouteLeave (to, from, next) {
      this.$parent.$data.isShow = true
      next()
    }
}
</script>

<style lang="less" scoped>
@import "./../assets/css/page/me.less";
@import "./../assets/css/main.less";
</style>
