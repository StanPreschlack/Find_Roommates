<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"

export default defineComponent({
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
  </div>  
</template>

<style scoped>

#header {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--background);
  height: 75px;
  min-height: 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

</style>
