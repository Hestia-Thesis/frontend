<script setup lang="ts">
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'

</script>

<template>
    <PageWrapper>
        <div class="text-lg font-semibold">
            About
        </div>
        <Section>            
            
            <div class="text-left text-sm">
                <p class="font-medium mt-12px">
                    How it works?
                </p>
                <p>
                    Every day you have a change to fill in how much energy you consumed over the most recent 5 days. Once the application knows your energy consumption information, the app can generate daily stories based on how high or low your energy usage is. If the energy consumption is better than expected, a very bright and positive story will start to develop. Is the energy you consume that day causing too much pollution, the story will get polluted too.
                </p>
                <p class="font-medium mt-24px">
                    How do we do this?
                </p>
                <p>
                    Based on our highly effective machine learning models we can predict what your energy consumption should be like at a certain moment of time with the information you give us. This includes predictions of today's energy consumption, which allows us to bring you a story every day. Of course, the more information you give us and the more frequently you do so, the more accurate our predictions will be. The stories that will be shown to you at the beginning of each day will be generated with Artificial Intelligence algorithms that are specialized in art and story generation.
                </p>
            </div>
        </Section>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>