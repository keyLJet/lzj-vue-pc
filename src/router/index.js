// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Register from '../views/Register'
import Login from '../views/Login'
import Search from '../views/Search'
import Detail from '../views/Detail'
import AddCartSuccess from '../views/AddCartSuccess'
import ShopCart from '../views/ShopCart'


Vue.use(VueRouter)

//为了解决编程式导航重复点击时报错的问题：
//重写push和replace方法,它在VueRouter构造函数的原型上
const push = VueRouter.prototype.push
const replace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location,onComplete,onAbort) {
  if(onComplete && onAbort) {
    //如果用户要处理失败
    return push.call(this,location,onComplete,onAbort)
  }
  //如果用户不处理失败，则给默认值空函数
  return push.call(this,location,onComplete,() => {})
}

VueRouter.prototype.replace = function(location,onComplete,onAbort) {
  if(onComplete && onAbort) {
    //如果用户要处理失败
    return replace.call(this,location,onComplete,onAbort)
  }
  //如果用户不处理失败，则给默认值空函数
  return replace.call(this,location,onComplete,() => {})
}

export default new VueRouter({
  routes:[
    {
      path:'/',
      component:Home
    },
    {
      path:'/register',
      component:Register,
      // 组件加载时，meta参数会传到$route中
      meta:{
        isFooterHide:true,
      }
    },
    {
      path:'/login',
      component:Login,
      meta:{
        isFooterHide:true,
      }
    },
    { 
      name:'search',
      path:'/search/:searchText?',// ?代表params参数可选
      component:Search
    },
    {
      name:'detail',
      path:'/detail/:id',
      component:Detail,
    },
    {
      name:'shopCart',
      path:'/shopCart',
      component:ShopCart,
    },
    {
      name:'addCartSuccess',
      path:'/addCartSuccess',
      component:AddCartSuccess,
    },
  ],
  //设置切换前端路由时，滚动条的初始位置
  scrollBehavior(){
    return {
      x:0,
      y:0,
    }
  },
})