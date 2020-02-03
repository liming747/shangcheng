<template>
  <div id="app">
    <keep-alive exclude="detail" >
      <router-view/>
    </keep-alive>
    <MainTabbar></MainTabbar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template> 
<script>
import MainTabbar from './components/content/mainTabbar/MainTabbar'
import Icon from 'content/Icon/Icon.vue'
import SvgIcon from 'content/Icon/svg.vue'
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    MainTabbar,
    Icon,
    SvgIcon
  },
  methods: {
    
  }
};
</script>
<style>
@import "./assets/css/base.css";
</style>
