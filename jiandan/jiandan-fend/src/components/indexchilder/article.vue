<template lang="pug">
  .pap
    .list(v-for="(item,index) in list" :key="index")
      .list-left
        img(:src="item.img")
      |       
      .list-right
        a(href="./wzinfo")
          .title 
            span {{item.userid}}
          .cont {{item.cont}}

</template>

<script>
export default {
    mounted(){
      this.GetData()
    },
    data(){
      return {
        list: [],
        // refreshing: false,
        // loading: false,
      }
    },
    methods: {
      // 获取列表数据
      GetData () {
        this.$http.Get({
          url: 'wzlist',
          // par: {
          //   page: this.num
          // }
        }, res =>{
          this.list =res.data
          // this.num = parseInt(res.data.maxPage)
          // this.list = this.list.concat(res.data.datas)
        })
      },
    }
}
</script>

<style lang="less" scoped>
.pap{
  margin-top: 50px;
  .list{
    // border: 1px solid red;
    padding: 0.2rem;
    width: 100%;
    height: 6rem;
    margin-bottom: 5px;
    .list-left{
    width: 5rem;
    height: 5rem;
    float: left;
    // border: 1px solid red;
    display: block;
      img{
        width: 5rem;
        height: 5rem;
      }
    }
    .list-right{
      width: 17.5rem;
      height: 5.5rem;
      display: block;
      // border: 1px solid red;
      float: right;
      a{
        color: black;
        text-decoration: none;
        .title{
        // width: 17rem;
        // height: 2rem;
        span{
          font-size: 13px;
          font-weight: bold;
          // border: 1px solid blue;
        }
      }
      .cont{
        font-size: 12px;
        text-indent: 2em;
        // border: 1px solid orangered;
        // width: 17rem;
        // height: 2rem;
      }
      }
      
    }
  }
}
</style>
