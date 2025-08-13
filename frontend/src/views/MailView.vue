<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

let pb = null;
const router = useRouter();
const friends = ref([]);
const posts = ref([]);
const mainPost = ref({});
const mainUser = ref({});
const visualizando = ref(false);


onBeforeMount(() => {
  pb = new PocketBase('http://127.0.0.1:8090');

  if(!pb.authStore.isValid) router.replace("/login");
})

onMounted(async () => {
  const friendships = await pb.collection('friendship').getFullList({
    filter: `friend1="${pb.authStore.record.id}"||friend2="${pb.authStore.record.id}"`,
  });

  for(const friendship of friendships){
    if(friendship.friend1 == pb.authStore.record.id) friends.value.push(friendship.friend2);
    else friends.value.push(friendship.friend1);
  }

  for(const friend of friends.value){
    const records = await pb.collection('cards').getFullList({
      filter: `idUser="${friend}"`,
    });
    for(const record of records){
      record.image = pb.files.getURL(record, record.image);
      posts.value.push(record);
    }
  }

})

const change = async (post) => {
  visualizando.value = true;
  const record = await pb.collection('users').getOne(post.idUser);
  mainUser.value = record;
  mainPost.value = post;
}

</script>

<template>
    <section class="flex gap-2 m-2 overflow-scroll">
      <div @click="change(post)" v-for="post in posts" class="p-[9px] w-[144px] h-[190px] bg-white shrink-0">
        <img class="h-[126px] w-[126px]" style="object-fit: cover;" :src="post.image">
        {{ post.text }}
      </div>
    </section>

    <section class="m-2">
      <div v-if="visualizando" class="p-[9px] w-full h-full bg-white shrink-0">
        <div class="flex justify-between w-full items-center">
          <div>{{ mainUser.name }}</div>
          <div>{{ mainPost.date }}</div>
        </div>
        <img class="aspect-square w-full my-1" style="object-fit: cover;" :src="mainPost.image">
        {{ mainPost.text }}
      </div>
    </section>

    <Navbar/>
</template>