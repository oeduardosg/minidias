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
  <section class="w-full h-screen flex justify-center items-center">
    <form @submit.prevent="login">
      <h1 class="text-3xl mb-[2vh]">Minidias</h1>

      <input type="text" id="email" v-model="email" placeholder="email" class="w-full border-2 border-solid rounded mb-[1vh] px-1"><br>
      <input type="password" id="password" v-model="password" placeholder="senha" class="w-full border-2 border-solid rounded mb-[0.5vh] px-1"><br>

      <div v-if="isPwdWrong" class="text-red-500 text-right">email ou senha incorretos</div>

      <div class="w-full text-right mb-[0.5vh] text-blue-900">esqueceu a senha?</div>

      <button type="submit" class="bg-blue-900 text-white rounded w-full mb-[0.5vh]">Entrar</button>

      <div>Não tem uma conta? <span class="text-blue-900">Cadastrar-se</span></div>
    </form>
  </section>
</template>