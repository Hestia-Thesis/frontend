<script setup lang="ts">
import Navigation from './components/Navigation.vue'

</script>

<template>
  <div class="bg-themecolor-neutral-100">
    <div class="fixed w-full top-0 z-10">
      <Navigation/>
    </div>
    <Navigation/>
    <RouterView/>
  </div>
</template>
