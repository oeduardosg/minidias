<script setup>
import Icon from './Icon.vue';

defineProps({
    icon_path: String,
    content_name: String,
})

</script>

<template>
    <button class="flex justify-center items-center gap-1 bg-[#3F146C] rounded-full h-[4vh] w-auto p-2">
        <Icon :caminho="icon_path" color="#ffffff" size="20"/>
        <div class="text-white text-sm">{{ content_name }}</div>
    </button>
</template>