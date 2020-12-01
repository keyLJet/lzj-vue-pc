//Search组件的状态数据

import { reqGetProductList } from "@api/search";

export default {
  state: {
    productList: {
      trademarkList: [], // 品牌数据  SearchSelector组件
      attrsList: [], // 品牌属性数据  SearchSelector组件
      goodsList: [], // 商品数据==> Search组件
    },
  },
  getters: {
    // 方便使用数据,提取trademarkList，attrsList，goodsList
    trademarkList(state) {
      return state.productList.trademarkList;
    },
    attrsList(state) {
      return state.productList.attrsList;
    },
    goodsList(state) {
      return state.productList.goodsList;
    },
  },
  actions: {
    //data为搜索请求需要携带的相关参数，默认值为空对象
    async getProductList({ commit }, data = {}) {
      const productList = await reqGetProductList(data);
      commit("GET_PRODUCT_LIST", productList);
    },
  },
  mutations: {
    GET_PRODUCT_LIST(state, productList) {
      state.productList = productList;
    },
  },
};
