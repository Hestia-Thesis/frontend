<script setup lang="ts">
    const navItems = [
        {name : "Get started"},
        {name : "Story"},
        {name : "About us"}]
</script>

<template>
    <div class="bg-themecolor-accent-main-500 border-2 border-themecolor-accent-main-600">
        <nav class="flex w-full justify-between items-center py-2 h-16">
            <div id="company-name" class="text-3xl border-r-2 border-themecolor-accent-main-600 px-12 md:px-16 lg:px-20 xl:px-24 h-16 flex items-center">
                Hestia
            </div>
            <div id="company-logo">

            </div>

            <ul class="flex justify-between">
                <li class="text-lg px-8 md:px-12 lg:px-16 xl:px-20" v-for="item in navItems">
                    {{ item.name }}
                </li>
            </ul>
        </nav>
    </div>
</template>