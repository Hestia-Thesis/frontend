<script setup lang="ts">
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import VButton from '../components/VButton.vue'
</script>

<template>
    <PageWrapper>
        <Section>            
            <div>
               <div class="text-lg font-medium mb-32px">
                    <p class="mb-5">Welcome to Hestia:</p>
                    <p class="text-base">Turn energy consumption into your personal story</p>
               </div> 
            </div>
        </Section>
        <div class="grid grid-cols-4 gap-10px mx-30px p-10px bg-themecolor-accent-main-300">
            <img class="" src="../assets/Generated-Pic1.jpg">
            <img src="../assets/Generated-Pic2.jpg">
            <img src="../assets/Generated-Pic3.jpg">
            <img src="../assets/Generated-Pic4.jpg">
            <img src="../assets/Generated-Pic5.jpg">
            <img src="../assets/Generated-Pic6.jpg">
            <img src="../assets/Generated-Pic7.jpg">
            <img src="../assets/Generated-Pic8.jpg">
        </div>
        <div class="mt-42px sm:mb-15px md:mb-24px">
            <div class="text-base font-normal mb-30px">
                <p>Want to try it out yourself?</p>
                <p>Get started here</p>
            </div>
            
            <VButton class="font-semibold text-base" route="/login">
                Get Started
            </VButton>
        </div>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>