import {signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./app"
import { getDatabase, ref, set, child, get, remove, push, update, type DatabaseReference } from 'firebase/database'
import uniqid from 'uniqid'

// api used to build the chat feature

//initialize auth
const auth = getAuth(app)

// accepts two user ids, generates a chat id that is the same for any two combinations of id regardless of order (which one is starting the chat) to find existing chats in the database properly

function getChatId(userIdOne:string, userIdTwo:string) {
    if (userIdOne.length !== userIdTwo.length) {
        return "strings must be equal length"
    }
    let oneArr = userIdOne.toLowerCase().split("")
    let twoArr = userIdTwo.toLowerCase().split("")
    let chatId:string[] = []
    // o is for one t is for two
    for (let o = 0, t = 0; o < oneArr.length, t < twoArr.length; ) {
        if (oneArr[o] > twoArr[t]) {
            chatId.push(oneArr[o])
            o++
        } else {
            chatId.push(twoArr[t])
            t++
        }
    }
    return chatId.join("")
}

// gets an array of objects from firebase representing a series of chats sorted by timestamp, update chat using setTimeout() on frontend

async function getMessages(chatId:string) {
    let messages:object[] = []
    await get(child(ref(getDatabase(app)), "chats/" + chatId)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((message) => {
                messages.push(message.val())
            })
        } else {
            return messages
        }
    }).catch((error) => {
        console.error(error);
    })
    return messages.sort((m1:any, m2:any) => (m1.timestamp > m2.timestamp) ? 1 : (m1.timestamp < m2.timestamp) ? -1 : 0);
} 

// this is used to assign an id to each convo without loading in all chats to improve performance, however it also increses the complexity of the interface so could maybe be improved

async function getUserChatIds(userId:string) {
    let chats:object[] = []
    await get(child(ref(getDatabase(app)), "users/" + userId)).then((snapshot) => {
        if (snapshot.exists()) {
                console.log(snapshot)
                snapshot.forEach((chat) => {
                chats.push(chat.val())
            })
        } else {
            console.log("No data available")
        }
    }).catch((error) => {
        console.log(error)
        return chats
    })
    // TODO: solve potential issue, this does not solve the issue of duplicate chat ids in the database, it just filters out the duplicates on the client side
    let Chats:string[] = []
    let Targets:string[] = []
    let Names:string[] = []
    chats.forEach((chat:any) => {
        if (!Chats.includes(chat.chatId)) {
            Chats.push(chat.chatId)
            Targets.push(chat.target)
            Names.push(chat.name)
        }
    })
    return [Chats, Targets, Names]
}

// writes a new message to a chat data structure in firebase, then returns the state of the chat being written to

async function sendMessage(targetId:string, senderId:string, content:string, name?:string) {
    let chatId = getChatId(targetId, senderId)
    let messageId = uniqid()

    // add the chatIds to both users account storage

    // this if checks to make sure the chat does not already exist in which case it simply adds the chat to the existing chat below
    // UPDATE: no external calls needed!!, use name instead
    if (name !== undefined && name !== null && name.length > 0) {
        
        await set(ref(getDatabase(app), "users/" + targetId + "/" + chatId), 
            {
                chatId: chatId,
                name: name,
                target: senderId,
            }
        )

        await set(ref(getDatabase(app), "users/" + senderId + "/" + chatId), 
            {
                chatId: chatId,
                name: name,
                target: targetId,
            }
        )
    }

    // add to chats feild (will overwrite duplicate in case of two way message initiation)

    await update(ref(getDatabase(app), "chats/" + chatId + "/" + messageId), 
        {
            timestamp: Date.now().toString(),
            target: targetId, 
            sender: senderId,
            content: content,
            messageId: messageId,
        }
    )   

    return await getMessages(chatId)
}

// deletes a message from chatId and messageId

async function deleteMessage(chatId:string, messageId:string) {
    try {
        remove(ref(getDatabase(app), "chats/" + chatId + "/" + messageId))
        return "removed"
    } catch (err) {
        return "remove failed"
    }
}

export {
    sendMessage,
    deleteMessage,
    getMessages,
    getUserChatIds,
}
