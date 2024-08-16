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
            'text-sm' : size === 'sm',
            'text-base' : size === 'md',
            'text-lg' : size === 'lg',
            'text-xl' : size === 'xl',
            'text-2xl' : size === '2xl',
            'text-3xl' : size === '3xl',
            'text-4xl' : size === '4xl',
            'text-5xl' : size === '5xl',
        }"
    >
        {{ name }}
    </span>
    <span v-else class="material-symbols-outlined"
        :class="{
            'text-sm' : size === 'sm',
            'text-base' : size === 'md',
            'text-lg' : size === 'lg',
            'text-xl' : size === 'xl',
            'text-2xl' : size === '2xl',
            'text-3xl' : size === '3xl',
            'text-4xl' : size === '4xl',
            'text-5xl' : size === '5xl',
        }"
    >
        {{ name }}
    </span>
    
</template>