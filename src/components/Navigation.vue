<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { RouterLink } from "vue-router"
import { useUserStore } from "../stores/UserStore";

    const userStore = useUserStore();

    const navItems = {
        homepage : {
            name : "Hestia",
            route : "/",
            isHovered: ref(false)
        },

        pages : [{
            name : "Get started",
            route: "/login",
            isHovered: ref(false)
        },
        {
            name : "Story",
            route: "/story",
            isHovered: ref(false)
        },
        {
            name : "About us",
            route: "/about",
            isHovered: ref(false)
        },
        {
            name: "Log in",
            route: "/login",
            isHovered: ref(false)
        }
    ]}

    const changeNavItems = () => {
        navItems.pages.pop();
        if(localStorage.getItem("user")) {
            navItems.pages.push({
                name: "Profile",
                route: "/profile",
                isHovered: ref(false)
            })

            navItems.pages[0].name = "Energy"
            navItems.pages[0].route = "/energy"
        }
        else {
            navItems.pages.push({
                name: "Log in",
                route: "/login",
                isHovered: ref(false)
            })

            navItems.pages[0].name = "Get started"
            navItems.pages[0].route = "/login"
        }
    }

    watch(userStore, changeNavItems)

    onMounted(
       () => changeNavItems()
    )

</script>

<template>
    <div class="bg-themecolor-accent-main-500 border-2 border-themecolor-accent-main-600 text-themecolor-neutral-100 z-20">
        <nav class="flex w-full justify-between items-center h-20">
            <div id="company-name" class="text-lg sm:text-xl md:text-2xl xl:text-3xl border-r-2 border-themecolor-accent-main-600 py-2 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 h-20 flex items-center"
            :class="{ 'bg-themecolor-accent-main-600' : navItems.homepage.isHovered.value }"
            >
                <RouterLink :to="navItems.homepage.route" @mouseover="navItems.homepage.isHovered.value = true" @mouseleave="navItems.homepage.isHovered.value = false" 
                    class="hover:text-themecolor-neutral-100"
                >
                    {{ navItems.homepage.name }}
                </RouterLink>
            </div>
            <div id="company-logo">

            </div>

            <ul class="flex justify-between h-full">
                <li v-for="item in navItems.pages">
                    <div class="flex items-center sm:text-sm lg:text-base xl:text-lg py-2 h-full px-4 sm:px-8 md:px-10 lg:px-16 xl:px-20"
                        :class="{ 'bg-themecolor-accent-main-600' : item.isHovered.value }"
                    >
                    
                        <RouterLink :to="item.route" @mouseover="item.isHovered.value = true" @mouseleave="item.isHovered.value = false" 
                            class="hover:text-themecolor-neutral-100"
                        >
                            {{ item.name }}
                        </RouterLink>

                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>