<script lang="ts">
import { defineComponent } from 'vue'
import { googleSignIn, signInWithGitHub } from "../firebase/getDataApi"

export default defineComponent({
  methods: {
    async googleSignIn() {
      googleSignIn(this.$router) 
    },
    async signInWithGitHub() {
      signInWithGitHub(this.$router)
    }
  }
})

</script>

<template>
  <div id="login-registerContainer">
    <p id="mainMsg">A customizable rich text editor.</p>
    <a href="/login">
      <button id="loginButton" class="focus">Login</button>
    </a>   
    <a href="/register">
      <button id="registerButton" class="focus">Create An Account</button>
    </a>  
    <form class="oAuth" @submit.prevent="googleSignIn">
      <button type="submit">sign in with google</button>
    </form>
    <form class="oAuth" @submit.prevent="signInWithGitHub">
      <button type="submit">sign in with github</button>
    </form>
  </div>  
</template>

