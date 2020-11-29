import request from '@utils/request'

//封装请求获取首页三级分类数据函数
export const reqGetBaseCategoryList = () =>{
  return request({
    method:'GET',
    url:'/product/getBaseCategoryList'
  })
}