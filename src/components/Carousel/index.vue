<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in carouselList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入轮播图插件及其css样式
//swiper6之后还需另外引入Navigation Pagination,并以插件形式使用
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  props: {
    carouselList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    //为确保数据就绪之后，再进行new Swiper，将此操作放在监视属性中。因为只有当carouselList（banners）数据变化的时候，才会触发以下函数
    carouselList() {

      // 通过判断，确保swiper不能new多次
      if (this.swiper) return;

      // $nextTick确保当前页面更新完成后触发其中回调，即DOM结构生成后
      this.$nextTick(() => {
        this.swiper = new Swiper(".swiper-container", {
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //自动轮播
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
        });
      });
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>
