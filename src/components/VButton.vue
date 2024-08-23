<script setup lang="ts">
    const props = defineProps<{
        route?: string,
        leftIcon?: string,
        rightIcon?: string,
        disabled?: boolean
    }>()

    const emits = defineEmits<{
        (event: "click", timeLabel: MouseEvent) : void
    }>()

    function handleClick(event : MouseEvent){
        if(!props.disabled) emits('click', event)
    }

</script>

<template>

    <RouterLink v-if="route" :to="route">
        <div 
        @click="handleClick"
        class="inline-block 
        border-0 border-b-4 border-r-4 px-25px py-5px rounded-sm select-none"
        :class="{
            'bg-themecolor-accent-main-500 text-themecolor-neutral-100 hover:text-themecolor-neutral-100 border-themecolor-accent-main-700 border-themecolor-accent-main-700 hover:translate-y-[2px] active:hover:translate-y-[2px] focus:hover:translate-y-[2px] active:bg-themecolor-accent-main-700 active:border-themecolor-accent-main-700 active:border-2 hover:border-2 cursor-pointer' : !props.disabled,
            'bg-themecolor-neutral-500 text-back hover:text-back border-themecolor-accent-main-700 border-themecolor-neutral-700 hover:border-themecolor-neutral-700 active:border-themecolor-neutral-main-700' : props.disabled,
        }"
        :href="props.route">
            <slot/>
        </div>
    </RouterLink>
    <div v-else 
    @click="handleClick"
    class="inline-block 
        border-0 border-b-4 border-r-4 px-25px py-5px rounded-sm select-none"
        :class="{
            'bg-themecolor-accent-main-500 text-themecolor-neutral-100 hover:text-themecolor-neutral-100 border-themecolor-accent-main-700 border-themecolor-accent-main-700  hover:translate-y-[2px] active:hover:translate-y-[2px] focus:hover:translate-y-[2px] active:bg-themecolor-accent-main-700 active:border-themecolor-accent-main-700 hover:top-2px active:border-2 hover:border-2 cursor-pointer' : !props.disabled,
            'bg-themecolor-neutral-500 text-back hover:text-back border-themecolor-accent-main-700 border-themecolor-neutral-700 hover:border-themecolor-neutral-700 active:bg-themecolor-neutral-700 active:border-themecolor-neutral-main-700' : props.disabled,
        }"
    >
        <slot/>
    </div v-else>
</template>