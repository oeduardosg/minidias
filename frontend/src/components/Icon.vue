<template>
    <!-- Note: several SVG and path attributes omitted for brevity -->
    <svg
        :class="{ selected }"
        :title="selected ? 'Selected' : 'Unselected'"
        role="img"
        viewBox="0 0 24 24"
        :width="size"
        :stroke="thickness_color"
        :stroke-width="thickness_size"
    >
    <path :d="caminho" :fill="color" />
    </svg>
</template>

<script>
export default {
    name: 'UserSVG',

    props: {
        selected: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 40,
        },
        color: {
            type: String,
            default: "#3F146C",
        },
        caminho: String,
        thickness_size: {
            type: String,
            default: '',
        },
        thickness_color: {
            type: String,
            default: '',
        },
    }
}
</script>

<style scoped>

.selected path{
    fill: #16569E;
}
</style>
