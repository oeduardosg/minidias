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

const showingImage = ref('');
const showingText = ref('');
const showingLocal = ref('');
const showingDate = ref('');
const showingMood = ref('');
const showingFriends = ref('');
const isShowing = ref(false);

function showCard(card) {
  showingImage.value = pb.files.getURL(card, card.image);
  showingText.value = card.text;
  showingLocal.value = card.local;
  showingDate.value = card.date;
  showingMood.value = card.mood;
  showingFriends.value = card.friends;
  isShowing.value = true;
  console.log(card);
}

function showOff() {
  isShowing.value = false;
}

</script>

<template>
  <section class="flex flex-col w-full relative">

      <div @click="showOff()" class="absolute w-full h-screen flex justify-center items-center backdrop-brightness-50" v-if="isShowing">
        <Card @click.stop :image="showingImage" :date="showingDate" :text="showingText" :local="showingLocal" :mood="showingMood" :friends="showingFriends"/>
      </div>
      <div class="flex flex-col flex-wrap w-[100vw] h-[35vh] bg-white rounded-b-[10vw] gap-x-[2vw] gap-y-[5vh]">
        <div class="flex gap-x-[3vw] m-[1vh] justify-end">
          <RouterLink to="/friends" class="p-[1.5vw] rounded-full bg-green-700 rounded text-white font-bold">Friends</RouterLink>
          <button @click="logout" class="p-[1.5vw] rounded-full bg-red-700 rounded text-white font-bold">Logout</button>
        </div>
        <div class="flex ml-[5vw] gap-5 items-center m-5">
          <img :src="avatar" class="aspect-square rounded-full w-[25vw]" style="object-fit: cover;"></img>
          <div class="flex flex-col">
            <div class="font-bold text-[20px]">{{ name }}</div>
            <div class="text-[14px]">Olá! Essa é a minha descrição completamente aleatória.</div>
          </div>
        </div>
      </div>
      <section class="m-5 flex flex-wrap justify-start gap-2">
        <div v-for="card in cards">
          <Card class="cursor-pointer" @click="showCard(card)" :image="pb.files.getURL(card, card.image)" :text="card.text.substring(0, 20) + '...'" :date="card.date" :small="true" />
        </div>
      </section>
  </section>

  <Navbar v-if="isShowing" @click.stop class="brightness-50"/>
  <Navbar v-else/>
</template>