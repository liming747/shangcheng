<template>
  <div id="app">
    <router-view/>
    <MainTabbar></MainTabbar>
  </div>
</template> 
<script>
import MainTabbar from './components/content/mainTabbar/MainTabbar'
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    MainTabbar,
  },
  methods: {
    
  }
};
</script>
<style>
@import "./assets/css/base.css";
</style>
