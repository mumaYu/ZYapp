<template  lang="pug">
    .picture 
      mu-grid-list.gridlist-demo
        //- mu-text-field(v-model='inputSearch', placeholder='输入搜索关键字')
        mu-grid-tile(v-for='(item, index) in picList', :key='index')
            img(:src='"http://img.hb.aicdn.com/"+item.file.key+"_fw236"')
            span(slot='subTitle')  
            b {{ item.username }}
</template>

<script>
export default {
    mounted() {
        this.GetPic()
    },
    data() {
        return{
            picList:[],
            inputSearch:null
        }
    },
    methods:{
        GetPic(){
            this.$http.Get({
                url:'huabangaoxiao',
                // par:{
                //     q:'壁纸'
                // }
            },(res) => {
                this.picList = res.data.pins
                // console.log(pic)
                // for(var i=0;i<pic.length;i++){
                //     this.picList.push(pic[i].user)
                // }
                // console.log(this.picList)
                // this.picList = pic
                // console.log(video)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/main.less";
// @import "./../../assets/css/page/picture.less";
</style>

    //- mu-paper
    //-   mu-list(textline="three-line")   
    //-     mu-list-item(v-for="(item,index) in list" :key="index")
        
    //-       mu-avatar
    //-       img(:src="item.img")
    //-       |       
    //-       mu-list-item-content
    //-       mu-list-item-title {{item.userid}}
    //-       |         
    //-       mu-list-item-sub-title
    //-         span(style="color: rgba(0, 0, 0, .87)") {{item.cont}}
    //-   |     
    //-   mu-divide

