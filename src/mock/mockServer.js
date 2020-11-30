import Mock from 'mockjs'
import banners from './rbanners.json'
import floors from './rfloors.json'

// 参数1为拦截请求对应的请求地址，参数3为返回的响应mock数据
Mock.mock('/mock/banners','get',{
  code:200,
  'data|4':banners,
})

Mock.mock('/mock/floors','get',{
  code:200,
  'data|2-5':floors,
})