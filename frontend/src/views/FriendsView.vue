<script setup>
import PocketBase from 'pocketbase';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let pb = null;
const router = useRouter();
const username = ref('');
const users = ref([]);
const friends = ref([]);
const pendings = ref([]);
const friendRequests = ref([]);
const isThereRequests = ref(false);

onBeforeMount(() => {
  pb = new PocketBase('http://127.0.0.1:8090');

  if(!pb.authStore.isValid) router.replace("/login");
});

onMounted(async () => {
  const requests = await pb.collection('friendship').getList(1, 10,{
    filter: `friend2="${pb.authStore.record.id}"&&active=false`,
  });
  if(requests.totalItems > 0) isThereRequests.value = true;

  const records = await pb.collection('users').getList(1, 10, {
    filter: `name!="${pb.authStore.record.name}"`,
  });
  
  friendRequests.value = [];
  for(const user of records.items){
    for(const request of requests.items){
      if(user.id == request.friend1 || user.id == request.friend2) friendRequests.value.push({"user": user, "request":request});
    }
  }

});

const search = async () => {
  const records = await pb.collection('users').getList(1, 10, {
    filter: `name?~"${username.value}"&&name!="${pb.authStore.record.name}"`,
  });


  const friendships = await pb.collection('friendship').getList(1, 10,{
    filter: `friend1="${pb.authStore.record.id}"||friend2="${pb.authStore.record.id}"`,
  });

  friends.value = [];
  users.value = [];
  pendings.value = [];
  
  for(const user of records.items){
    users.value.push(user);
    for(const friendship of friendships.items){
      if(friendship.friend1 == user.id || friendship.friend2 == user.id) {
        users.value.splice(users.value.indexOf(user), 1);
        if(friendship.active) friends.value.push(user);
        else pendings.value.push(user);
      }
  }
  }
};

const add = async (id) => {
  const data = {
    "friend1": pb.authStore.record.id,
    "friend2": id,
    "active": false
  };

  const record = await pb.collection('friendship').create(data);

  search();
};

const accept = async (request) => {
  const data = {
    "friend1": request.friend1,
    "friend2": request.friend2,
    "active": true
  };

  const record = await pb.collection('friendship').update(request.id, data);

  location.reload();
};

const reject = async (request) => {
  const record = await pb.collection('friendship').delete(request.id);

  location.reload();
};

</script>

<template>
  <section class="flex flex-col gap-5 w-full p-1">
    <div v-if="isThereRequests">
      <h1 class="text-3xl mb-[2vh]">Pedidos de amizade</h1>
      <div v-for="friendRequest in friendRequests" class="flex items-center justify-between p-2 w-full border-1 border-solid rounded"><span>{{ friendRequest.user.name }}</span> <div><button @click="accept(friendRequest.request)" class="rounded bg-green-900 text-white px-3 py-1">Aceitar</button> <button @click="reject(friendRequest.request)" class="rounded bg-red-900 text-white px-3 py-1">Recusar</button></div></div>
    </div>
    <form @submit.prevent="search">
      <h1 class="text-3xl mb-[2vh]">Encontre amigos</h1>

      <input type="text" id="username" v-model="username" placeholder="username" class="border-2 border-solid rounded mb-[0.5vh] px-1"><br>

      <button type="submit" class="bg-blue-900 text-white rounded mt-[1vh] px-3 py-1">Procurar</button>

    </form>

    <div v-for="friend in friends" class="flex items-center justify-between p-2 w-full border-1 border-solid rounded">{{ friend.name }}</div>
    <div v-for="pending in pendings" class="flex items-center justify-between p-2 w-full border-1 border-solid rounded"><span>{{ pending.name }}</span> <span class="rounded bg-blue-900 text-white px-3 py-1">Pendente</span></div>
    <div v-for="user in users" class="flex items-center justify-between p-2 w-full border-1 border-solid rounded"><span>{{ user.name }}</span> <button @click="add(user.id)" class="rounded bg-green-900 text-white px-3 py-1">Adicione amigo</button></div>

  </section>
  

</template>