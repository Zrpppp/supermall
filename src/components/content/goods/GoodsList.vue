<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import goodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    goodsListItem,
  },
  props:{
    goods:Array,
    default(){
      return[]
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
