import request from "@utils/request"

//封装登陆请求功能函数
export const reqLogin = (phone,password) =>{
  return request({
    method:"POST",
    url:"/user/passport/login",
    data:{
      phone,
      password,
    },
  })
}