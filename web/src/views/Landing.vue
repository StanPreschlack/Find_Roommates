<script lang="ts">
import { defineComponent } from 'vue'
import { googleSignIn, signInWithGitHub } from "../firebase/api"
import { addUser } from "../firebase/api"

export default defineComponent({
  data() {
    return {
      valid: ''
    }
  },
  methods: {
    async googleSignIn() {
      googleSignIn(this.$router) 
    },
    async signInWithGitHub() {
      signInWithGitHub(this.$router)
    },
    //return user cred if good, error if not
    async register(submitEvent:any) {
      const email = submitEvent.target.elements.email.value
      const password = submitEvent.target.elements.password.value
      const user = await addUser(email, password)
      if (typeof user === "string") {
        if (user === "auth/invalid-email") {
          this.valid = "email formatted incorrectly"
        } else if (user === "auth/weak-password") {
          this.valid = "password must be at least 8 characters"
        } else if (user === "auth/email-already-in-use") {
          this.valid = "there is already an account registered with this email."
        } else {
          this.valid = user
        }
      } else {
        this.$router.push({ path: '/make-profile' });
        console.log("success!!")
      }
    }
  }
})
</script>

<template>
  <h1>Finding an apartment is hard enough.</h1>
  <p id="message" class="greeting">{{valid}}</p>
  <div id="login-register-container">
    <div id="registerContainer">
      <form @submit.prevent="register">
        <input type="text" name="email" class="input" placeholder="email"><br />
        <input type="password" name="password" class="input" placeholder="password"><br />
        <span class="focus-bg"></span>
        <button id="create" type="submit">Create an account</button>
      </form>
    </div>
    <a href="/login">
      <button id="login-button">Login</button>
    </a>   
    <p id="or">or</p>
    <form class="oAuth" @submit.prevent="googleSignIn">
      <button type="submit">sign in with google</button>
    </form>
    <form class="oAuth" @submit.prevent="signInWithGitHub">
      <button type="submit">sign in with github</button>
    </form>
  </div>  
</template>

<style scoped>

.oAuth button {
  background-color: var(--omni);
  color: var(--background);
  border: none;
  height: 20px;
  transition: 0.5s;
  width: fit-content;
}

.oAuth button:hover {
  color: var(--text);
  cursor: pointer;
}

#create {
  background-color: var(--omni);
  color: var(--text);
  border: none;
  height: 40px;
  border-radius: 25px;
  margin-top: 25px;
  box-shadow: var(--background) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  transition: 0.5s;
}

#create:hover {
  background-color: var(--background);
  cursor: pointer;
}

#or {
  position: relative;
  width: 100%;
  text-align: center;
}

h1 {
  position: absolute;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  color: var(--background);
  font-size: 1rem;
}

#login-register-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2vw;
  border-radius: 25px;
  transition: 0.5s;
  
}

#login-register-container:hover {
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}

#login-register-container button {
  position: relative;
  width: 100%;

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

#login-button {
  background-color: var(--omni);
  color: var(--background);
  border: none;
  height: 40px;
  border-radius: 25px;
  margin-top: 10px;
  border: 2px solid var(--background);
  transition: 0.5s;
}

#login-button:hover {
  cursor: pointer;
  background-color: var(--background);
  color: var(--text);

}

#background-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  z-index: 1;
}

#background-animation div {
  width: 10px;
  height: 10px;
  background-color: var(--background);
  margin: 1px;
  opacity: 0;
  transition: 0.1s;
}

#background-animation div:hover {
  opacity: 1;
  border-radius: 5px;
}

@media(max-width: 800px) {
  #background-animation {
    display: none;
  }
  h1 {
    top: 25px;
  }
  #login-register-container {
    box-shadow: none;
  }
}

</style>
