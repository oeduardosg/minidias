<script setup>
import { RouterLink, useRoute } from 'vue-router';
import Icon from './Icon.vue';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
    <section class="flex justify-center fixed bottom-8 w-full">
        <div class="flex justify-center items-center gap-[10.5vw] w-[80vw] h-[7vh] bg-white rounded-full shadow-lg shadow-black/35">
            <RouterLink to="/">
                <Icon :selected="isActiveLink('/') ? true : false" caminho="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z"/>
            </RouterLink>
            <RouterLink to="/post" class="flex justify-center w-20 h-20 bg-linear-to-tr from-[#16569E] to-[#3F146C] rounded-full shadow-lg shadow-black/35">
                <Icon thickness_size="1.5" thickness_color="white" color="#ffffff" :size="50" caminho="M19 11C19.55 11 20 11.45 20 12C20 12.55 19.55 13 19 13H13V19C13 19.55 12.55 20 12 20C11.45 20 11 19.55 11 19V13H5C4.45 13 4 12.55 4 12C4 11.45 4.45 11 5 11H11V5C11 4.45 11.45 4 12 4C12.55 4 13 4.45 13 5V11H19Z"/>
            </RouterLink>
            <RouterLink to="/mail">
                <Icon :selected="isActiveLink('/mail') ? true : false" caminho="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"/>
            </RouterLink>
        </div>
    </section>
</template>
