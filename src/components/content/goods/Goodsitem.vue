<template>
  <div class="goods" @click="itemclick"> 
    <img v-lazy="showimage" alt="" @load="imageload">
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span>特价：</span>
      <span class="price">{{goods.price}}</span>
      <span>已收藏</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    goods:{
      type:Object,
      default(){
         return {}
      }
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    showimage(){
      return this.goods.image || this.goods.show.img || this.goods.img
   }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    imageload(){
      this.$bus.$emit('imageload')
    },
    itemclick(){
      console.log("跳转详情页")
      this.$router.push('/detail/' + this.goods.iid)
      // this.$router.push({
      //   path :'/detail',
      //   query:{
      //     id :111
      //   }
      // })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素 ）
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
 .goods {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    /* background: url("~assets/img/common/collect.svg") 0 0/14px 14px; */
  }
</style>