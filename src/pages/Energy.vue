<script setup lang="ts">
import { ref } from 'vue';
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import VInput from '../components/VInput.vue';
import DailyView from '../components/EnergyPanel/DailyView.vue';
import MonthlyView from '../components/EnergyPanel/MonthlyView.vue';

    const views = ['Daily', 'Monthly']

    const panelView = ref('Daily')

</script>

<template>
    <PageWrapper>
        <Section>
            <p class="text-lg font-semibold">Energy Panel</p>
            <VInput type="select" :options="views" v-model="panelView">            
            </VInput>
        </Section>
        
        <Section>        
            <DailyView v-if="panelView == 'Daily'"/>
            <MonthlyView v-else/>
        </Section>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>