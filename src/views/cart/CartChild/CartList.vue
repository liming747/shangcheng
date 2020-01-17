<template>
  <div class="cart">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
        <p style="  text-align: center;margin-top:15px">没有更多了</p> 
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
   
  },
  computed: {
    
  },
  components: {
    CartListItem,
    
  },
  
};
</script>

<style scoped>
.cart{
  height: calc(100% - 44px - 55px - 40px)
}
</style>
