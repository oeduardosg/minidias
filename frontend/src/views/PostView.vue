<script setup>
import CardCreate from '@/components/CardCreate.vue';
import Card from '../components/Card.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const pb = null;
const router = useRouter();

/* Ainda não está funcionando, não investiguei o motivo
onBeforeMount(() => {
    pb = new PocketBase('http://127.0.0.1:8090');

    if(!pb.authStore.isValid) router.replace("/login");
})
*/

const description = ref('');

function letType() {
    document.getElementById("textEditor").focus();
}

</script>

<template>
    <Card class="m-auto mt-[7.5vh]" :text="description"/>
    <CardCreate @typing="letType"/>
    <div class="mt-4">
        <input
        id="textEditor"
        v-model="description"
        type="text"
        class="opacity-0"
        autofocus
        />
    </div>
</template>