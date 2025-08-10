<script setup>
import Navbar from '@/components/Navbar.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let pb = null;
const router = useRouter();
const username = ref('');
const users = ref([]);

onBeforeMount(() => {
  pb = new PocketBase('http://127.0.0.1:8090');

  if(!pb.authStore.isValid) router.replace("/login");
})

const search = async () => {
    const records = await pb.collection('users').getList(1, 10, {
        filter: `name?~"${username.value}"&&name!="${pb.authStore.record.name}"`,
    });
    users.value = records.items;


};

const add = async (id) => {
  const data = {
    "friend1": id,
    "friend2": pb.authStore.record.id,
    "active": true
  };

  const record = await pb.collection('friendship').create(data);
};

const isFriend = async () => {
  /*const friendships = await pb.collection('friendship').getFullList();

  console.log(friendships);*/
  return true;
};
</script>

<template>
  <section class="flex flex-col gap-5 w-full p-1">
    <form @submit.prevent="search">
      <h1 class="text-3xl mb-[2vh]">Encontre amigos</h1>

      <input type="text" id="username" v-model="username" placeholder="username" class="border-2 border-solid rounded mb-[0.5vh] px-1"><br>

      <button type="submit" class="bg-blue-900 text-white rounded mt-[1vh] px-3 py-1">Procurar</button>

    </form>

    <div v-for="user in users" class="flex items-center justify-between p-2 w-full border-1 border-solid rounded"><span>{{ user.name }}</span> <button v-if="isFriend()" @click="add(user.id)" class="rounded bg-blue-900 text-white px-3 py-1">Adicione amigo</button></div>

  </section>
  

</template>