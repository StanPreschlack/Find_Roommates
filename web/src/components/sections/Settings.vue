<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"

export default defineComponent({
    methods: {
        changeProfile() {
            console.log("changed profile")
        },
    },
})

</script>

<template>
    <form id="settingsForm">
        <input type="text" id="username" placeholder="change username" />
        <input type="text" id="password"  placeholder="change password" />
        <button type="submit" @click.prevent="changeProfile">Update profile</button>
    </form>
</template>

<style scoped>

</style>
