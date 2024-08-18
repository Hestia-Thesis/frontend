<script setup lang="ts">
import { ref, computed } from 'vue'
import VIcon from './VIcon.vue';

    const props = withDefaults(defineProps<{
        modelValue : string | number | Date;
        label?: string;
        placeholder?: string;
        icon?: string;
        type?: string;
        validationError?: boolean;
    }>(), {
        type: "text",
        validationError: false
    });

    const emit = defineEmits<{
        (event: "update:modelValue", value: string): void;
    }>();
    
    function handleInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        emit("update:modelValue", value);
    }

    const showPassword = ref(false)

    const currentInputType = computed(() => {
        if(props.type === "password") {
            return showPassword.value ? "text" : "password"
        }
        return props.type
    })
    
    function togglePasswordVisibility() {
        showPassword.value = !showPassword.value
    }

</script>

<template>
    <div>
        <div class="relative inline-block my-10px mb-5 w-200px">
            <label v-if="label" for="inputField"
            class="relative flex flex-col text-xs mb-1 text-left text-gray-700">
                {{ label }}
            </label>
            <input id="inputField" 
                class="w-full bg-themecolor-neutral-100 py-2px px-5px text-sm focus:outline-none rounded-sm border-2" 
                :class="{
                    'pl-25px' : icon,
                    'pr-25px' : props.type == 'password',
                    'border-themecolor-neutral-500' : !props.validationError,
                    'border-themecolor-red-500 bg-themecolor-red-100 placeholder:text-themecolor-red-500' : props.validationError
                }"
                
                :type="currentInputType"
                :placeholder="placeholder || ''" 
                :value="modelValue"
                @input="handleInput"
            >
            <div class="absolute flex items-center text-xs w-full">
                <slot></slot>
            </div>
            <div id="passwordIcon" 
            class="absolute right-5px top-1/2 transform cursor-pointer text-gray-700 select-none"
            v-if="props.type === 'password' && modelValue" @click="togglePasswordVisibility">
                <VIcon v-if="showPassword" size="md" name="visibility_off"/>
                <VIcon v-if="!showPassword" size="md" name="visibility"/>
            </div>
        </div>
    </div>
</template>