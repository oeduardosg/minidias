<script setup>
import Navbar from '@/components/Navbar.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let pb = null;
const router = useRouter();
const email = ref('');

const logout = () => {
  pb.authStore.clear();
  router.replace("/login");
}

onBeforeMount(() => {
  pb = new PocketBase('http://127.0.0.1:8090');

  if(!pb.authStore.isValid) router.replace("/login");
})

onMounted(() => {
  email.value = pb.authStore.isValid ? pb.authStore.record.email : null;
})
</script>

<template>
  <h2>Welcome {{ email }}</h2>
  <button @click="logout" class="bg-red-700 rounded">Logout</button>
  <Navbar/>
</template>