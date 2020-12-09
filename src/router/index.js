// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "Home" */"../views/Home");
const Register = () => import(/* webpackChunkName: "Register" */"../views/Register");
const Login = () => import(/* webpackChunkName: "Login" */"../views/Login");
const Search = () => import(/* webpackChunkName: "Search" */"../views/Search");
const Detail = () => import(/* webpackChunkName: "Detail" */"../views/Detail");
const AddCartSuccess = () => import(/* webpackChunkName: "AddCartSuccess" */"../views/AddCartSuccess");
const ShopCart = () => import(/* webpackChunkName: "ShopCart" */"../views/ShopCart");
const Center = () => import(/* webpackChunkName: "Center" */"../views/Center");
const Pay = () => import(/* webpackChunkName: "Pay" */"../views/Pay");
const PaySuccess = () => import(/* webpackChunkName: "PaySuccess" */"../views/PaySuccess");
const Trade = () => import(/* webpackChunkName: "Trade" */"../views/Trade");

import store from '../store'

Vue.use(VueRouter);

//为了解决编程式导航重复点击时报错的问题：
//重写push和replace方法,它在VueRouter构造函数的原型上
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    //如果用户要处理失败
    return push.call(this, location, onComplete, onAbort);
  }
  //如果用户不处理失败，则给默认值空函数
  return push.call(this, location, onComplete, () => {});
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    //如果用户要处理失败
    return replace.call(this, location, onComplete, onAbort);
  }
  //如果用户不处理失败，则给默认值空函数
  return replace.call(this, location, onComplete, () => {});
};

const router = new VueRouter({
  mode:'history',
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/register",
      component: Register,
      // 组件加载时，meta参数会传到$route中
      meta: {
        isFooterHide: true,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isFooterHide: true,
      },
    },
    {
      name: "search",
      path: "/search/:searchText?", // ?代表params参数可选
      component: Search,
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail,
    },
    {
      name: "shopCart",
      path: "/shopCart",
      component: ShopCart,
    },
    {
      name: "addCartSuccess",
      path: "/addCartSuccess",
      component: AddCartSuccess,
      beforeEnter:(to,from,next) =>{
        if(from.name === 'detail' && window.sessionStorage.getItem('SKU_INFO_KEY')){
          return next()
        }
        next('/shopCart')
      },
    },
    {
      name: "center",
      path: "/center/myorder",
      component: Center,
    },
    {
      name: "pay",
      path: "/pay",
      component: Pay,
    },
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: PaySuccess,
    },
    {
      name: "trade",
      path: "/trade",
      component: Trade,
    },
  ],
  //设置切换前端路由时，滚动条的初始位置
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

//配置全局前置守卫
const permisionPaths = ['/pay','/center/myorder','/trade','/paysuccess']

router.beforeEach((to,from,next) =>{
  if(permisionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
    return next('/login')
  }
  next()
})

export default router
