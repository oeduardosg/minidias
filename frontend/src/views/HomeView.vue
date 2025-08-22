<script setup>
import Navbar from '@/components/Navbar.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Card from '@/components/Card.vue';
import { compareDates } from '../compareDates';

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
  cards.value.sort(compareDates);
})

const showingCard = ref(null);
const isShowing = ref(false);

function showCard(card) {
  showingCard.value = card;
  isShowing.value = true;
  
}

function showOff() {
  isShowing.value = false;
}

const deleteCard = async () => {
  try {
    await pb.collection('cards').delete(showingCard.value.id);
    location.reload();
  } catch (err) {
    console.error("Error:", err.data);
  }
}

</script>

<template>
  <section class="flex flex-col w-full relative">

      <div @click="showOff()" class="absolute w-full h-screen flex flex-col justify-center items-center backdrop-brightness-50" v-if="isShowing">
        <div @click="deleteCard()" class="bg-red-700 fixed top-0 left-0 font-bold aspect-square h-[3vh] flex justify-center content-center flex-wrap rounded"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg></div>
        <Card @click.stop :image="pb.files.getURL(showingCard, showingCard.image)" :date="showingCard.date" :text="showingCard.text" :local="showingCard.local" :mood="showingCard.mood" :friends="showingCard.friends"/>
      </div>
      <div class="flex flex-col w-[100vw] h-[30vh] bg-white rounded-b-[10vw]">
        <div class="flex gap-x-[10px] m-[1vh] justify-end">
          <RouterLink to="/friends" class="p-[10px] rounded-full bg-green-700 rounded text-white font-bold">Friends</RouterLink>
          <button @click="logout" class="p-[10px] rounded-full bg-red-700 rounded text-white font-bold">Logout</button>
        </div>
        <div class="flex ml-[5vw] gap-5 items-center m-5">
          <img :src="avatar" class="aspect-square rounded-full w-[25vw] max-h-[200px] max-w-[200px]" style="object-fit: cover;"></img>
          <div class="flex flex-col">
            <div class="font-bold text-[20px]">{{ name }}</div>
            <div class="text-[14px]">Olá! Essa é a minha descrição completamente aleatória.</div>
          </div>
        </div>
      </div>
      <section class="m-5 flex flex-wrap justify-start gap-2">
        <div v-for="card in cards">
          <Card class="cursor-pointer" @click="showCard(card)" :image="pb.files.getURL(card, card.image)" :text=card.text :date="card.date" :small="true" />
        </div>
      </section>
  </section>

  <Navbar v-if="isShowing" @click.stop class="brightness-50"/>
  <Navbar v-else/>
</template>