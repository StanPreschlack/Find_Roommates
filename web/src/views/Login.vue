<script lang="ts">
import { defineComponent } from 'vue'
import { login } from "../firebase/api"

export default defineComponent({
  data() {
    return {
      valid: 'login'
    }
  },
  methods: {
    //return user cred if sucessfull, errors if not
    async login(submitEvent:any) {
      const email = submitEvent.target.elements.email.value
      const password = submitEvent.target.elements.password.value
      const user = await login(email, password)
      if (typeof user === "string") {
        if (user === "auth/user-not-found" || user === "auth/invalid-email") {
          this.valid = "there is no email registered for this user"
        } else if (user === "auth/wrong-password" || user === "auth/internal-error") {
          this.valid = "incorrect password"
        } else {
          this.valid = user
        }
      } else {
        this.$router.push({ path: '/home' });
        console.log("success!!")
      }
    },
  }
})

</script>

<template>
  <div id="login_form">
    <p class="greeting">{{ valid }}</p>
    <form @submit.prevent="login">
      <input class="input" type="text" name="email" placeholder="email"><br />
      <input class="input" type="password" name="password" placeholder="password"><br />
      <button type="submit" class="focus">Submit</button>
    </form>
  </div> 
</template>

<style scoped>

#login_form p {
  position: absolute;
  text-align: center;
  font-size: calc(1vw + 10px);
  color: var(--background);
  left: 50%;
  top: calc(50% - 100px);
  transform: translate(-50%, -50%);
  width: 1000px;
}

#login_form {
  position: absolute;
  width: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#login_form button {
  background-color: var(--omni);
  color: var(--text);
  border: none;
  height: 40px;
  border-radius: 25px;
  margin-top: 25px;
  box-shadow: var(--background) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  transition: 0.5s;
  width: 100%;
  
}

#login_form button:hover {
  background-color: var(--background);
  cursor: pointer;
}

.input {
  background-color: var(--omni);
  border: none;
  border-bottom: 5px dashed var(--background);
  text-align: center;
  height: 40px;
  font-size: 1.5rem;
  caret-color: var(--background);
  color: var(--background);
}

.input:focus {
  border-bottom: 5px solid var(--text);
  outline-width: 0;
}

</style>
