//Detail组件的vuex状态数据

import {reqGetProductDetail} from '@api/detail'

export default {
  state:{
    productDetail:{
      categoryView:{},//商品分类数据
      skuInfo:{},     //商品详情数据
      spuSaleAttrList:[],//商品具体属性数据
    }
  },
  getters:{
    categoryView(state) {
      return state.productDetail.categoryView
    },
    skuInfo(state) {
      return state.productDetail.skuInfo
    },
    spuSaleAttrList(state) {
      return state.productDetail.spuSaleAttrList
    },
  },
  actions:{
    async getProductDetail({commit},id){
      const productDetail = await reqGetProductDetail(id)
      commit('GET_PRODUCT_DETAIL',productDetail)
    }
    
  },
  mutations:{
    GET_PRODUCT_DETAIL(state,productDetail){
      state.productDetail = productDetail
    }
  },
}