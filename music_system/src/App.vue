<template>
  <div id="app">
    <div v-if="$route.path !== '/login'" class="nav">
      <nav-bar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/nav'
export default {
  name:'app',
  components:{ NavBar },
}
</script>

<style lang="less" scoped>
#app{
  width: 100%;
}

</style>
