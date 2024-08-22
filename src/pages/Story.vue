<script setup lang="ts">
import { onMounted } from 'vue';
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import { useUserStore } from '../stores/UserStore';

const userStore = useUserStore()

const fetchEnergyData = () => {
    return fetch("http://127.0.0.1:8000/img_story/" + userStore.user?.user_id)
    .then((response) => response.json())
    .catch((error) => {
        console.log(error)
    })
}

onMounted(() => {
    fetchEnergyData().then((data) => {
        //something
    })
})

</script>

<template>
    <PageWrapper>
        <Section>            
            <div>
                Story
            </div>
        </Section>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>