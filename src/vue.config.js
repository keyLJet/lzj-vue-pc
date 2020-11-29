const path = require("path")

module.exports = {
  // lintOnSave:false,// 关闭ESLint的规则检查
  configureWebpack:{
    resolve:{
      alias:{
        "@api":path.resolve(__dirname,"src/api"),
        "@assets":path.resolve(__dirname,"src/assets"),
        "@comps":path.resolve(__dirname,"src/components"),
        "@store":path.resolve(__dirname,"src/store"),
        "@utils":path.resolve(__dirname,"src/utils"),
        "@views":path.resolve(__dirname,"src/views"),
      },
    }
  },
  devServer:{
    proxy:{
      "/api":{
        target:"http://182.92.128.115",
        changeOrigin:true,
      }
    }
  }
}