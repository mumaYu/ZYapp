<template lang="pug">
    page
        a(href='"http://www.ledu365.com/"+item.infoUrl')
        | {{item.p}}

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
          url: 'wzinfo',
          // par: {
          //   page: this.num
          // }
        }, res =>{
          this.list =res.data
          // this.num = parseInt(res.data.maxPage)
          // this.list = this.list.concat(res.data.datas)
        })
      },
      GetComment(id, infoUrl) {
        this.clickSaveId = id
        if(this.HiddenOrShow) {
          this.isShowComment = false
          this.HiddenOrShow = false
        } else {
          this.$http.Get({
            url: 'tucao',
            par: {
              infoUrl: infoUrl
            }
          }, (res) =>{
            this.commentList = res.data.tucao
            this.isShowComment = true
            this.HiddenOrShow = true
          })
        }
      },
    }
}
</script>

<style lang="less" scoped>

</style>
