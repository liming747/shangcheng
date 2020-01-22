<template>
  <div id="tab-menu">
    <vuescroll :ops="ops" ref="vs">
      <div class="menu-list">
        <div
          class="menu-list-item"
          :class="{active: index===currentIndex}"
          v-for="(item, index) in Fenleilist"
          :key="index"
          @click="itemClick(index)"
        >{{item.title}}</div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import vuescroll from "vuescroll";

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
   vuescroll
  },
  props: {
    Fenleilist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    //这里存放数据
    return {
      currentIndex: 0,
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
        }
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
   
  },
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
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>