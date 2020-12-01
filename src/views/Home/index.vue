<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼 层-->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import Brand from "./Brand/Brand";
import Floor from "./Floor/Floor";
import Like from "./Like/Like";
import ListContainer from "./ListContainer/ListContainer";
import Rank from "./Rank/Rank";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import TypeNav from "@comps/TypeNav";

import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState({
      floors: (state) => state.home.floors,
    }),
  },
  methods: {
    ...mapActions(["getFloors"]),
  },
  mounted() {
    this.getFloors();
  },
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
    TypeNav,
  },
};
</script>

<style lang="less" scoped>
</style>