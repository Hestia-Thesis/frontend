<script setup lang="ts">
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import VButton from '../components/VButton.vue'
</script>

<template>
    <PageWrapper>
        <Section>            
            <div>
               <h3 class="text-lg font-medium mb-32px">
                    <p class="mb-0">Welcome to Hestia:</p>
                    <p>The app that turns your energy consumption into your personal story</p>
                </h3> 
                <div class="text-left text-sm">
                    <p>
                        Once the application knows your energy consumption information, the app can generate monthly stories based on how high or low your energy usage is.
                    </p>
                    <p class="font-medium mt-24px">
                        How do we do this?
                    </p>
                    <p>
                        Based on our highly effective machine learning models we can predict what your energy consumption should be like at a certain moment of time with the information you give us. This includes predictions of future energy consumption, which allows us to bring you a story every month. Of course, the more information you give us and the more frequently you do so, the more accurate our predictions will be. The stories that will be shown to you at the beginning of each month will be generated with Artificial Intelligence algorithms that are specialized in art and story generation.
                    </p>
                </div>
            </div>
        </Section>
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