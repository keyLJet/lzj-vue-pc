<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- <Footer v-if='isFooterShow' /> -->
    <!-- <Footer v-if='$route.path !== "/login" && $route.path !== "/register"' /> -->
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>

<script>
import Header from "@comps/Header";
import Footer from "@comps/Footer";

export default {
  name: "App",
  data() {
    return {
      isFooterShow: true,
    };
  },
  components: {
    Header,
    Footer,
  },
  /*   watch:{
    $route:{
      handler(newVal){
        this.isFooterShow = 
          newVal.path !== '/login' &&  newVal.path !== '/register'
      },
      immediate:true,
    }
  }, */
};
</script>

<style>
</style>