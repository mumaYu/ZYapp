import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Welcome from '@/components/welcome'
import Me from '@/components/me'


import JingXuan from '@/components/indexchilder/jinxuan'
import Video from '@/components/video'
import Top from '@/components/indexchilder/top'
import Img from '@/components/indexchilder/img'
import Article from '@/components/indexchilder/article'
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'jx',
          name: 'jx',
          component: JingXuan,
        },
        
        {
          path: 'top',
          name: 'top',
          component: Top,
        },
        {
          path: 'img',
          name: 'img',
          component: Img,
        },
        {
          path: 'article',
          name: 'Article',
          component: Article,
        }
      ]
    },
    {
      path: '/video',
      name: 'video',
      component: Video,
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  // if(to.name == "Me"){
  //   if(localStorage.getItem("name") == null || localStorage.getItem("email") == null){
  //     alert("需要登录")
  //     next()
  //   }else {
  //     next()
  //   }
  // }else {
  //   next()
  // }
  
})

export default router