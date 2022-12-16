<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"

export default defineComponent({
  props: {
    title: String,
    content: String,
    timestamp: String,
    user: String,
  }
})

</script>

<template>
    <div id="post">
        <h2> {{ title }} </h2><br />
        <p> {{ content }} </p> <br />
        <button @click="this.$emit('sendChat')">reach out</button>
    </div>
</template>

<style scoped>

#post {
  position: relative;
  width: 100%;
  height: fit-content;
  border-left: 2px solid var(--background);
  border-top: 1px dashed var(--background);
  margin-bottom: 10px;
  margin-top: 10px;
}

#post h2 {
  padding: 10px;
  border-bottom: 1px dashed var(--background);
}

#post p {
  padding: 10px;
}

#post button {
  position: relative;
  width: 50%;
  max-width: 100px;
  bottom: 0;
  background-color: var(--omni);
  color: var(--background);
  height: 40px;
  border-radius: 0 25px 25px 0;
  border: 2px solid var(--background);
  border-left: none;
  transition: 0.5s;
  text-align: right;
  padding: 10px;
  transform: translateX(-2px);
}

#post button:hover {
  cursor: pointer;
  background-color: var(--background);
  color: var(--text);
}

#post button:hover {
  cursor: pointer;
}

</style>
