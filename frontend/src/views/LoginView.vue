<script setup>
import PocketBase from 'pocketbase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let pb = null;
const email = ref('');
const password = ref('');
const isPwdWrong = ref(false)

const router = useRouter()

const login = async () => {
  try {
    pb = new PocketBase('http://127.0.0.1:8090');

    const authData = await pb.collection('users').authWithPassword(email.value, password.value);

    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.record.id);

    router.replace('/');
  } catch (e) {
    isPwdWrong.value = true;
  }

};

</script>

<template>
  <form @submit.prevent="login">
    <label for="email">Email</label>
    <input type="text" id="email" v-model="email"><br>

    <label for="password">Password</label>
    <input type="text" id="password" v-model="password"><br>

    <div v-if="isPwdWrong" class="text-red-500">email or password is wrong</div>

    <button type="submit" class="bg-green-700 rounded">Submit</button>
  </form>
</template>