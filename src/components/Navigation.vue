<script setup lang="ts">
    const navItems = [
        {name : "Get started"},
        {name : "Story"},
        {name : "About us"}]
</script>

<template>
    <div class="bg-themecolor-accent-main-500 border-2 border-themecolor-accent-main-600">
        <nav class="flex w-full justify-between items-center py-2 h-16">
            <div id="company-name" class="text-2xl border-r-2 border-themecolor-accent-main-600  px-12 h-16 flex items-center">
                Hestia
            </div>
            <div id="company-logo">

            </div>

            <ul class="flex justify-between pr-5">
                <li class="px-10" v-for="item in navItems">
                    {{ item.name }}
                </li>
            </ul>
        </nav>
    </div>
</template>