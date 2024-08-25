<script setup lang="ts">
import VInput from '../VInput.vue';
import VButton from '../VButton.vue';
import { ref, reactive, onMounted} from 'vue';
import { useUserStore } from '../../stores/UserStore';
import { useToast } from 'vue-toastification';
import { api_url } from '../api/api_url';

const isProcessing = ref(false);

const toast = useToast()
const userStore = useUserStore();

const getDates = () => {
    
    const today = new Date();
    const storedDates = [new Date(), new Date(), new Date(), new Date(), new Date()]
    const formattedDates = []

    let i = 0;
    for(let counter = 4; counter >= 0; counter--) {
        storedDates[i].setDate(today.getDate() - counter);
        const year = storedDates[i].getFullYear();
        const month = String(storedDates[i].getMonth() + 1).padStart(2,'0');
        const day = String(storedDates[i].getDate()).padStart(2,'0');
        formattedDates.push(`${year}-${month}-${day}`);
        i++;
    }

    return formattedDates
}

const dates = getDates()

const energyData = ref([{
    consumed: 0,
    day : "",
    user_id: userStore.user?.user_id,
    predicted: 0
}])

const filterEnergyData = () => {
    for(const item of energyData.value) {
        for(let i = 0; i < formData.length; i++) {
            if(Date.parse(item.day) == Date.parse(formData[i].day)) {
                formData[i] = item
            }
        }
    }
}

const formData = reactive([
    {
        consumed : 0,
        day: dates[0],
        user_id: userStore.user?.user_id,
        predicted: 0
    },
    {
        consumed : 0,
        day: dates[1],
        user_id: userStore.user?.user_id,
        predicted: 0
    },
    {
        consumed : 0,
        day: dates[2],
        user_id: userStore.user?.user_id,
        predicted: 0
    },
    {
        consumed : 0,
        day: dates[3],
        user_id: userStore.user?.user_id,
        predicted: 0
    },
    {
        consumed : 0,
        day: dates[4],
        user_id: userStore.user?.user_id,
        predicted: 0
    },
])

const fetchEnergyData = () => {
    return fetch(api_url + "/energy/" + userStore.user?.user_id)
    .then((response) => response.json())
    .catch((error) => {
        console.log(error)
    })
}


const submitForm = async () => {
    isProcessing.value = true
    const amtOfCalls= ref(0)
    const amtOfOks = ref(0)
    for(const obj of formData) {
        if(obj.consumed != 0) {
            const response = ref()
            if(obj.predicted == 0) {
                response.value = await postEnergy(obj)
            }
            else {
                response.value = await updateEnergy(obj, obj.day)
            }

            if(response.value) {
                amtOfOks.value++
            }
            else {
                alert("Failed to save energy data of " + obj.day)
                isProcessing.value = false
                throw new Error("Failed to save value")
            }

        }

    }

    if(amtOfOks.value < amtOfCalls.value) {
            alert("Failed to save energy data")
            isProcessing.value = false
        }
        else {
            alert("Successfully saved energy data")
            isProcessing.value = false
        }

}

const postEnergy = (energyObj : Object) => {
    return fetch(api_url + "/energy/ml/image_story/" + 1000, {
        method: "POST",
        body: JSON.stringify(energyObj),
        headers : {
            'Content-type': 'application/json',
        },
    })
    .then((response) => {
        return response.ok
    })
    .catch((error) => {
        console.log('Error:', error)
        toast.error(error.message || 'An error occured')
    })
}

const updateEnergy = (energyObj: Object, day: string) => {
    return fetch(api_url + "/energy/" + userStore.user?.user_id + "/" + day, {
        method: "PUT",
        body: JSON.stringify(energyObj),
        headers : {
            'Content-type': 'application/json',
        },
    })
    .then((response) => {
        return response.ok
    })
    .catch((error) => {
        console.log('Error:', error)
        toast.error(error.message || 'An error occured')
    })
}


onMounted(() => {
    fetchEnergyData().then((data) => {
        energyData.value = data;
    })
    .then(() => filterEnergyData())
})

</script>

<template>
    <div>
        <div class="grid grid-cols-12 px-0 xl:px-20px pt-40px">
            <div class="text-xs lg:text-[14px] xl:text-[16px] 2xl:text-sm font-medium relative top-38px col-span-2">
                <p>Consumed</p>
            </div>
            <div class="relative col-span-2">
                <p class="text-xs lg:text-[14px] xl:text-[16px] 2xl:text-sm font-medium absolute z-10 left-1/2 transform -translate-x-1/2 text-center w-full">{{ formData[0].day }}</p>
                <VInput class="mt-24px" size="xs" metric="KWh" v-model="formData[0].consumed">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <p class="text-xs lg:text-[14px] xl:text-[16px] 2xl:text-sm font-medium absolute z-10 left-1/2 transform -translate-x-1/2 text-center w-full">{{ formData[1].day }}</p>
                <VInput class="mt-24px" size="xs" metric="KWh" v-model="formData[1].consumed">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <p class="text-xs lg:text-[14px] xl:text-[16px] 2xl:text-sm font-medium absolute z-10 left-1/2 transform -translate-x-1/2 text-center w-full">{{ formData[2].day }}</p>
                <VInput class="mt-24px" size="xs" metric="KWh" v-model="formData[2].consumed">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <p class="text-xs lg:text-[14px] xl:text-[16px] 2xl:text-sm font-medium absolute z-10 left-1/2 transform -translate-x-1/2 text-center w-full">Yesterday</p>
                <VInput class="mt-24px" size="xs" metric="KWh" v-model="formData[3].consumed">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <p class="text-xs lg:text-[14px] xl:text-[16px] 2xl:text-sm font-medium absolute z-10 left-1/2 transform -translate-x-1/2 text-center w-full">Today</p>
                <VInput class="mt-24px" size="xs" metric="KWh" v-model="formData[4].consumed">
                </VInput>
            </div>
        </div>
        <div class="grid grid-cols-12 px-0 xl:px-20px pb-40px">
            <div class="text-xs lg:text-[14px] xl:text-[16px] 2xl:text-sm font-medium relative top-15px col-span-2">
                <p>Predicted</p>
            </div>
            <div class="relative col-span-2">
                <VInput disabled size="xs" metric="KWh" v-model="formData[0].predicted">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <VInput disabled size="xs" metric="KWh" v-model="formData[1].predicted">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <VInput disabled size="xs" metric="KWh" v-model="formData[2].predicted">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <VInput disabled size="xs" metric="KWh" v-model="formData[3].predicted">
                </VInput>
            </div>
            <div class="relative col-span-2">
                <VInput disabled size="xs" metric="KWh" v-model="formData[4].predicted">
                </VInput>
            </div>
        </div>
        <div>
            <VButton v-if="!isProcessing" @click="submitForm" type="submit" class="mb-20px text-base font-semibold">
                Save data
            </VButton>
            <VButton v-else disabled type="submit" class="mb-20px text-base font-semibold">
                <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <!-- ... -->
                </svg>
                Processing...
            </VButton>
        </div>
    </div>
</template>