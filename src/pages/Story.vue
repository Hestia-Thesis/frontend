<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PageWrapper from '../components/PageWrapper.vue'
import Section from '../components/Section.vue'
import { useUserStore } from '../stores/UserStore';
import VButton from '../components/VButton.vue';

const userStore = useUserStore()


const storyData = ref([{
    date: "",
    image_data: "",
    end_date: "",
    story: ""
}]);

const storyIndex = ref(0)

const setStoryIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < storyData.value.length) {
        storyIndex.value = newIndex
    }
}

const loadedStoryData = computed(() => {
    return {
        date: storyData.value[storyIndex.value].date,
        image_data: loadImage(storyData.value[storyIndex.value].image_data),
        end_date: storyData.value[storyIndex.value].end_date,
        story: storyData.value[storyIndex.value].story
    }
})

const decodeImage = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    console.log(bytes.buffer)
    return bytes.buffer;
}
const loadImage = (base64: string) => {
    const byteArray = decodeImage(base64)
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);   
}

const fetchEnergyData = () => {
    return fetch("http://127.0.0.1:8000/img_story/" + userStore.user?.user_id)
    .then((response) => response.json())
    .catch((error) => {
        console.log(error)
    })
}

const ifExists = (value: any) => {
    if(value) {
        return true
    }
    return false
}

onMounted(() => {
    fetchEnergyData().then((data) => {
        storyData.value = data
    })
    .then(() => {
        storyIndex.value = storyData.value.length-1
    })
})

</script>

<template>
    <PageWrapper>
        <div class="text-lg font-semibold">
            Story
        </div>
        <Section>            
            <div class="text-base font-medium mb-40px">
                {{ loadedStoryData.date }}
            </div>
            <img class="mx-auto w-120 h-120 mb-20px" :src="loadedStoryData.image_data" alt="Loaded Image" v-if="loadedStoryData.image_data">
            <div>
                {{ loadedStoryData.story }}
            </div>
        </Section>
        <div>
            <VButton :disabled="!ifExists(storyData[storyIndex-1])" @click="setStoryIndex(storyIndex-1)">
            Previous
            </VButton>
            <VButton :disabled="!ifExists(storyData[storyIndex+1])" @click="setStoryIndex(storyIndex+1)">
                Next
            </VButton>
        </div>
    </PageWrapper>
</template>

<style>
p {
    margin-bottom: 18px
}
</style>