<template>
  <div class="bottom-menu">
    <!-- @checkBtnClick="checkBtnClick" v-model="isSelectAll" -->
    <CheckButton class="select-all" :ischecked="isSelectAll" @click.native="checkBtnClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from '../CartChild/CheckButton'
  import { mapGetters } from "vuex";

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
       ...mapGetters(["Cartlength", "carlist"]),
		  totalPrice() {
        const carlist = this.$store.getters.carlist;
        return carlist.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      checkLength(){
        return this.carlist.filter( item => item.checked).length
      },
      isSelectAll(){
      //  return  !(this.carlist.filter(item => !item.checked ).length)
        if(this.carlist.length == 0){
          return false
        }
        return  !this.carlist.find(item => !item.checked )
      }
      // isSelectAll: function () {
      //   return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
      // }
    },
    methods: {
      checkBtnClick() {
        // 1.判断是否有未选中的按钮
        // let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        // if (this.isSelectAll) {
        //   this.carlist.forEach(item => {
        //     item.checked = true;
        //   });
        // } else {
        //   this.carlist.forEach(item => {
        //     item.checked = false;
        //   });
        // }

        // 2.0
        if(this.isSelectAll){
          this.carlist.forEach(item => item.checked = false)
        }else{
          this.carlist.forEach(item => item.checked = true)
        }
        // this.carlist.forEach(item => item.checked = !this.isSelectAll)
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
