<template>
  <router-view/>
</template>

<script>
  import { provide } from 'vue'
  import { baseColorfulLoading, baseLoading } from '@/utils/loading'
  export default {
    name: 'App',
    setup() {
      provide('baseLoading', baseLoading);
      provide('baseColorfulLoading', baseColorfulLoading);
    }
  }
</script>