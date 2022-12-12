<script lang="ts">
import { defineComponent } from 'vue'
import { addPost } from "/Users/spreschlack/Desktop/software projects/NYU_Find_Roomates/web/src/firebase/api"
import { getAuth } from "firebase/auth"

export default defineComponent({
  data() {
    return {
      showPopUp: false,
      newPostTitle: "",
      newPostContent: "",
    }
  },
  methods: {
    togglePopup() {
      this.showPopUp = !this.showPopUp;
    },
    createPost() {
      //@ts-expect-error
      this.showPopUp = false
      addPost(getAuth().currentUser.uid, this.newPostTitle, this.newPostContent)
      this.$emit('newPost')
    },
  }
})

</script>

<template>
  <div v-if="showPopUp" id="popUp">
    <form>
      <input type="text" v-model="newPostTitle" id="title" name="title" placeholder="Your title, for example: looking for two more people for a three person apartment in the lower east side..."/>
      <textarea type="text" v-model="newPostContent" id="description" name="description" placeholder="Elaborate... what's your price range?, are you okay with pets?, etc... "/>
      <input type="submit" @click.prevent="createPost" id="submit" value="create post"/>
    </form>
    <button @click.prevent="togglePopup" id="cancel">cancel</button>
  </div>
  <div v-else id="button" @click="togglePopup">make a post</div>
</template>

<style scoped>

#cancel {
  margin-top: 10px;
  width: 100px;
  height: 50px;
  border-radius: none;
  border-radius: 0 0 10px 10px;
  border: none;
  border-bottom: 2px solid var(--background);
  border-right: 2px solid var(--background);
  border-left: 2px solid var(--background);
  background-color: white;
  transition: 0.5s;
}

#cancel:hover {
  background-color: var(--background);
  color: var(--text);
  cursor: pointer;
}

#popUp {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 15px;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 800px;
  border: 2px solid var(--background);
  height: 90vh;
  max-height: 300px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  background-color: white;
  padding: 10px;
}

#popUp form {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

#title {
  border: none;
  border-bottom: 2px solid var(--background);
  line-height: 30px;
}

#title::placeholder {
  font-weight: bold;
  font-size: 1rem;
  opacity: .5;
  color: var(--background);
}

#title:focus {
  outline: 2px solid var(--text);
}

#description {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  line-height: 30px;
}

#description::placeholder {
  font-weight: bold;
  font-size: 1rem;
  opacity: .5;
  color: var(--background);
}

#description:focus {
  outline: 2px solid var(--text);
}

#submit {
  position: relative;
  bottom: 0;
  left: 0;
  border: 2px solid var(--background);
  background-color: white;
  border-radius: 0 0 10px 10px;
  font-size: 1rem;
  height: 50px;
  transition: 0.5s;
}

#submit:hover {
  cursor: pointer;
  background-color: var(--background);
  color: var(--text);
}

#button {
  position: fixed;
  bottom: 15px;
  right: 15px;
  height: 75px;
  width: 150px;
  background-color: var(--text);
  text-align: center;
  line-height: 75px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  color: var(--background);
  transition: 2s;
}

#button:hover {
  cursor: pointer;
  animation-name: button;
  animation-timing-function: ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  background-color: var(--background);
  transform: translateY(-10px);
  color: var(--text);
}

</style>
