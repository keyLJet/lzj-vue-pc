<template>
  <div>
    Login组件内容...
    <!-- <el-button type="primary" @click="login">登陆</button> -->
    <button  @click="login">登陆</button>
    </div>
</template>

<script>
import { reqLogin } from "@api/user";

export default {
  name: "Login",
  methods:{
    // 测试登录
    login() {
      reqLogin("13700000000", "1111111")
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  }
};
</script>

<style lang="less" scoped>
</style>
