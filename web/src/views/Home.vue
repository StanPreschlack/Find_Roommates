<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"
import MakePostButton from "../components/misc/MakePostButton.vue"
import Board from "../components/sections/Board.vue"
import Chats from "../components/sections/Chats.vue"
import Settings from "../components/sections/Settings.vue"
import Profile from "../components/sections/Profile.vue"

export default defineComponent({
  beforeMount(){
    if(getAuth().currentUser === null) {
      this.$router.push({ path: '/login' });
    }
  },
  data() {
    return {
      //used for single page "routing"
      profile: false,
      board: true,
      chats: false,
      settings: false,
    }
  },
  components: {
    MakePostButton,
    Board,
    Chats,
    Settings,
    Profile,
  },
  methods: {
    setAllToFalse() {
      this.board = false
      this.chats = false
      this.settings = false
      this.profile = false
    },
    Profile() {
      this.setAllToFalse()
      this.profile = true
    },
    Board() {
      this.setAllToFalse()
      this.board = true
    },
    Chats() {
      this.setAllToFalse()
      this.chats = true
    },
    Settings() {
      this.setAllToFalse()
      this.settings = true
    },
  }
})

</script>

<template>
  <div id="header">
    <img src="/images/nyu-find-roommates-logo.png" alt="no image"/>
    <button @click.prevent="Profile">edit profile</button>
    <button @click.prevent="Chats">your messages</button>
    <button @click.prevent="Board">recent posts</button>
  </div>
  <div v-if="board">
    <Board />
  </div>
  <div v-if="profile">
    <Profile />
  </div>
  <div v-if="chats">
    <Chats />
  </div>
  <div v-if="settings">
    <Settings />
  </div>
  <MakePostButton />
</template>

<style scoped>
#header {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0;
  width: 100%;
  background-color: var(--background);
  height: 75px;
  min-height: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#header button {
  position: relative;
  height: 75px;
  padding-right: 10px;
  padding-left: 10px; 
  background-color: var(--background);
  color: var(--text);
  border: none;
  transition: 0.5s;
}

#header button:hover {
  cursor: pointer;
  background-color: var(--text);
  color: var(--background);
}

#header img {
}

</style>
