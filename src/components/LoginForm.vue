<script setup lang="ts">
import VInput from './VInput.vue';
import VButton from './VButton.vue';
import { reactive, ref, computed, onMounted } from 'vue';
import useVuelidate, { Validation } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { User } from '../models/Models.ts';
import { sha3_512 } from 'js-sha3';

const formData = reactive({
    email : "",
    password : ""
})

const rules = computed(() => {
    return {
        email: {
            required,
            email
        },
        password : {
            required,
            authenticate: helpers.withMessage("Email or password is incorrect", authenticate)
        }
    };
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
    const result = await v$.value.$validate();
    if(result) {
        alert("success")
    }
    else {
        alert("validation failed")
    }
}

const stopValidation = (field : keyof typeof formData) => {
    v$.value[field].$reset();
};

const users = ref([{} as User])

const fetchUsers = () => {
    return fetch("http://127.0.0.1:8000/users")
    .then((response) => response.json())
    .catch((error) => {
        console.log(error)
    })
}

const foundUser = (): User => {
    for (const user of users.value) {
        if (user.email === formData.email) {
        return user as User;
        }
    }
    return {
        user_id : 0,
        email : "",
        password : ""
    } as User
}

function authenticate() {
    const user = foundUser();
    const encryptedFormPassword = sha3_512(formData.password)
    return formData.email == user.email && encryptedFormPassword == user.password
}

onMounted(() => {
    fetchUsers().then((data) => {
        users.value = data
    })
})

</script>

<template>
    <div>
        Enter your credentials
    </div>
        <div class="my-20px">
            <VInput v-model="formData.email" @update:modelValue="stopValidation('email')" label="Email" type="email" :validationError="!!v$.email.$errors[0]" placeholder="example@gmail.com">
                <span class="text-themecolor-red-500" v-if="!!v$.email.$errors[0]">{{ v$.email.$errors[0].$message }}</span>
            </VInput>
            <VInput v-model="formData.password" @update:modelValue="stopValidation('password')" label="Password" type="password" :validationError="!!v$.password.$errors[0]" placeholder="••••••••••••••">
                <span class="text-themecolor-red-500" v-if="!!v$.password.$errors[0]">{{ v$.password.$errors[0].$message }}</span>
            </VInput>
    
        </div>
        <div class="relative my-20px">
        <VButton type="submit" @click="submitForm()">
            Log in
        </VButton>
    </div>

</template>