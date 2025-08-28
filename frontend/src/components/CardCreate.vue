<script setup>
import CardContent from './CardContent.vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['posts', 'date', 'image', 'local', 'typing', 'mood', 'friends']);

const post = () => {
    console.log("oii")
    emit('posts');
}
</script>

<template>
    <section class="flex justify-center fixed bottom-0 w-full">
        <div class="flex gap-3 flex-col justify-center items-center w-[100vw] h-[25vh] bg-white rounded-t-[10vw] gap-x-[2vw]">
            <div class="flex flex-wrap justify-center items-center gap-[3vw]">
                <CardContent @click="$emit('date')" content_name="Data" icon_path="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
                <CardContent @click="$emit('image')" content_name="Imagem" icon_path="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z"/>
                <CardContent @click="$emit('local')" content_name="Localização" icon_path="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                <CardContent @click="$emit('typing')" content_name="Texto" icon_path="M5,4V7H10.5V19H13.5V7H19V4H5Z"/>
                <CardContent @click="$emit('mood')" content_name="Humor" icon_path="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                <CardContent @click="$emit('friends')" content_name="Amigos" icon_path="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z"/>
            </div>
            <div class="publicar transition delay-50 duration-300 ease-in-out flex justify-center items-center w-[55vw] h-[7vh] hover:bg-[#3F146C] bg-linear-to-tr from-[#16569E] to-[#3F146C] rounded-full shadow-lg shadow-black/35 cursor-pointer ">
                <div @click="post" class="text-white font-medium text-[30px]">PUBLICAR</div>
            </div>
        </div>
    </section>
</template>

<style scoped>

.publicar:hover{
   background-image: linear-gradient(90deg, #6ac9e4 0%, #16569E 20%, #17157c 35%, #211070 50%, #17157c 55%, #16569E 80%, #6ac9e4 100%);
   animation:slidebg 2s linear infinite;
}

@keyframes slidebg {
  to {
    background-position:50vw;
    animation-iteration-count: 25;
  }
}

</style>