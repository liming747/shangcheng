<template>
  <div id="home" class="warper">
    <nav-bar class="nav-home">
      <div slot="left">上一步</div>
      <div slot="center">购物街</div>
      <div slot="right">下一步</div>
    </nav-bar>
    <tabcontrol 
    :titles="['流行','新款','精选']" 
    @tabclick="tabclick" 
    ref="tabcontrol1" 
    class="tabcontroltop"
    v-show="isTabFixed"
    />


    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
  
      :pull-up-load="true"
      :probe-type="3"
    >
      <div>
        <Homeswiper :banners="banners" @sweiperimageload="sweiperimageload" />
        <hometuijian :recommends="banners" />
        <fucher />
        <tabcontrol :titles="['流行','新款','精选']" @tabclick="tabclick" ref="tabcontrol2" />
        <Goodslist :goods="showgoods" />
      </div>
    </scroll>

    <back-top @click.native="backtop" v-show="isshow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Tabcontrol from "components/content/tabcontrol/Tabcontrol";
import Scroll from "components/common/scroll/Scroll";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import BackTop from "components/content/Backtop/BackTop";
BScroll.use(Pullup);

import Homeswiper from "./children/homeswiper";
import Hometuijian from "./children/hometuijian";
import Fucher from "./children/homefucher";
import Goodslist from "components/content/goods/Goodslist";

import { gethome, getgoods } from "network/home";
import { debounce } from "../../common/utils";
import {itemlisennermixin} from '../../common/mixin'
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
  mixins:[itemlisennermixin],
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
      isshow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      sateY:0
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
      this.$refs.tabcontrol1.currentindex = index;
      this.$refs.tabcontrol2.currentindex = index;
    },
    backtop() {
      console.log(11);
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    contentScroll(position) {
      // 1.决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop;

      // 2.决定backTop是否显示
      this.isshow = position.y < -BACKTOP_DISTANCE;
    },
    // 上拉加载
    loadMore() {
      this.getHomeProducts(this.currentType);
    },
    // 获取组件位置
    sweiperimageload() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
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

        this.$refs.scroll.finishPullUp();
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
  mounted() {
   
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
    this.$refs.scroll.scrollTo(0,this.sateY,0)
    this.$refs.scroll.refresh()
  }, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {
    // 保存Y值
    this.sateY = this.$refs.scroll.getscrollY();
    // console.log(this.sateY)
    // 取消全局事件监听
    this.$bus.$off('imageload',this.itemImglisener)
  },
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
  position: relative;
  z-index: 9;
}
.tabcontroltop{
  position: relative;
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