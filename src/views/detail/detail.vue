<template>
  <div id="detail">
    <detailnavbar class="detailnavbar" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :pull-up-load="true"
      :probe-type="3"
    >
      <div>
        <detailswiper :topImages="topImages"/>
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo"  @imgLoad="imgLoad"/>
        <detail-param-info :paramInfo="paramInfo" />
        <detail-comment-info :commentInfo="commentInfo"/>
        <goodslist :goods="Recommend"/>
      </div>
    </scroll>
    <back-top @click.native="backtop" v-show="isshow" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Detailnavbar from "./childdetail/detailnavbar";
import Detailswiper from "./childdetail/detailswiper";
import DetailBaseInfo from "./childdetail/DetailBaseInfo";
import DetailShopInfo from "./childdetail/DetailShopInfo";
import DetailGoodsInfo from "./childdetail/DetailGoodsInfo";
import DetailParamInfo from "./childdetail/DetailParamInfo";
import DetailCommentInfo from "./childdetail/DetailCommentInfo";
import BackTop from "components/content/Backtop/BackTop";

import { getDetail,getRecommend, Goods, Shop, GoodsParam } from "network/detail";

import Goodslist from 'components/content/goods/Goodslist'
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "detail",
  //import引入的组件需要注入到对象中才能使用
  components: {
    Detailnavbar,
    Detailswiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,

    BackTop,
    Goodslist,
    Scroll
  },
  data() {
    //这里存放数据
    return {
      iid: null,
      isshow: false,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      Recommend:{}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    backtop() {
      console.log(11);
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    contentScroll(position) {
      // 1.决定tabFixed是否显示
      // this.isTabFixed = position.y < -this.tabOffsetTop;

      // 2.决定backTop是否显示
      this.isshow = position.y < -1000;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 请求详情数据
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 1顶部轮播图信息
      this.topImages = res.result.itemInfo.topImages;
      //  2获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3商家信息
      this.shop = new Shop(data.shopInfo);

      // 4商品详情
      this.detailInfo = data.detailInfo;
      // 5.商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6 用户评价
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then(res=>{
      console.log(res)
      this.Recommend = res.data.list
    })
  },
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
#detail {
  position: relative;
  z-index: 100;
  background-color: #fff;
  height: 100vh;
}
.detailnavbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>