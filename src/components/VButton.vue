<script setup lang="ts">
    const props = defineProps<{
        route?: string,
        leftIcon?: string,
        rightIcon?: string
    }>()

    const emits = defineEmits<{
        (event: "click", timeLabel: MouseEvent) : void
    }>()

    function handleClick(event : MouseEvent){
        emits('click', event)
    }

</script>

<template>

    <RouterLink v-if="route" :to="route">
        <div 
        @click="handleClick"
        class="inline-block bg-themecolor-accent-main-500 text-themecolor-neutral-100 hover:text-themecolor-neutral-100 
        border-0 border-b-4 border-r-4 active:border-2 hover:border-2 
        border-themecolor-accent-main-700 hover:border-themecolor-accent-main-700 active:bg-themecolor-accent-main-700 active:border-themecolor-accent-main-700
        px-25px py-5px rounded-sm cursor-pointer select-none"
        :href="props.route">
            <slot/>
        </div>
    </RouterLink>
    <div v-else 
    @click="handleClick"
    class="inline-block bg-themecolor-accent-main-500 text-themecolor-neutral-100 hover:text-themecolor-neutral-100 
        border-0 border-b-4 border-r-4 active:border-2 hover:border-2 
        border-themecolor-accent-main-700 hover:border-themecolor-accent-main-700 active:bg-themecolor-accent-main-700 active:border-themecolor-accent-main-700
        px-25px py-5px rounded-sm cursor-pointer select-none">
        <slot/>
    </div v-else>
</template>