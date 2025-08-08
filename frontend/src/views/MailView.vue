<script setup>
import { onMounted, onBeforeMount } from 'vue';
import Navbar from '../components/Navbar.vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

let pb = null;
const router = useRouter();

onBeforeMount(() => {
  pb = new PocketBase('http://127.0.0.1:8090');

  if(!pb.authStore.isValid) router.replace("/login");
})
</script>

<template>
    mail
    <Navbar/>
</template>