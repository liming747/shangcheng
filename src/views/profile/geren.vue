<template>
  <div id="fenlei">
    <nav-bar class="Top">
      <div slot="center">个人中心</div>
    </nav-bar>
    <profile-top />
    <section class="center">
      <div class="center_1">
        <span class="center_sz">0.00</span>
        <span class="center_wz">我的余额</span>
      </div>
      <div class="center_1">
        <span class="center_sz">0</span>
        <span class="center_wz">我的优惠</span>
      </div>
      <div class="center_1">
        <span class="center_sz">0</span>
        <span class="center_wz">我的积分</span>
      </div>
    </section>

    <list-view :list-data="orderList" class="list-view"/>
    <list-view :list-data="serviceList" class="list-view"/>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import BScroll from "better-scroll";
import NavBar from "components/common/navbar/NavBar";
import ProfileTop from "./profileChild/profileTop";
import ListView from './profileChild/listview'
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavBar,
    ProfileTop,
    ListView
  },
  data() {
    //这里存放数据
    return {
       orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
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
  mounted() {
    //  let bs = new BScroll(document.querySelector('.wrapper'),{
    //    probeType:3,
    //   pullUpLoad: true
    //  });
    //  bs.on('scroll',(position) => {
    //     // console.log(position)
    //  })
    // bs.on('pullingUp',()=>{
    //   console.log('上拉加载')
    // })
  },
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
#fenlei{
 background-color: #f2f2f2;
}
.Top {
  background-color: var(--color-tint);
  color: white;
  position: relative;
  z-index: 9;
}
.center {
  display: flex;
  background:white;
}
.center_1 {
  display: flex;
  padding: 18px;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border-right: 1px solid #f2f2f2;
  text-align: center;
}
.center_sz {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.center_wz {
  color: #666;
  font-size: 13px;
  margin-top: 5px;
}
.list-view{
  margin-top: 10px;
}
</style>