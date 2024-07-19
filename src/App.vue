<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import Index from './pages/Index.vue'
import Login from './pages/Login.vue'

</script>

<template>
  <div class="bg-themecolor-neutral-100">
    <div class="fixed w-full top-0">
      <Navigation/>
    </div>
    <Navigation/>
    <Index></Index>
  </div>
</template>
