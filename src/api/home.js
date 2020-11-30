import request from '@utils/request'
import mockRequest from '@utils/mockRequest'

//封装请求获取首页三级分类数据函数
export const reqGetBaseCategoryList = () =>{
  return request({
    method:'GET',
    url:'/product/getBaseCategoryList'
  })
}

//封装请求轮播图数据函数
export const reqGetBanners = () =>{
  return mockRequest({
    method:'GET',
    url:'/banners'
  })
}

//封装请求楼层数据函数
export const reqGetFloors = () =>{
  return mockRequest({
    method:'GET',
    url:'/floors'
  })
}