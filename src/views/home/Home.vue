<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <tab-control class="tab-control"
                 :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="LoadMore">
      <home-swiper :banner="banner"/>
      <home-recommend :recommend="recommend"/>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top v-show="isShow" @click.native="backClick"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/FeatureView";

import GoodsList from "components/content/goods/GoodsList";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabContorl/TabControl";
import Scroll from "components/common/scroll/Scroll";
// import backTop from "components/content/backTop/BackTop";

import {getHomeMultiData, getHomeGoods} from "network/home"
import {itemListenerMixin,backTopMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      banner: [],
      recommend: [],
      currentType: 'pop',
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      isTabFixed:false,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  // activated () {
  //   // 进入时滚动到离开时的位置this.saveY
  //   // this.$refs.scroll.scrollTo(0, this.saveY, 0)
  //   this.$refs.scroll.refresh() // 进入时再刷新，避免出现小问题
  // },
  // deactivated () {
  //   // 保存离开时的位置信息到this.saveY
  //   // this.saveY = this.$refs.scroll.getScrollY()
  //   // console.log(this.saveY);
  //   // 2.取消全局事件监听（主页图片加载的监听）因为此时设置了keep-alive，所以离开时调用的是deactivated()
  //   this.$bus.$off('itemImageLoad',this.ItemImgListener)
  // },
  created() {
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     *网络请求相关方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    },
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    LoadMore(){
      // console.log('加载更多')
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh();
    },
    contentScroll(position){
      // console.log(position);
      // this.isShow = position.y < -1000;
      this.listenShowBackTop(position)

      this.isTabFixed = -(position.y) > this.$refs.tabControl2.$el.offsetTop
    },
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  /*height: 300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
