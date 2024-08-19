<script setup lang="ts">
import VInput from './VInput.vue';
import VButton from './VButton.vue';
import { reactive, ref, computed, onMounted } from 'vue';
import useVuelidate, { Validation } from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';
import { UserInterface } from '../models/Interfaces.ts';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const formData = reactive({
    email : "",
    password : "",
    passwordConfirm: ""
})

const rules = computed(() => {
    return {
        email: {
            required,
            email,
            emailDoesNotExist: helpers.withMessage("Email is already in use", emailDoesNotExist)
        },
        password : {
            required,
            minLength: helpers.withMessage("Password should be at least 8 characters long", minLength(8)),
            hasCapital: helpers.withMessage("Password requires at least 1 capital", hasCapital),
            hasSmallLetter : helpers.withMessage("Password requires at least 1 small letter", hasSmallLetter),
            hasSpecialCharacter : helpers.withMessage("Password requires at least 1 special character", hasSpecialCharacter),
            hasDigit : helpers.withMessage("Password requires at least 1 digit", hasDigit),
            sameAs: helpers.withMessage("Passwords must match", sameAs(formData.passwordConfirm))
        },
        passwordConfirm : {
            sameAs: helpers.withMessage("Passwords must match", sameAs(formData.password)),
            required
        }
    };
})

const hasCapital = () => {
    return RegExp(/[A-Z]/).test(formData.password)
}

const hasSmallLetter = () => {
    return RegExp(/[a-z]/).test(formData.password)
}

const hasSpecialCharacter = () => {
    return RegExp(/[^A-Za-z0-9]/).test(formData.password)
}

const hasDigit = () => {
    return RegExp(/[0-9]/).test(formData.password)
}

const emailDoesNotExist = () => {
    for(const item of emails.value) {
        if(item === formData.email) {
            return false
        }
    }
    return true
}

const v$ = useVuelidate(rules, formData)

const user = ref({} as UserInterface);
const emails = ref<string[]>([]);

const submitForm = async () => {
    const result = await v$.value.$validate();
    if(result) {
        user.value = {
            user_id: 0,
            email : formData.email,
            password : formData.password
        }
        const result = await postUser(user.value)
        if(result) {
            alert('User created');
            router.push("/login")
        }
        else {
            alert('Failed to create user');
        }
    }
}


const stopValidation = (field : keyof typeof formData) => {
    v$.value[field].$reset();
};

const postUser = (user : UserInterface) => {
    return fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        body: JSON.stringify({
            email: user.email,
            password: user.password
        }),
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

const fetchUsers = () => {
    return fetch("http://127.0.0.1:8000/users")
    .then((response) => response.json())
    .catch((error) => {
        console.log(error)
        toast.error(error)
    })
}

onMounted(() => {
    fetchUsers().then((data) => {
        for(const row of data as UserInterface[]) {
            emails.value.push(row.email)
        }
    })
})

</script>

<template>
    <div class="text-base">
        Create an account
    </div>
        <div class="my-20px">
            <VInput id="email" v-model="formData.email" @update:modelValue="stopValidation('email')" label="Email" type="email" :validationError="!!v$.email.$errors[0]" placeholder="example@gmail.com">
                <span class="text-themecolor-red-500" v-if="!!v$.email.$errors[0]">{{ v$.email.$errors[0].$message }}</span>
            </VInput>
            <VInput id="password" v-model="formData.password" @update:modelValue="stopValidation('password')" label="Password" type="password" :validationError="!!v$.password.$errors[0]" placeholder="•••••••••••••••••••••••••">
                <span class="text-themecolor-red-500" v-if="!!v$.password.$errors[0]">{{ v$.password.$errors[0].$message }}</span>
            </VInput>
            <VInput id="passwordConfirm" v-model="formData.passwordConfirm" @update:modelValue="stopValidation('passwordConfirm')" label="Confirm Password" type="password" :validationError="!!v$.passwordConfirm.$errors[0]" placeholder="•••••••••••••••••••••••••">
                <span class="text-themecolor-red-500" v-if="!!v$.passwordConfirm.$errors[0]">{{ v$.passwordConfirm.$errors[0].$message }}</span>
            </VInput>
        </div>
        <div class="relative my-20px">
        <VButton class="font-semibold text-base" type="submit" @click="submitForm()">
            Sign up
        </VButton>
    </div>

</template>