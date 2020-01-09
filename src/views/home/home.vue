<template>
  <div id="home" class="warper">
    <nav-bar class="nav-home">
      <div slot="left">上一步</div>
      <div slot="center">购物街</div>
      <div slot="right">下一步</div>
    </nav-bar>
      <!-- @scroll="contentScroll"
      @pullingUp="loadMore" -->
      <!-- <tabcontrol :titles="['流行','新款','精选']" class="tabcontrol" @tabclick="tabclick" /> -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :data="showgoods"
      :pull-up-load="true"
      :probe-type="3"
    >
      <div>
        <Homeswiper :banners="banners" />
        <hometuijian :recommends="banners" />
        <fucher />
        <tabcontrol :titles="['流行','新款','精选']" class="tabcontrol" @tabclick="tabclick" />
        <Goodslist :goods="showgoods" />
      </div>
    </scroll>

    <back-top @click.native="backtop" v-show="isshow"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Tabcontrol from "components/content/tabcontrol/Tabcontrol";
import Scroll from "components/common/scroll/Scroll";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import BackTop from 'components/content/Backtop/BackTop'
BScroll.use(Pullup);

import Homeswiper from "./children/homeswiper";
import Hometuijian from "./children/hometuijian";
import Fucher from "./children/homefucher";
import Goodslist from "components/content/goods/Goodslist";

import { gethome, getgoods } from "network/home";
import { NEW, POP, SELL, BACKTOP_DISTANCE } from "@/common/const";
import { type } from "os";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavBar,
    Tabcontrol,
    Scroll,
    BackTop,

    Homeswiper,
    Hometuijian,
    Fucher,
    Goodslist
  },
  data() {
    //这里存放数据
    return {
      banners: [],
      recommends: [],
      goodsList: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      isshow:false
    };
  },
  //监听属性 类似于data概念
  computed: {
    showgoods() {
      return this.goodsList[this.currentType].list;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 方法
    tabclick(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      
    },
    backtop(){
      console.log(11)
    this.$refs.scroll.scrollTo(0, 0, 300);
    },
    contentScroll(position) {
      // 1.决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop;

      // 2.决定backTop是否显示
      this.isshow = position.y < -BACKTOP_DISTANCE;
    },
     loadMore() {
      this.getHomeProducts(this.currentType);
   
    },
    // 网络请求
    gethome() {
      gethome().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeProducts(type) {
      getgoods(type, this.goodsList[type].page).then(res => {
        //  console.log(res.data.list)
        //  console.log([])
        const goodsList = res.data.list;
        this.goodsList[type].list.push(...goodsList);
        this.goodsList[type].page += 1;

        this.$refs.scroll.scroll.finishPullup()
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 1请求主页上半部分
    this.gethome(),
      // 2 请求商品列表数据
      this.getHomeProducts("pop");
    this.getHomeProducts("new");
    this.getHomeProducts("sell");
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
#home {
  height: 100vh;
  /* padding-top: 44px;
  padding-bottom: 50px; */
}
.nav-home {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
.tabcontrol {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>