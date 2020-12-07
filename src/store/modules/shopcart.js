import {
  reqGetCartList,
  reqUpdateCartCheck,
  reqUpdateCartCount,
  reqDelCart,
} from "@api/shopcart";

export default {
  state: {
    cartList: [],
  },
  getters: {
    //选中商品数量
    totalCount(state) {
      return state.cartList.reduce(
        (p, cart) => p + (cart.isChecked === 1 ? cart.skuNum : 0),
        0
      );
    },
    //选中商品总价
    totalPrice(state) {
      return state.cartList.reduce(
        (p, cart) => p + cart.skuNum * cart.cartPrice,
        0
      );
    },
    //是否全部选中
    isCheckAll(state) {
      // 如果数组中每个都选中就返回true, 否则是false
      return (
        state.cartList.length > 0 &&
        state.cartList.every((item) => item.isChecked === 1)
      );
    },
  },
  actions: {
    async getCartList({ commit }) {
      const cartList = await reqGetCartList();
      commit("GET_CART_LIST", cartList);
    },
    async updateCartCount({ commit }, { skuId, skuNum }) {
      await reqUpdateCartCount(skuId, skuNum);

      //手动更新vuex中数据，页面随之更新渲染(可少向服务器请求一次购物车数据，有利于页面性能提高)
      commit("UPDATE_CART_COUNT", { skuId, skuNum });
    },
    async updateCartCheck({ commit }, { skuId, isChecked }) {
      await reqUpdateCartCheck(skuId, isChecked);
      console.log(commit);
    },
    async delCart ({commit}, skuId) {
      console.log(commit);
      await reqDelCart(skuId)
     
    },

    /* async checkAllCartItems ({commit, state, dispatch}, checked) {
      console.log(commit)
      // 确定对应的isChecked值
      const isChecked = checked ? '1' : '0'
      let promises = []
  
      // 遍历每个购物项
      state.cartList.forEach(item => {
        // 购物项的状态与目标状态不一样
        if (item.isChecked!=isChecked) {
          // 分发给checkCartItem, 得到其返回的promise对象
          const promise = dispatch('checkCartItem', {skuId: item.skuId, isChecked})
          // 保存到数组中
          promises.push(promise)
        }
      })
  
      // 此时请求发出去没有? 已经发了
      // 返回promise对象(只有所有dispatch都成功了才成功, 否则就是失败的)
      return Promise.all(promises) 
    }, */
  },
  mutations: {
    GET_CART_LIST(state, cartList) {
      state.cartList = cartList;
    },
    //手动更新vuex中购物车商品数量数据
    UPDATE_CART_COUNT(state, { skuId, skuNum }) {
      state.cartList = state.cartList.map((cart) => {
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart;
      });
    },
  },
};
