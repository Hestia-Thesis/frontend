<script setup lang="ts">
    const navItems = ["Get started","Story","About us"]
</script>

<template>
    <div>
        <nav>
            <div id="company-name" class="text-2xl">
                Hestia
            </div>
            <div id="company-logo">

            </div>

            <ul>
                <li v-for="item in navItems">
                    {{ item }}
                </li>
            </ul>
        </nav>
    </div>
</template>