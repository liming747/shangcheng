<template>
  <div class="fenleicenter">
    <vuescroll :ops="ops" ref="vs">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="Fenleicenterlist.length">
      <div v-for="(item,index) in Fenleicenterlist" :key="index" class="item">
         <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
    </vuescroll>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import GridView from 'components/common/gridView/GridView'
import vuescroll from "vuescroll";


export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
    GridView,
    vuescroll
  },
  props: {
    Fenleicenterlist:{
      type:Array,
      default(){
        return []
      }
    }
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
        }
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    this.$refs.vs.refresh()
    console.log('执行vs刷新')
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.fenleicenter {
  width: calc(100% - 100px);
  height: 100%;
  margin-left: 100px;
}
 .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>