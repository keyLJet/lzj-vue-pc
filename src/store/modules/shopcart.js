import {reqGetCartList,
	reqUpdateCartCheck,
	reqUpdateCartCount,
  // reqDelCart,
} from "@api/shopcart"

export default {
	state: {
		cartList: [], 
	},
	getters: {},
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