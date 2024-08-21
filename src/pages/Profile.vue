<script setup lang="ts">
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import { useUserStore } from '../stores/UserStore';
import { useRouter, useRoute } from 'vue-router';
import VButton from '../components/VButton.vue';
import UserDetailsForm from '../components/UserDetailsForm.vue';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(true);

const logOut = () => {
    userStore.clearUser()
    router.push('/login')
}


onMounted(() => {
    isLoading.value = false;
})

</script>

<template>
    <PageWrapper>
        <div class="text-lg font-semibold">
            Logged in as: {{ userStore.user?.email }}
        </div> 
        <Section>           
            <UserDetailsForm v-if="!isLoading"/>
        </Section>
        <VButton class="text-base font-semibold mt-40px sm:mt-20px mb-20px" @click="logOut">
            Log Out
        </VButton>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>