<template  lang="pug">
    .welcome
      .welcome-top
        swiper(:options="swiperOption", ref="mySwiper")
            swiper-slide 
              img(src="../assets/img/qd1.png")
            swiper-slide 
              img(src="../assets/img/qd2.png")
            swiper-slide
              img(src="../assets/img/qd3.png")
            .swiper-pagination(slot="pagination")
      .welcome-bottom
         mu-flex.flex-demo(justify-content="center" align-items="center" direction="column") 生活不止眼前的苟且，还有解决不了的BUG
          mu-button(flat="", color="secondary" @click="GoIndex") 进入首页

</template>


<script>
export default {
    mounted() {
        this.$parent.$data.isShow = false
        this.$parent.$data.isShowBottom = false

    },
    beforeRouteLeave (to, from, next) {
      this.$parent.$data.isShow = true
      this.$parent.$data.isShowBottom = true
      next()
    },
    data () {
        return {
            message: "我是启动欢迎页面",
            swiperOption: {
                pagination: {
                  el: '.swiper-pagination',
                }
          }
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      GoIndex(){
        this.$router.replace({ path: '/index/jx' })
      }
    }
}
</script>


<style scoped lang="less">
@import "./../assets/css/main.less";
@import "./../assets/css/page/welcome.less";

</style>

