<template>
  <div class="cart">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
        <p style="text-align: center;margin-top:15px" v-if=" type =='true'">没有更多了</p> 
        <p style="text-align: center;margin-top:15px" v-else>暂无数据</p>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

export default {
  name: "cartList",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components:{
  CartListItem
  },
  data() {
    return {
       type:'true'
    };
  },
  methods: {
    
  },
  activated(){
    if(this.cartList.length){
      this.type = 'true'
    }else{
      this.type = 'false'
    }
  }
}
</script>

<style scoped>
.cart{
  height: calc(100% - 44px - 55px - 40px)
}
</style>
