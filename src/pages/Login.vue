<script setup lang="ts">
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import LoginForm from '../components/LoginForm.vue'
import VButton from '../components/VButton.vue';

</script>

<template>
    <PageWrapper>
        <div class="text-lg font-semibold">
            Hestia
        </div>
        <Section>            
            <LoginForm/>
        </Section>
        <div class="text-sm">
            <p class="font-semibold">Don't have an account yet?</p>
            <p>Create an account here</p>
        </div>
        <VButton class="text-sm" route="/signup">
            Sign up
        </VButton>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>