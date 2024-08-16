<script setup lang="ts">
import VInput from '../components/VInput.vue';
import { ref } from 'vue';

const email = ref("")
const password = ref("")

</script>

<template>
    <div>
        Login {{ email }}
    </div>
    <div>
        <VInput v-model="email" label="Email" placeholder="example@gmail.com"></VInput>
        <VInput v-model="password" label="Password" type="password" placeholder="••••••••••••••"></VInput>
    </div>
</template>