<script setup>
import CardCreate from '@/components/CardCreate.vue';
import Card from '../components/Card.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

let pb = null;
const router = useRouter();

onBeforeMount(() => {
    pb = new PocketBase('http://127.0.0.1:8090');
    if(!pb.authStore.isValid) {
        alert("Você deve estar logado para acessar essa página!");
        router.replace("/login");
    }
})

const post = async () => {

    pb = new PocketBase('http://127.0.0.1:8090');
    const input = document.getElementById("imageReceiver");

    const formData = new FormData();
    formData.append("idUser", pb.authStore.record.id);
    formData.append("text", description.value);
    formData.append("date", date.value);
    formData.append("local", local.value);
    formData.append("mood", mood.value);
    formData.append("friends", friends.value);
    if(input && input.files[0]) formData.append("image", input.files[0]);

    try {
        const record = await pb.collection('cards').create(formData);
        console.log("Card foi enviado para a db com sucesso!");
        router.replace('/');
    }
    catch (err) {
        console.error("Error:", err.data);
    }
};

const description = ref('');
const date = ref('');
const local = ref('');
const mood = ref('');
const friends = ref('');

const url = ref('');

function addText() {
    document.getElementById("textEditor").focus();
}

function sendImage() {
    document.getElementById("imageReceiver").click();
}

const acceptImage = () => {
    const input = document.getElementById("imageReceiver")
    url.value = URL.createObjectURL(input.files[0]);
}

function addDate() {
    document.getElementById("dateEditor").focus();
}

function addLocal() {
    document.getElementById("localEditor").focus();
}

function addMood() {
    document.getElementById("moodEditor").focus();
}

function addFriends() {
    document.getElementById("friendsEditor").focus();
}


</script>

<template>
    <Card class="m-auto mt-[7.5vh]" :text="description" :image="url" :date="date" :local="local" :mood="mood" :friends="friends"/>
    <CardCreate @typing="addText" @image="sendImage" @date="addDate" @local="addLocal" @mood="addMood" @friends="addFriends" @posts="post"/>
    <input
        id="textEditor"
        maxlength="160"
        v-model="description"
        type="text"
        class="opacity-0"
        autofocus
    />
    <input
        id="imageReceiver"
        type="file"
        v-on:change="acceptImage"
        accept="image/png, image/jpg"
        class="opacity-0"
        autofocus
    />
    <input
        id="dateEditor"
        v-model="date"
        type="text"
        class="opacity-0"
        autofocus
    />
    <input
        id="localEditor"
        v-model="local"
        type="text"
        class="opacity-0"
        autofocus
    />
    <input
        id="moodEditor"
        v-model="mood"
        type="text"
        class="opacity-0"
        autofocus
    />
    <input
        id="friendsEditor"
        v-model="friends"
        type="text"
        class="opacity-0"
        autofocus
    />
</template>

<style scoped>

input {
  position: absolute; /* or fixed */
  left: -9999px; /* Pushes it far to the left */
  /* or top: -9999px; or bottom: -9999px; etc. */
}

</style>