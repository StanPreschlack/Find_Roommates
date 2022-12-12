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
        title: {{ title }} <br />
        content: {{ content }}  <br />
        timestamp: {{ timestamp }}  <br />
        userID: {{ user }} <br /> 
    </div>
</template>

<style scoped>

#post {
    position: relative;
    width: 100%;
    border-bottom: 2px dashed var(--background);
    height: 250px;
}

#post:hover {
    border-bottom: 2px solid var(--background);
    cursor: pointer;
}

</style>
