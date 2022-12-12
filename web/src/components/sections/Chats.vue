<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"

export default defineComponent({

})

</script>

<template>
    <div id="chats">
        chats section here
    </div>
</template>

<style scoped>
#chats {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}   
</style>
