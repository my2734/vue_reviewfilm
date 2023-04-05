<template>
  <div id="app">
    <component :is="this.$route.meta.layout || 'div'">
        <router-view></router-view>
    </component>
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {
      
    }
  }
</script>
<style>
</style>