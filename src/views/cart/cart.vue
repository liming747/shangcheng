<template>
  <div class="cart">
    <!-- 导航 -->
    <cart-nav-bar class="cartnavbar" />
    <!-- 内容部分 -->
    <div class="vuescroll">
      <vuescroll :ops="ops" ref="vs">
        <cart-list :cartList="carlist" />
      </vuescroll>
    </div>
    <!-- 底部 -->
    <bottom-bar />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';\
import vuescroll from "vuescroll";

import CartNavBar from "./CartChild/CartNavBar";
import CartList from "./CartChild/CartList";
import BottomBar from "./CartChild/BottomBar";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  //import引入的组件需要注入到对象中才能使用
  components: {
    vuescroll,
    CartNavBar,
    CartList,
    BottomBar
  },
  data() {
    //这里存放数据
    return {
      ops: {
        vuescroll: {
          mode: "slide",
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          scrollingX: false,
          easing: undefined
        },
        rail: {},
        bar: {
          background: "#cccccc",
          size: "2px",
          opacity: "0.7"
        },
      //    pushLoad: {
      //   enable: true,
      //   tips: {
      //     deactive: 'Push to Load',
      //     active: 'Release to Load',
      //     start: 'Loading...',
      //     beforeDeactive: 'Load Successfully!'
      //   },
      //   auto: false,
      //   autoLoadDistance: 0
      // },
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["Cartlength", "carlist"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    this.$refs.vs.refresh()
    console.log('执行vs刷新')
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.cart {
  height: 100vh;
}
.vuescroll {
  height: calc(100% - 44px - 53px - 40px);
}
/* .cartnavbar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
} */
</style>