<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { getAuth } from "firebase/auth"
import { sendMessage, deleteMessage, getMessages, getUserChatIds } from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/firebase/chat"

// TODO: 

// fix insertion bug that creates multiple feilds for a single chat in the realtime database
// the below bugs are related the the following issue: firebase is creating new chats in the database when it sees a new message being sent, it needs to write to existing docs not create new ones, try out the messaging and look at the realtime databse to duplicate the bug
// fix message formatting on the front end to allow for multiple styles on the same conversation (this is an issue somehow lol)
// fix issue where chat is sent to wrong user sometimes
// fix issue where getAuth() is tied to the device, maybe find another way to identify the client?

export default defineComponent({
    data() {
        return {
            chats: "",
            currentChatId: "",
            messages: [],
            onIndex: 0,
            inputState: "",
            names: [],
            senders: [],
            user: getAuth().currentUser.uid,
        }
    },
    async beforeMount() {
        let data = await getUserChatIds(getAuth().currentUser.uid)
        this.chats = data[0]
        this.targets = data[1]
        this.names = data[2]
        console.log(this.targets)
        this.currentChatId = this.chats[this.onIndex]
        this.messages = await getMessages(this.currentChatId)
        // splits by sender for css styling
        this.messages.forEach((message, index) => {
            console.log(message, this.user)
            if (message.sender === this.user) {
                this.senders[index] = "me"
            } else {
                this.senders[index] = "other"
            }
        })
    },
    methods: {
        async Delete(message:object) {
            console.log(message)
            await deleteMessage(this.currentChatId, message.messageId)
            this.messages = await getMessages(this.currentChatId)
            this.splitMessages()
        },
        // gets messages from chat id and updates chat area
        async showChat(index:number) {
            this.onIndex = index
            this.currentChatId = this.chats[index]
            this.messages = await getMessages(this.currentChatId)
            console.log(this.onIndex)
            this.splitMessages()
        },
        async sendMessage() {
            if (this.inputState !== "") {
                console.log(this.onIndex)
                await sendMessage(this.targets[this.onIndex], getAuth().currentUser.uid, this.inputState)
                this.messages = await getMessages(this.currentChatId)
                this.inputState = ""
                this.splitMessages()
            }
        },
    },
})

</script>

<template>
    <div id="chats">
        <div id="people">
            <div v-for="(chat, index) in chats" @click.prevent="showChat(index)">
                <p>{{ names[index] }}</p>
            </div>   
        </div>    
        <div class="chat-container">
            <div v-for="(message, index) in messages" class="chat-bubble" :class="senders[index]">
                <button @click.prevent="Delete(message)" id="delete">delete</button>
                {{ message.content }}
            </div>
            <div id="messageArea">
                <textarea v-model="inputState" type="text"/>
                <button @click.prevent="sendMessage">send</button>
            </div>
        </div> 
    </div>    
</template>

<style scoped>

#delete {
    position: relative;
    width: 50%;
    max-width: 25px;
    height: 50%;
    max-height: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    transition: 0.5s;
    border: none;
    z-index: 10;
    border: 2px solid var(--background);
}

#delete:hover {
    border: 2px solid var(--text);
}

.on {
    background-color: red;
}

.off {
    background-color: white;
}

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

#people input {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    background: none;
    border: none;
    text-align: center;
    color: var(--background);
}

#people input:hover {
    color: var(--text);
}

#people input:focus {
    outline: 3px solid var(--text);
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
    transition: 0.5s;
    overflow-wrap: break-word;
}

.chat-bubble:hover {
    background-color: var(--omni);
    border: 2px dashed var(--background);
    color: var(--background);
}

.chat-bubble:hover #delete {
    display: inline;
    cursor: pointer;
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
