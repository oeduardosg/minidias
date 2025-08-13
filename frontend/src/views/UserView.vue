<script setup>
import Navbar from '@/components/Navbar.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

let pb = null;
const router = useRouter();
const name = ref('');

const logout = () => {
  pb.authStore.clear();
  router.replace("/login");
}

onBeforeMount(() => {
  pb = new PocketBase('http://127.0.0.1:8090');

  if(!pb.authStore.isValid) router.replace("/login");
})

onMounted(() => {
  name.value = pb.authStore.isValid ? pb.authStore.record.name : null;
})
</script>

<template>
  <h2>User {{ $route.params.id }}</h2>
  <Navbar/>
</template>