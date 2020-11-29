import axios from "axios"

const instance = axios.create({
  baseURL:"/api",//用 / 即代表当前服务器地址
  headers:{},
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {


    return config
  }
)

//响应拦截器
instance.interceptors.response.use(
  (response) =>{
    if(response.data.code === 200){
      //功能成功，返回所需数据
      return response.data.data
    }
    //功能失败，需要返回一个失败状态的promise对象  
    return Promise.reject(response.data.message)
  },
  (err) =>{
    const message = err.message || "网络出错了"
    return Promise.reject(message)
  }
)