<script setup>
import Navbar from '@/components/Navbar.vue';
import PocketBase from 'pocketbase';
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Card from '@/components/Card.vue';
import { compareDates } from '../compareDates';

let pb = null;
const router = useRouter();
const route = useRoute()
const user = ref({});
const cards = ref([]);
const isShowing = ref(false);
const avatar = ref('');

onBeforeMount(() => {
  pb = new PocketBase(import.meta.env.VITE_POCKETBASE_ENDPOINT);

  if(!pb.authStore.isValid) router.replace("/login");
})

onMounted(async () => {
  await pb.collection('users').authRefresh();

  user.value = await pb.collection('users').getOne(route.params.id);
  avatar.value = pb.files.getURL(user.value, user.value.avatar);
  console.log(avatar.value);
  cards.value = await pb.collection('cards').getFullList({
    filter: `idUser="${user.value.id}"`,
  });
  cards.value.sort(compareDates);
})

const showingImage = ref('');
const showingText = ref('');
const showingLocal = ref('');
const showingDate = ref('');
const showingMood = ref('');
const showingFriends = ref('');

function showCard(card) {
  showingImage.value = pb.files.getURL(card, card.image);
  showingText.value = card.text;
  showingLocal.value = card.local;
  showingDate.value = card.date;
  showingMood.value = card.mood;
  showingFriends.value = card.friends;
  isShowing.value = true;
}

function showOff() {
  isShowing.value = false;
}
</script>

<template>
  <section class="flex flex-col w-full">
    <div @click="showOff()" class="absolute w-full h-screen flex justify-center items-center backdrop-brightness-50" v-if="isShowing">
        <Card @click.stop :image="showingImage" :date="showingDate" :text="showingText" :local="showingLocal" :mood="showingMood" :friends="showingFriends"/>
    </div>
    <div class="flex flex-col flex-wrap w-[100vw]  bg-white rounded-b-[10vw] gap-x-[2vw] gap-y-[5vh]">
    <div class="flex ml-[5vw] gap-5 items-center m-5 pb-3">
        <img :src="avatar" style="object-fit: cover;" class="aspect-square rounded-full w-[25vw] max-w-[150px]"></img>
        <div class="flex flex-col">
        <div class="font-bold text-[20px]">{{ user.name }}</div>
        <div class="text-[14px]">Olá! Essa é a minha descrição completamente aleatória.</div>
        </div>
    </div>
    </div>
    <section class="m-5 flex flex-wrap justify-start gap-2">
    <div v-for="card in cards">
        <Card @click="showCard(card)" :image="pb.files.getURL(card, card.image)" :text="card.text.substring(0, 20) + '...'" :date="card.date" :small="true" />
    </div>
    </section>
  </section>

  <Navbar v-if="isShowing" @click.stop class="brightness-50"/>
  <Navbar v-else/>
</template>