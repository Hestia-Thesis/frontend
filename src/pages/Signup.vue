<script setup lang="ts">
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import SignupForm from '../components/SignupForm.vue';

</script>

<template>
    <PageWrapper>
        <div class="text-lg font-semibold">
            Hestia
        </div>
        <Section>                        
            <SignupForm/>
        </Section>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>