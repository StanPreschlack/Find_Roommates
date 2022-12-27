<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { getAuth } from "firebase/auth"
import { sendMessage, deleteMessage, getMessages, getUserChatIds } from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/firebase/chat"

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
            intervalID: null,
        }
    },
    async beforeMount() {
        let data = await getUserChatIds(getAuth().currentUser.uid)
        this.chats = data[0]
        this.targets = data[1]
        this.names = data[2]
        this.currentChatId = this.chats[this.onIndex]
        this.messages = await getMessages(this.currentChatId)
        this.splitMessages()
        
    },
    methods: {
        // splits by sender for css styling
        splitMessages() {
            this.messages.forEach((message, index) => {
                console.log(message, this.user)
                if (message.sender === this.user) {
                    this.senders[index] = "me"
                    console.log("me")
                } else {
                    this.senders[index] = "other"
                    console.log("other")
                }
            })
        },
        async Delete(message:object) {
            console.log(message)
            await deleteMessage(this.currentChatId, message.messageId)
            this.messages = await getMessages(this.currentChatId)
            this.splitMessages()
        },
        // gets messages from chat id and updates chat area
        async showChat(index:number) {
            if (this.intervalID !== null) {
                clearInterval(this.intervalID)
            }
            this.onIndex = index
            this.currentChatId = this.chats[index]
            this.messages = await getMessages(this.currentChatId)
            this.splitMessages()
            //set interval here
            this.intervalID = setInterval( async () => {
                this.messages = await getMessages(this.currentChatId)
                this.splitMessages()
                // this is the chat refresh rate in milliseconds
            }, 5000)
        },
        async sendMessage() {
            if (this.inputState !== "") {
                console.log(this.onIndex)
                await sendMessage(this.targets[this.onIndex], this.user, this.inputState)
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
            <div v-for="(message, index) in messages" class="chat-bubble" :class="this.senders[index]">
                <!-- check if it is "me" -->
                <button v-if="senders[index].length === 2" @click.prevent="Delete(message)" id="delete">delete</button>
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
