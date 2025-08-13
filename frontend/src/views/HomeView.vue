<script setup>
import Navbar from '@/components/Navbar.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Card from '@/components/Card.vue';

let pb = null;
const router = useRouter();
const name = ref('');
const avatar = ref('');
const cards = ref([]);

const logout = () => {
  pb.authStore.clear();
  router.replace("/login");
}

onBeforeMount(() => {
  pb = new PocketBase('http://127.0.0.1:8090');

  if(!pb.authStore.isValid) router.replace("/login");
})

onMounted(async () => {
  
  await pb.collection('users').authRefresh();

  name.value = pb.authStore.model.name;
  avatar.value = pb.files.getURL(pb.authStore.model, pb.authStore.model.avatar);

  cards.value = await pb.collection('cards').getFullList({filter: `idUser="${pb.authStore.record.id}"`});
  console.log(cards);
})
</script>

<template>
  <section class="flex flex-col w-full">

      <div class="flex flex-col flex-wrap w-[100vw] h-[35vh] bg-white rounded-b-[10vw] gap-x-[2vw] gap-y-[5vh]">
        <div class="flex gap-x-[3vw] m-[1vh] justify-end">
          <RouterLink to="/friends" class="p-[1.5vw] rounded-full bg-green-700 rounded text-white font-bold">Friends</RouterLink>
          <button @click="logout" class="p-[1.5vw] rounded-full bg-red-700 rounded text-white font-bold">Logout</button>
        </div>
        <div class="flex ml-[5vw] gap-5 items-center m-5">
          <img :src="avatar" class="aspect-square rounded-full w-[25vw]"></img>
          <div class="flex flex-col">
            <div class="font-bold text-[20px]">{{ name }}</div>
            <div class="text-[14px]">Olá! Essa é a minha descrição completamente aleatória.</div>
          </div>
        </div>
      </div>
      <section class="m-5 flex flex-wrap justify-start gap-2">
        <div v-for="card in cards">
          <Card :image="pb.files.getURL(card, card.image)" :text="card.text.substring(0, 20) + '...'" :date="card.date" :small="true" />
        </div>
      </section>
  </section>

  <Navbar/>
</template>