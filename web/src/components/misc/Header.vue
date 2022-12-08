<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"

export default defineComponent({
  data() {
    return {
      email: "email",
    }
  },
  async beforeMount(){
    // redirects unauthenticated users
    if(getAuth().currentUser === null) {
      this.$router.push({ name: 'login' });
    } else {
      // else set user info
      this.email = getAuth().currentUser?.email as string;
    }
  },
})

</script>

<template>
  <div id="header">
    <p>{{ email }}</p>
  </div>  
</template>

<style scoped>

#header {
    position: absolute;
    top: 0;
    width: 100%;
    background-color: var(--background);
    height: 10vh;
    min-height: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

#header p {
    position: absolute;
    width: 250px;
    right: 50px;
    top: 4vh;
    color: var(--text);
}

</style>
