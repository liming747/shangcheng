<template>
  <div class="fenlei">
    <FenleiNavBar  />
    <div class="center">
      <FenleiTabBar :Fenleilist="Fenleilist" @selectItem="selectItem"  class="centerleft"/>
      <Fenleicenter :Fenleicenterlist="Fenleicenterlist" @tabclick="tabClick" :detail="Detail"/>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FenleiNavBar from "./FenleiChild/fenleitop";
import FenleiTabBar from "./FenleiChild/fenleibiaoqian";
import Fenleicenter from './FenleiChild/fenleicontent'

import { getfenlei, getfenleiyulan, getCategoryDetail } from "network/category";
import {tabControlMixin} from '@/common/mixin'
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
    FenleiNavBar,
    FenleiTabBar,
    Fenleicenter

  },
  data() {
    //这里存放数据
    return {
      Fenleilist: [],
      shopindex: 0,
      Fenleicenterlist:[],
      miniWallkey:'',
      Detail:[]
    };
  },
  mixins:[tabControlMixin],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
     getCategoryDetail1(){
      getCategoryDetail(this.miniWallkey,this.currentType).then(res=>{
        console.log(res)
        this.Detail = res
      })
    },
    getfenlei() {
      getfenlei().then(res => {
        // console.log(res);
        this.Fenleilist = res.data.category.list;
        this.getfenleiyulan();
      });
    },  
    getfenleiyulan() {
      getfenleiyulan(this.Fenleilist[this.shopindex].maitKey).then(res => {
        // console.log(res)
        this.Fenleicenterlist = res.data.list
        this.miniWallkey = this.Fenleilist[this.shopindex].miniWallkey
        this.getCategoryDetail1()
      });
    },
    selectItem(index) {
      console.log(index);
      this.shopindex = index;
      this.getfenleiyulan();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
   

  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    this.getfenlei();
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.fenlei {
  height: 100vh;
}
.center {
  height: calc(100% - 44px - 49px);
}
.centerleft{
  float: left;
}
</style>