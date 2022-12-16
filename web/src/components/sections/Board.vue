<script lang="ts">
import { defineComponent, toRaw, markRaw } from 'vue'
import { getAuth } from "firebase/auth"
import BoardPost from "../posts/BoardPost.vue"
import { getAllPosts } from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/firebase/api"

export default defineComponent({
    props: {
        reload: Number,
    },
    watch: { 
        reload: async function(o, n) {
            this.posts = await getAllPosts()
        },
    },
    data() {
        return {
            masterPosts: [],
            posts: [],
            query: "",
        }
    },
    async beforeMount(){
        this.posts = await getAllPosts()
    },
    methods: {
        filter(posts) {
            return posts.filter((post) => {
                // this method is fastest for chrome, creating a regex may be faster on safari so this could possibly be optimized
                if (post.title.indexOf(this.query) !== -1 || post.content.indexOf(this.query) !== -1) {
                    return post
                }
            })
        },
        send(targetId) {
            console.log(targetId)
        }
    },
    components: {
        BoardPost,
    }
})

</script>

<template>
    <div id="boardContainer">
        <h1>Recent Posts</h1>
        <input type="text" v-model="query" placeholder="search posts" id="search"/>
        <BoardPost v-for="post in filter(posts)" :title="post.title" :content="post.content" :timestamp="post.timestamp" :user="post.user" @sendChat="send(post.user)"/>
    </div>
</template>

<style scoped>

#search {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    max-width: 500px;
    height: 25px;
    font-size: 1rem;
    background-color: var(--omni);
    border: none;
    text-align: center;
    border-bottom: 2px solid var(--background);
}

#search:focus {
    border-bottom: none;
    outline: 2px solid var(--background);
}

#boardContainer {
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 75vh;
    max-width: 1000px;
    overflow-y: scroll;
    padding-top: 30px;
    overflow-x: hidden;
    align-items: center;
}    

#boardContainer h1 {
    color: var(--background);
}

</style>
