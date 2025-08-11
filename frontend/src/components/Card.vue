<script setup>

defineProps({
    image: {
        type: String,
        default: null,
    },
    date: {
        type: String,
        default: null,
    },
    local: {
        type: String,
        default: null,
    },
    text: {
        type: String,
        default: null,
    },
    mood: {
        type: String,
        default: null,
    },
    friends: {
        type: String,
        default: null,
    },
})

</script>

<template>
    <section class="flex flex-wrap flex-col justify-start p-4 gap-1 w-[85vw] h-[60vh] bg-white font-mono text-[15px]/6">
        <div class="flex justify-center w-full max-h-[28vh]">
            <img :src="image">
        </div>
        <div class="flex justify-between w-full items-center">
            <div class="text-gray-500 italic">{{ date }}</div>
            <div class="text-gray-500 italic text-[12px]">{{ local }}</div>
        </div>
        <div class="wrap-anywhere">
            {{ text }}
        </div>
        <div class="flex grow justify-between items-end">
            <div class="text-gray-500 italic text-[12px]">{{ mood }}</div>
            <div class="text-gray-500 italic text-[12px]">{{ friends }}</div>
        </div>
    </section>
</template>