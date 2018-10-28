<template lang="pug">
    .index_duanzi
     mu-load-more
      .duanzi(v-for="(item,index) in list" :key="index")
       .duanzi-header
         img(:src="item.headimg")
         span {{item.author}}
       .duanzi-content {{item.content}}
       .duanzi-action
         .action-lef
           mu-button.like(color="orange400" icon @click="SetLike('like',index,item.posid)") {{item.like}}
             mu-icon(value="thumb_up")
           mu-button(color="grey500" icon @click="SetLike('unlike',index,item.posid)")  {{item.unlike}}
             mu-icon(value="thumb_down")
         .action-right
           mu-button(color="grey400" icon)
             mu-icon(value="chat")
             // mu-load-more(@refresh="refresh", :refreshing="refreshing")
</template>


<script>
export default {
  // inject: ['reload'],
    mounted(){
      this.GetData()
    },
    data(){
      return {
        list: [],
        // refreshing: false,
      }
    },
    methods: {
      // // 顶部下拉刷新页面
      // refresh () {
      //   this.refreshing = true;
      //   setTimeout(() => {
      //     this.refreshing = false;
      //     // 刷新页面
      //     this.reload()
      //   }, 2000)
      // },
      // 获取列表数据
      GetData () {
        this.$http.Get({
          url: 'topduan'
        }, res =>{
          // console.log(res)
          this.list =res.data
          //console.log(res)
           //this.list = this.list.concat(res.data.datas)
        })
      },
      // 喜欢 / 不喜欢
      SetLike(action,id,postid){
          this.$http.Post({
            url: "like",
            par: {
              postid: postid,
              type: action
            }
          },res =>{
            var status = JSON.parse(res.data.postid)
            if(status.error == 0){
              if(action == 'like'){
                this.list[id].like = parseInt(this.list[id].like) + 1
                this.$toast.success('点赞成功')
              }else {
                this.list[id].unlike = parseInt(this.list[id].unlike) + 1
                this.$toast.success('吐槽成功')
              }
            }else {
              this.$toast.error('你已经投过票了');
            }
          })
      }
    }
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/main.less";
@import "./../../assets/css/page/jinxuan.less";
</style>
