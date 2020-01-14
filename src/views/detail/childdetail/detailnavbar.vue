<template>
  <div>
    <nav-bar>
      <div slot="left" class="fanhui" @click="backclick">
        <img src="~assets/img/fanhui.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
          :key="index" 
          class="titleitem"
          :class="{active : currentindex === index}"
          @click="titlecilck(index)"
          >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavBar
  },
  data() {
    //这里存放数据
    return {
      titles:['商品','参数','评论','推荐'],
      currentindex :0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    titlecilck(index){
      this.currentindex = index
    },
    backclick(){
      this.$router.back()
    }
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.title{
  display: flex;
  font-size: 13px;
}
.titleitem{
  flex: 1
}
.active{
  color: var(--color-high-text)
}
  .fanhui img{
    width: 47%;
    height: 47%;
    margin-top: 8px;
    margin-left: 12px; 
}
</style>