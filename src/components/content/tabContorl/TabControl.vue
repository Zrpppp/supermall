<template>
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item,index) in title"
         :class="{active: index === currentIndex}"
          @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: Array,
    default() {
      return []
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  vertical-align: middle;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  background-color: #fff;
  z-index: 5;
}

.tab-control-item {
  flex: 1;
  line-height: 40px;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 1px solid var(--color-tint);
}
</style>
