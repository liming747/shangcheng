<template>
  <div id="detail">
    <detailnavbar class="detailnavbar" @titleCilck="titlecilck" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, Recommend]"
      @scroll="contentScroll"
      :pull-up-load="true"
      :probe-type="3"
    >
      <div>
        <detailswiper :topImages="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
        <detail-param-info ref="params" :paramInfo="paramInfo" />
        <detail-comment-info ref="comment" :commentInfo="commentInfo" />
        <goodslist ref="recommend" :goods="Recommend" />
      </div>
    </scroll>
    <Detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTop" v-show="showBackTop" />
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
import DetailBottomBar from "./childdetail/DetailBottomBar";



import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { debounce } from "../../common/utils";
import { itemlisennermixin,backTopMixin} from "../../common/mixin";

import Goodslist from "components/content/goods/Goodslist";
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
    DetailBottomBar,

    Goodslist,
    Scroll
  },
  mixins: [itemlisennermixin,backTopMixin],
  data() {
    //这里存放数据
    return {
      iid: null,
      // isshow: false,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      Recommend: {},
      ZhutiTopy: [],
      getZhutiTopy: null,
      currentindex: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    addToCart(){
      console.log('tianjia')
      // 获取商品数据
      const product = {}
      product.image = this.topImages[0],
      product.title = this.goods.title,
      product.desc = this.goods.desc,
      product.price = this.goods.newPrice,
      product.iid = this.iid
      // 添加到购物车
      // this.$store.commit('addcart',product)
      this.$store.dispatch('addcart',product)
    },
    titlecilck(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.ZhutiTopy[index], 400);
    },
    imgLoad() {
      this.refresh();
      // this.$refs.scroll.refresh();
      this.getZhutiTopy();
    },
    contentScroll(position) {
      const positiony = -position.y;
      let length = this.ZhutiTopy.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentindex !== i &&
          positiony >= this.ZhutiTopy[i] &&
          positiony < this.ZhutiTopy[i + 1]
        ) {
          this.currentindex = i;
          console.log(this.currentindex);
          this.$refs.nav.currentindex = this.currentindex;
        }
      }
      // 返回顶部
      this.showBackTop = position.y < -1000;
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
      // 这个不行 因为图片的高度没有计算在内
      // this.$nextTick(()=>{
      //   this.ZhutiTopy = []
      //   this.ZhutiTopy.push(0)
      //   this.ZhutiTopy.push(this.$refs.params.$el.offsetTop)
      //   this.ZhutiTopy.push(this.$refs.comment.$el.offsetTop)
      //   this.ZhutiTopy.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.ZhutiTopy)
      // })
    });
    // 请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.Recommend = res.data.list;
    });

    this.getZhutiTopy = debounce(() => {
      this.ZhutiTopy = [];
      this.ZhutiTopy.push(44);
      this.ZhutiTopy.push(this.$refs.params.$el.offsetTop -44);
      this.ZhutiTopy.push(this.$refs.comment.$el.offsetTop-44);
      this.ZhutiTopy.push(this.$refs.recommend.$el.offsetTop-44);
      this.ZhutiTopy.push(Number.MAX_VALUE);
      console.log(this.ZhutiTopy);
    }, 100);
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
  height: calc(100% - 44px - 55px);
}
</style>