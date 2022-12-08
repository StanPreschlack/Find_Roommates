<script lang="ts">
import { defineComponent } from 'vue'
import { googleSignIn, signInWithGitHub } from "../firebase/api"

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
    <h1>Finding an apartment is hard enough.</h1>
    <h3>We make it easier to find roomates</h3>
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

