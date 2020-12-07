<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="updateCartCheck(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <button
              href="javascript:void(0)"
              class="mins"
              @click="updateCount(cart.skuId, -1,cart.skuNum)"
              :disabled="cart.skuNum === 1"
            >
              -
            </button>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @input="formatSkuNum"
              @blur="update(cart.skuId, cart.skuNum, $event)"
            />
            <button
              href="javascript:void(0)"
              class="plus"
              @click="updateCount(cart.skuId, 1,cart.skuNum)"
              :disabled="cart.skuNum === 10"
            >
              +
            </button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartItem(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ total }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ShopCart",
  computed: {
    ...mapState({
      cartList: (state) => state.shopcart.cartList,
    }),
    ...mapGetters(["totalCount", "totalPrice", "isCheckAll"]),

    // 计算商品总数
    total() {
      return this.cartList
        .filter((cart) => cart.isChecked === 1)
        .reduce((p, c) => p + c.skuNum, 0);
    },
    // 计算商品总价
    totalPrice() {
      return this.cartList
        .filter((cart) => cart.isChecked === 1)
        .reduce((p, c) => p + c.skuNum * c.skuPrice, 0);
    },
    checkAll: {
      get() {
        return this.isCheckAll;
      },
      // 当用户点击全选时调用
      async set(value) {
        try {
          // 分发触发checkAllCartItems action调用  ===> 发请求
          await this.$store.dispatch("checkAllCartItems", value);
          // 如果成功了, 重新获取购物车数据显示
          this.$store.dispatch("getCartList");
        } catch (error) {
          // 如果失败了, 提示
          alert(error.message);
        }
      },
    },
  },
  methods: {
    ...mapActions([
      "getCartList",
      "updateCartCount",
      "updateCartCheck",
      "delCart",
    ]),
    // 格式化商品数量输入框内容
    formatSkuNum(e) {
      let skuNum = +e.target.value.replace(/\D+/g, "");
      if (skuNum < 1) {
        skuNum = 1;
      } else if (skuNum > 10) {
        //假设商品库存量为10
        skuNum = 10;
      }
      e.target.value = skuNum;
    },
    //失去焦点后发送更新商品数量请求
    update(e) {
      if (+e.target.value === skuNum) {
        return;
      }
      this.updateCartCount({ skuId, skuNum: e.target.value - skuNum });
    },
    // 更新商品数量
    async updateCount(skuId, skuNum) {
      await this.updateCartCount({ skuId, skuNum });
    },
    async updateCartCheck(cart) {
      const skuId = cart.skuId;
      const isChecked = cart.isChecked === 1 ? 0 : 1;
      try {
        await this.updateCartCheck({ skuId, isChecked });
        // 如果成功了, 重新获取购物车数据显示
        this.getCartList();
      } catch (error) {
        console.log(error.message);
      }
    },
    async deleteCartItem(cart) {
      if (window.confirm(`确定删除${cart.skuName}吗?`)) {
        try {
          await this.delCart(cart.skuId);
          // 如果成功了, 重新获取购物车数据显示
          this.getCartList();
        } catch (error) {
          // 异步请求操作失败了
          console.log(error.message);
        }
      }
    },
  },
  mounted() {
    //页面挂载则获取购物车所有数据
    this.getCartList();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>