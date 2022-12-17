<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"
import { sendMessage, deleteMessage, getMessages, getUserChatIds } from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/firebase/chat"

export default defineComponent({
    props: {
        chatId: String, 
        // me: [],
        // other: [],
    },
    data() {
        return {
            messages: [],
        }
    },
    async created() {
        console.log(this.chatId)
    },
})

</script>

<template>  
    <div class="chat-container">
        <div class="chat-bubble other" v-for="message in messages">
            {{ message }}
        </div>
        <!-- <div class="chat-bubble other" v-for="chat in other">
            <p>Hello! How can I help you?</p>
        </div> -->
        <!-- <div class="chat-bubble me" v-for="chat in me">
            <p>Hi! I was wondering if you could tell me more about the services you offer.</p>
        </div> -->
        <textarea type="text"/>
        <button>send</button>
    </div>   
</template>

<style scoped>

.chat-container {
    position: relative;
    width: 50%;
    max-width: 500px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
    height: fit-content;
    border-left: 1px dashed var(--background);
}

.chat-container textarea {
    position: relative;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
    background-color: var(--omni);
    border: none;
    border-bottom: 1px solid var(--background);
    border-radius: 0;
    height: fit-content;
    resize: none;
    height: auto;
}

.chat-container textarea:focus {
    outline: none;
    border-bottom: 5px solid var(--background);
    font-size: 1rem;
}

.chat-container button {
    position: relative;
    width: 50%;
    min-width: 50px;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--omni);
    color: var(--background);
    border: none;
    height: 40px;
    border-radius: 25px;
    margin-top: 10px;
    border: 2px solid var(--background);
    transition: 0.5s;
}

.chat-container button:hover {
  cursor: pointer;
  background-color: var(--background);
  color: var(--text);
}

.chat-bubble {
    border-radius: 10px;
    padding: 10px 15px;
    margin: 10px;
    max-width: 60%;
    animation: fadeIn 1s linear;
}

.me {
    align-self: flex-end;
    background-color: var(--background);
    color: var(--text);
}

.other {
    color: var(--background);
    border: 1px solid var(--background);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
