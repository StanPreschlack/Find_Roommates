<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from "firebase/auth"
import { sendMessage, deleteMessage, getMessages, getUserChatIds } from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/firebase/chat"
import Chat from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/components/messaging/Chat.vue"

export default defineComponent({
    data() {
        return {
            chats: null,
            currentChat: null,
        }
    },
    async beforeMount(){
        this.chats = getUserChatIds(getAuth().currentUser.uid)
    },
})

</script>

<template>
    <div id="chats">
        <div id="people">
            <div v-for="chat in chats">
                {{ chat.chat }}
            </div>   
        </div>    
        <Chat messages="currentChat" />
    </div>    
</template>

<style scoped>

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

</style>
