<script setup lang="ts">

</script>


<template>
    <div class="bg-themecolor-neutral-200 sm:my-50px sm:mx-50px md:mx-100px lg:mx-200px xl:mx-300px 2xl:mx-350px rounded md:p-20px">
        <div class="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-100px-4rem)] md:min-h-[calc(100vh-150px-4rem)]">
            <div class="text-black p-20px">
                <slot>
                </slot>                
            </div>
        </div>
    </div>
</template>
