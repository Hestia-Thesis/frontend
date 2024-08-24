<script setup lang="ts">

const props = withDefaults(defineProps<{
    name: string
    filled?: boolean
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
}>(), {
    filled: false
})
</script>

<template>
    <span v-if="filled" class="material-icons"
        :class="{
            'text-sm' : props.size === 'sm',
            'text-base' : props.size === 'md',
            'text-lg' : props.size === 'lg',
            'text-xl' : props.size === 'xl',
            'text-2xl' : props.size === '2xl',
            'text-3xl' : props.size === '3xl',
            'text-4xl' : props.size === '4xl',
            'text-5xl' : props.size === '5xl',
        }"
    >
        {{ name }}
    </span>
    <span v-else class="material-symbols-outlined"
        :class="{
            'text-sm' : props.size === 'sm',
            'text-base' : props.size === 'md',
            'text-lg' : props.size === 'lg',
            'text-xl' : props.size === 'xl',
            'text-2xl' : props.size === '2xl',
            'text-3xl' : props.size === '3xl',
            'text-4xl' : props.size === '4xl',
            'text-5xl' : props.size === '5xl',
        }"
    >
        {{ name }}
    </span>
    
</template>