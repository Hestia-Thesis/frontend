<script setup lang="ts">
    const props = defineProps<{
        route?: string,
        leftIcon?: string,
        rightIcon?: string
    }>()
</script>

<template>

    <RouterLink v-if="route" :to="route">
        <div class="inline-block bg-themecolor-accent-main-500 text-themecolor-neutral-100 hover:text-themecolor-neutral-100 
        border-0 border-b-4 border-r-4 active:border-2 hover:border-2 
        border-themecolor-accent-main-700 hover:border-themecolor-accent-main-700 active:bg-themecolor-accent-main-700 active:border-themecolor-accent-main-700
        px-25px py-5px rounded-sm"
        :href="props.route">
            <slot/>
        </div>
    </RouterLink>
    <div v-else class="inline-block bg-themecolor-accent-main-500 text-themecolor-neutral-100 hover:text-themecolor-neutral-100 
    border-0 border-b-4 border-r-4 active:border-t-4 active:border-l-4 hover:border-2 border-themecolor-accent-main-700 hover:border-themecolor-accent-main-700 
    px-25px py-5px rounded-sm">
        <slot/>
    </div v-else>
</template>