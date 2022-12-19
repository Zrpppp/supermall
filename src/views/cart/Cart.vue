<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template #center>购物车</template>
    </nav-bar>
    <!--商品列表-->


    <!--底部汇总-->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Cart",
  components: {
    NavBar
  },
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.cart .nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
