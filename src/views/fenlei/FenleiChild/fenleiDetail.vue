<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in detail" :key="index" :goods="item"></goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from 'common/gridView/GridView'
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      detail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
