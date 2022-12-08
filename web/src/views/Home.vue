<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"
import Header from "../components/misc/Header.vue"
import MakePostButton from "../components/misc/MakePostButton.vue"
import Board from "../components/sections/Board.vue"

export default defineComponent({
  data() {
    return {
      //used for single page "routing"
      profile: false,
      board: true,
      chats: false,
      settings: false,
      post: false,
      
    }
  },
  components: {
    Header,
    MakePostButton,
    Board,
  }
})

</script>

<template>
  <Header />
  <Board />
  <MakePostButton />
</template>

