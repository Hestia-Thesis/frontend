<script setup lang="ts">
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'

</script>

<template>
    <PageWrapper>
        <Section>            
            <LoginForm/>
        </Section>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>