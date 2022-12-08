<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"
import BoardPost from "../posts/BoardPost.vue"

export default defineComponent({
  components: {
      BoardPost,
  }
})

</script>

<template>
    <div id="boardContainer">
        <h1>Recent Posts</h1>
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
        <BoardPost />
    </div>
</template>

<style scoped>

#boardContainer {
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 75vh;
    max-width: 1000px;
    overflow-y: scroll;
    padding-top: 30px;
}    

#boardContainer h1 {
    color: var(--background);
    border-bottom: 2px solid var(--background);
}

</style>
