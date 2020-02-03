<template>
  <div class="top">
    <div class="block">
      <el-avatar :size="60" :src="circleUrl"></el-avatar>
    </div>
    <div class="top2">
      <div class="top2-1">登录/注册</div>
      <div class="top2-2"><i class="el-icon-phone"></i>暂无绑定手机号</div>
    </div>
    <div class="top3"><i class="el-icon-arrow-right"></i></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
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
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.top {
  height: 90px;
  padding: 15px;
  background-color: var(--color-tint);
  display: flex;
  flex-direction: row;
}
.top2{
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.top2-1{
  margin: 5px 10px;
}
.top2-2{
  margin: 5px 10px;
  font-size: 14px;
}
.top3{
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>