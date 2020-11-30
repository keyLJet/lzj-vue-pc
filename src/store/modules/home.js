import { reqGetBaseCategoryList,reqGetBanners, reqGetFloors } from "@api/home";

export default {
  state: {
    categoryList: [],
    banners:[],
    floors:[],
  },
  getters: {},
  actions: {
    //获取三级分类数据
    async getCategoryList({ commit }) {
      let categoryList = await reqGetBaseCategoryList();
      categoryList = categoryList.slice(0,15)
      commit("GET_CATEGORY_LIST", categoryList);
    },
    //获取轮播图数据
    async getBanners({ commit }) {
      const banners = await reqGetBanners();
      commit("GET_BANNERS", banners);
    },
    //获取楼层数据
    async getFloors({ commit }) {
      const floors = await reqGetFloors();
      commit("GET_FLOORS", floors);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    GET_BANNERS(state, banners) {
      state.banners = banners;
    },
    GET_FLOORS(state, floors) {
      state.floors = floors;
    },
  },
};
