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
        viewPassword?: boolean;
        size?: 'xs' | 'sm' | 'md' | 'lg';
        options?: Array<string>;
        disabled?: boolean;
        metric?: string;
    }>(), {
        type: "text",
        validationError: false,
        size: "md"
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
        <div class="relative inline-block my-10px mb-5"
            :class="{
                'w-75px' : props.size == 'xs',
                'w-150px' : props.size == 'sm',
                'w-200px sm:w-300px' : props.size == 'md',
                'w-300px sm:w-450px' : props.size == 'lg'
            }"
        >
            <label v-if="label" for="inputField"
            class="relative flex flex-col text-xs mb-1 text-left text-gray-700">
                {{ label }}
            </label>
            <!-- Select Input -->
            <select v-if="props.type == 'select'"
                class="w-full bg-themecolor-neutral-100 py-2px px-5px text-sm focus:outline-none rounded-sm border-2"
                :class="{
                    'pl-25px' : icon,
                    'border-themecolor-neutral-500' : !props.validationError,
                    '!border-themecolor-red-500 !bg-themecolor-red-100 placeholder:text-themecolor-red-500' : props.validationError
                }"
                @change="handleInput"
                :value="modelValue"
                :disabled="disabled"
            >
                <option v-for="option in props.options" :value="option">{{ option }}</option>


            </select>
            
            <!-- Regular Input -->
            <input v-else
                class="w-full bg-themecolor-neutral-100 py-2px px-5px text-sm focus:outline-none rounded-sm border-2" 
                :class="{
                    'pl-25px' : icon,
                    'pr-25px' : props.type == 'password' && props.viewPassword,
                    'pr-30px' : props.metric && size == 'xs' || 'sm',
                    'pr-35px' : props.metric && size == 'md' || 'lg',
                    'border-themecolor-neutral-500' : !props.validationError && !props.disabled,
                    '!border-themecolor-red-500 !bg-themecolor-red-100 placeholder:text-themecolor-red-500' : props.validationError,
                    'bg-themecolor-neutral-100' : !props.disabled,
                    'bg-themecolor-neutral-500 border-themecolor-neutral-600' : props.disabled
                }"
                
                :type="currentInputType"
                :placeholder="placeholder || ''" 
                :value="modelValue"
                @input="handleInput"
                :disabled="disabled"
            >
            <div class="absolute right-5px top-5px transform cursor-pointer text-gray-700 cursor-text" v-if="props.metric">{{ metric }}</div>
            <div class="absolute flex items-center text-xs w-full">
                <slot></slot>
            </div>
            <div id="passwordIcon" 
            class="absolute right-5px top-1/2 transform cursor-pointer text-gray-700 select-none"
            v-if="props.type === 'password' && modelValue && viewPassword" @click="togglePasswordVisibility">
                <VIcon v-if="showPassword" size="md" name="visibility_off"/>
                <VIcon v-if="!showPassword" size="md" name="visibility"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>