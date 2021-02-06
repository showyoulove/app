<template>
  <el-main>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component"/>
      </transition>
    </router-view>
  </el-main>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>