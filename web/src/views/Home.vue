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
  <div>
    <p>{{ email }}</p>

    single page app
  </div>  
</template>
