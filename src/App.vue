<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import { useUserStore } from './stores/UserStore';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, watch } from 'vue';


  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  const path = computed(() => route.path)

  const changeRoute = () => {
      if(!userStore.isAuthenticated && (path.value == '/profile' || path.value == '/energy')) {
        router.push('/login')
      }
      if(userStore.isAuthenticated && (path.value == '/login' || path.value == '/signup')) {
        router.push('/profile')
      }

  }

watch(path, changeRoute)

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
