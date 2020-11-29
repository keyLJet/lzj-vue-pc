<template>
  <div>
    Login组件内容...
    <button @click="login">login</button>
  </div>
</template>

<script>
import { reqLogin } from "@api/user";

export default {
  name: "Login",
  methods: {
    login() {
      reqLogin('13700000000','111111')
      .then((res) =>{
        console.log('res',res)
      })
      .catch((err) =>{
        console.log('err',err)
      })
    },
  },
};
</script>

<style lang="less" scoped>
</style>
