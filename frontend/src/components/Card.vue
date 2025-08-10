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
    <section class="flex flex-wrap flex-col justify-start p-4 gap-1 w-[85vw] h-[60vh] bg-white">
        <div class="flex w-full h-[30vh] bg-gray-700">
            <img :src="image">
        </div>
        <div class="flex justify-between w-full items-center">
            <div>{{ date }}</div>
            <div>{{ local }}</div>
        </div>
        <div class="wrap-anywhere">
            {{ text }}
        </div>
        <div class="flex grow justify-between items-end">
            <div>{{ mood }}</div>
            <div>{{ friends }}</div>
        </div>
    </section>
</template>