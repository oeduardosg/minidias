<script setup>
import PocketBase from 'pocketbase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let pb = null;
const email = ref('');
const password = ref('');
const username = ref('');
const confirm_password = ref('');
const pwdWrong = ref(false);
const emailExists = ref(false);
const pwdSmall = ref(false);

const router = useRouter();

const signup = async () => {
    if(confirm_password.value == password.value) pwdWrong.value = false;
    if(password.value.length >= 8) pwdSmall.value = false;

    try {
        const data = {
            "name": username.value,
            "password": password.value,
            "passwordConfirm": confirm_password.value,
            "email": email.value
        }

        const record = await pb.collection('users').create(data);

        const authData = await pb.collection('users').authWithPassword(email.value, password.value);

        router.replace('/');
    } catch (e) {
        if(password.value.length < 8) pwdSmall.value = true;
        else if(confirm_password.value != password.value) pwdWrong.value = true;
        else emailExists.value = true;
    }
};

onMounted(async () => {
    pb = new PocketBase('http://127.0.0.1:8090');
});

</script>

<template>
  <section class="w-full h-screen flex justify-center items-center">
    <form @submit.prevent="signup">
      <h1 class="text-3xl mb-[2vh]">Criar uma conta</h1>

      <input type="email" id="email" v-model="email" placeholder="email" class="w-full border-2 border-solid rounded mb-[1vh] px-1"><br>
      <div v-if="emailExists" class="text-red-500 text-right">email ja existe</div>
      <input type="text" id="username" v-model="username" placeholder="username" class="w-full border-2 border-solid rounded mb-[1vh] px-1"><br>
      <input type="password" id="password" v-model="password" placeholder="senha" class="w-full border-2 border-solid rounded mb-[1vh] px-1"><br>
      <input type="password" id="confirm_password" v-model="confirm_password" placeholder="confirmar senha" class="w-full border-2 border-solid rounded mb-[0.5vh] px-1"><br>

      <div v-if="pwdWrong" class="text-red-500 text-right">senhas devem ser iguais</div>
      <div v-if="pwdSmall" class="text-red-500 text-right">senha deve ter pelo menos 8 caracteres</div>

      <button type="submit" class="bg-blue-900 text-white rounded w-full mt-[1vh]">Criar</button>

    </form>
  </section>
</template>