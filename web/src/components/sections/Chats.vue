<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { getAuth } from "firebase/auth"
import { sendMessage, deleteMessage, getMessages, getUserChatIds } from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/firebase/chat"
import Chat from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/components/messaging/Chat.vue"

export default defineComponent({
    data() {
        return {
            chats: "",
            currentChatId: "",
            messages: [],
            other: [],
            me: [],
        }
    },
    components: {
        Chat,
    },
    async beforeMount() {
        this.chats = await getUserChatIds(getAuth().currentUser.uid)
        this.currentChatId = this.chats[0]
        this.messages = await getMessages(this.currentChatId)
    },
    methods: {
        // splits by user for css styling
        splitMessages() {

        },
        // gets messages from chat id and updates chat area
        async showChat(index:number) {
            this.currentChatId = this.chats[index]
            this.messages = await getMessages(this.currentChatId)
        },
    },
})

</script>

<template>
    <div id="chats">
        <div id="people">
            <div v-for="(chat, index) in chats" @click.prevent="showChat(index)">
                 <input type="text" placeholder="unamed contact" />
                {{ chat.chatId }}
            </div>   
        </div>    
        <div class="chat-container">
            <div class="chat-bubble {{ me }}" v-for="(message, index) in messages">
                {{ message.content }}
            </div>
        <div id="messageArea">
            <textarea type="text"/>
            <button>send</button>
        </div>
    </div> 
    </div>    
</template>

<style scoped>

#messageArea {
    position: relative;
    width: 100%;
    height: 10vh;
    min-height: 100px;
}

#people {
    position: relative;
    width: 50%;
    max-width: 500px;
}

#people div {
    position: relative;
    width: 100%;
    height: 100px;
    text-align: center;
    color: var(--background);
    line-height: 100px;
    font-size: 2rem;
    border-bottom: 1px dashed var(--background);
    transition: 0.5s;
}

#people div:hover {
    color: var(--text);
    background-color: var(--background);
    cursor: pointer;
}

#chats {
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1000px;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    margin: 20px;
    margin-bottom: 60px;
}

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
