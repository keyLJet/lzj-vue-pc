//获取商品详情数据的接口函数
import request from '@utils/request'

export const reqGetProductDetail = (id) => {
  return request({
    method:'GET',
    url:`/item/${id}`,
  })
}