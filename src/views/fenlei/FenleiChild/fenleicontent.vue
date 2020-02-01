<template>
  <div class="fenleicenter">
    <TabConterol :titles="['综合','新品','销量']" @tabclick="tabclick" v-show="isTabFixed" />
    <vuescroll :ops="ops" ref="vs">
      <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="Fenleicenterlist.length">
        <div v-for="(item,index) in Fenleicenterlist" :key="index" class="item">
          <a :href="item.link">
            <img class="item-img" :src="item.image" alt />
            <div class="item-text">{{item.title}}</div>
          </a>
        </div>
      </grid-view>
      <TabConterol :titles="['综合','新品','销量']" @tabclick="tabclick" />
      <Detail :detail="Detail" />
    </vuescroll>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import GridView from "components/common/gridView/GridView";
import TabConterol from "components/content/tabcontrol/Tabcontrol";
import Detail from "./fenleiDetail";
import vuescroll from "vuescroll";

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
    GridView,
    vuescroll,
    Detail,
    TabConterol
  },
  props: {
    Fenleicenterlist: {
      type: Array,
      default() {
        return [];
      }
    },
    Detail: {
      default() {
        return [];
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
          detectResize: true,
          pullRefresh: {
            enable: true,
            tips: {
              deactive: "下拉刷新",
              active: "松开刷新",
              start: "正在刷新",
              beforeDeactive: "刷新完毕"
            }
          },
          pushLoad: {
            enable: true,
            tips: {
              deactive: "上拉加载",
              active: "松开加载",
              start: "正在加载...",
              beforeDeactive: "加载完毕"
            },
            auto: true,
            autoLoadDistance: 0
          }
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
      },
      isTabFixed: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    //   miniWallkey:function(newVal,oldVal){
    //               console.log(newVal);
    //               this.miniWallkey1 = newVal
    //  }
  },
  //方法集合
  methods: {
    tabclick(index) {
      this.$emit("tabclick", index);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    this.$refs.vs.refresh();
    console.log("执行vs刷新");
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